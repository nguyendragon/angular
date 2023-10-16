import mongoose from 'mongoose';

const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: String,
    movieId: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
});

const Category = mongoose.model('Category', categoriesSchema);
export default Category;
