import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Album from '../models/album';
import Track from '../models/track';
import { body, validationResult } from 'express-validator';

const getAllAlbums = asyncHandler(async (req: Request, res: Response) => {
  const allAlbum = await Album.find();

  res.json(allAlbum);
});

const getSingleAlbum = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const [album, tracks] = await Promise.all([
    Album.findById(id).populate('artist').populate('genre'),
    Track.find({ album: id }),
  ]);

  if (!album) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({
    title: album.title,
    artist: album.artist,
    genre: album.genre,
    tracks,
  });
});

const createAlbum = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('artist').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { artist, title, genre } = req.body;

    const album = new Album({
      artist,
      title,
      genre,
    });

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid name');
    }

    await album.save();

    res.status(201).json({ album });
  }),
];

const updateAlbum = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('artist').trim().isLength({ min: 1 }).escape(),
  body('genre')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ values: 'falsy' }),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid fields');
    }

    const { id } = req.params;
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;

    const album = await Album.replaceOne(
      { _id: id },
      {
        title,
        artist,
        genre,
      }
    );

    res.status(201).json({ album });
  }),
];

const deleteAlbum = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const album = await Album.findByIdAndDelete(id);

  if (!album) {
    res.status(404);
    throw new Error('Resource not found');
  }

  const allTracks = await Track.updateMany({ album: id }, { album: null });

  res.status(201).json({ album, allTracks });
});

export { getAllAlbums, getSingleAlbum, createAlbum, updateAlbum, deleteAlbum };
