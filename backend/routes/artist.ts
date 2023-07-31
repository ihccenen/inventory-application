import express from 'express';
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getSingleArtist,
  updateArtist,
} from '../controllers/artistController';

const router = express.Router();

router.route('/')
  .get(getAllArtists)
  .post(createArtist);

router
  .route('/:id')
  .get(getSingleArtist)
  .patch(updateArtist)
  .delete(deleteArtist);

export default router;
