import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Artist from '../models/artist';
import Album from '../models/album';
import Track from '../models/track';
import { body, validationResult } from 'express-validator';

const getAllArtists = asyncHandler(async (req: Request, res: Response) => {
  const allArtist = await Artist.find();

  res.json(allArtist);
});

const getSingleArtist = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const artist = await Artist.findById(id);

  if (!artist) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({ artist });
});

const createArtist = [
  body('name').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { name } = req.body;

    const artist = new Artist({
      name,
    });

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid name');
    }

    await artist.save();

    res.status(201).json({ artist });
  }),
];

const updateArtist = [
  body('name').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid name');
    }

    const { id } = req.params;
    const { name } = req.body;

    const artist = await Artist.findByIdAndUpdate(id, { name });

    res.status(201).json({ artist });
  }),
];

const deleteArtist = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const artist = await Artist.findByIdAndDelete(id);

  if (!artist) {
    res.status(404);
    throw new Error('Resource not found');
  }

  const allAlbums = await Album.deleteMany({ artist: id });
  const allTracks = await Track.deleteMany({ artist: id });

  res.status(201).json({ artist, allAlbums, allTracks });
});

export {
  getAllArtists,
  getSingleArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
