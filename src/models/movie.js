import mongoose from 'mongoose';

const { Schema } = mongoose;

const moviesSchema = new Schema({
    title: String,
    year: Number,
    categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    extract: String,
    imageUrl: String,
    duration: String,
    nation: String,
    episode: Array,
});

moviesSchema.index({ title: 'text', extract: 'text' });
const Movie = mongoose.model('Movie', moviesSchema);

export default Movie;
