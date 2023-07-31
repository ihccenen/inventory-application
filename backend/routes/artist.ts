import express from 'express';
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getSingleArtist,
} from '../controllers/artistController';

const router = express.Router();

router.route('/').get(getAllArtists).post(createArtist);

router.route('/:id').get(getSingleArtist).delete(deleteArtist);

export default router;
