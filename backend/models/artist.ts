import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
});

const model = mongoose.model('Artist', ArtistSchema);

export default model;
