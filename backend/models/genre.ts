import mongoose from 'mongoose';

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: { type: String, required: true },
});

const model = mongoose.model('Genre', GenreSchema);

export default model;
