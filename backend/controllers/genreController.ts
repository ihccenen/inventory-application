import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import Genre from '../models/genre';
import Album from '../models/album';
import Track from '../models/track';

const getAllGenres = asyncHandler(async (req: Request, res: Response) => {
  const allGenres = await Genre.find();

  res.json(allGenres);
});

const getSingleGenre = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  const albums = await Album.find({ genre: id });
  const tracks = await Track.find({ genre: id });

  if (!genre) throw new Error('Genre not found');

  res.status(200).json({ name: genre.name, albums, tracks });
});

const createGenre = [
  body('name').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { name } = req.body;

    const genre = new Genre({
      name,
    });

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid name');
    }

    await genre.save();

    res.status(201).json({ genre });
  }),
];

const updateGenre = [
  body('name').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid name');
    }

    const { id } = req.params;
    const { name } = req.body;

    const genre = await Genre.findByIdAndUpdate(id, { name });

    res.status(201).json({ genre });
  }),
];

const deleteGenre = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findByIdAndDelete(id);

  if (!genre) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(201).json({ genre });
});

export { getAllGenres, getSingleGenre, createGenre, updateGenre, deleteGenre };
