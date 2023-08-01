import express from 'express';
import {
  getAllATrack,
  createTrack,
  getSingleTrack,
  deleteTrack,
  updateTrack,
} from '../controllers/trackController';

const router = express.Router();

router.route('/')
  .get(getAllATrack)
  .post(createTrack);

router.route('/:id')
  .get(getSingleTrack)
  .patch(updateTrack)
  .delete(deleteTrack);

export default router;
