import express from 'express';
import {
  getAllGenres,
  getSingleGenre,
  createGenre,
  deleteGenre,
  updateGenre,
} from '../controllers/genreController';

const router = express.Router();

router.route('/')
  .get(getAllGenres)
  .post(createGenre);

router.route('/:id')
  .get(getSingleGenre)
  .patch(updateGenre)
  .delete(deleteGenre);

export default router;
