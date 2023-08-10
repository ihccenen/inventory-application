import mongoose from 'mongoose';

const { Schema } = mongoose;

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

const model = mongoose.model('Album', AlbumSchema);

export default model;
