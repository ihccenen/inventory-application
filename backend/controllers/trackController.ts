import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Track from '../models/track';
import { body, validationResult } from 'express-validator';

const getAllATrack = asyncHandler(async (req: Request, res: Response) => {
  const allTrack = await Track.find();

  res.status(200).json(allTrack);
});

const getSingleTrack = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const track = await Track.findById(id);

  if (!track) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({ track });
});

const createTrack = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('artist')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('album')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ values: 'falsy' }),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { title, artist, album } = req.body;

    const track = new Track({
      title,
      artist,
      album,
    });

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid fields');
    }

    await track.save();

    res.status(201).json({ track });
  }),
];

const updateTrack = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ values: 'falsy' }),
  body('album')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ values: 'falsy' }),
  body('artist')
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
    const oldTrack = await Track.findById(id);
    const title = req.body.title || oldTrack?.title;
    const artist = req.body.artist || oldTrack?.artist.toString();
    const album = req.body.album || oldTrack?.album?.toString();

    const track = await Track.findByIdAndUpdate(id, {
      title,
      artist,
      album,
    });

    res.status(201).json({ track });
  }),
];

const deleteTrack = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const track = await Track.findByIdAndDelete(id);

  if (!track) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(201).json({ track });
});

export { getAllATrack, getSingleTrack, updateTrack, createTrack, deleteTrack };
