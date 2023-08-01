import express from 'express';
import {
  createAlbum,
  deleteAlbum,
  getAllAlbums,
  getSingleAlbum,
  updateAlbum,
} from '../controllers/albumController';

const router = express.Router();

router.route('/')
  .get(getAllAlbums)
  .post(createAlbum);

router
  .route('/:id')
  .get(getSingleAlbum)
  .patch(updateAlbum)
  .delete(deleteAlbum);

export default router;
