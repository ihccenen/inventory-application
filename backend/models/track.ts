import mongoose from 'mongoose';

const { Schema } = mongoose;

const TrackSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

const model = mongoose.model('Track', TrackSchema);

export default model;
