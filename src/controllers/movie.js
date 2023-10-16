import * as validate from '../validations/validateMovie';
import Movie from '../models/movie';
import Category from '../models/category';
import mongoose from 'mongoose';

// Controller
export const getAllMovies = async function (req, res) {
    try {
        const movies = await Movie.find({}).limit(11).sort({ fieldName: -1 }).populate({
            path: 'categories',
        });

        if (movies) {
            res.status(200).send(movies);
        } else {
            res.status(500).send({
                message: 'Server internal errors',
            });
        }
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMovieById = async function (req, res) {
    try {
        const { movieId } = req.params;

        if (!mongoose.isValidObjectId(String(movieId))) {
            return res.status(400).json({ message: 'Invalid movieId' });
        }

        const movie = await Movie.findById(movieId).populate({
            path: 'categories',
        });

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
        } else {
            res.status(200).json(movie);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createMovie = async function (req, res) {
    try {
        const movieData = { ...req.body };

        const error = validate.validateMovie(movieData);

        for (const categoryId of movieData.categories) {
            if (!mongoose.isValidObjectId(String(categoryId))) {
                return res.status(400).json({ message: `Invalid categoryId: ${categoryId}` });
            }

            const existingCategory = await Category.findById(categoryId);
            if (!existingCategory) {
                return res.status(400).json({ message: `Category not found with id: ${categoryId}` });
            }
        }

        const movie = await Movie.create(movieData);

        await Category.findByIdAndUpdate(movie.categories, {
            $addToSet: {
                movieId: movie._id,
            },
        });

        if (!movie) {
            res.status(400).json({
                message: 'Movie created Failed',
                movie: movie,
            });
            return;
        }

        if (!error) {
            res.status(201).json({
                message: 'Movie created successfully',
                movie: movie,
            });
        } else {
            res.status(400).json({
                error: error.message,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateMovie = async function (req, res) {
    try {
        const movieData = { ...req.body };
        const error = validate.validateMovieUpdate(movieData);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        if (movieData.categories) {
            for (const categoryId of movieData.categories) {
                if (!mongoose.isValidObjectId(String(categoryId))) {
                    return res.status(400).json({ message: `Invalid categoryId: ${categoryId}` });
                }

                const existingCategory = await Category.findById(categoryId);
                if (!existingCategory) {
                    return res.status(400).json({ message: `Category not found with id: ${categoryId}` });
                }
            }
        }
        const oldMovie = await Movie.findOne({ _id: movieData._id });
        const newMovie = await Movie.findOneAndUpdate({ _id: movieData._id }, { ...movieData }, { new: true });

        // Xóa `movieId` khỏi danh mục cũ
        const oldCategoryId = oldMovie.categories;
        await Category.findByIdAndUpdate(oldCategoryId, { $pull: { movieId: movieData._id } });
        // Thêm `movieId` vào danh mục mới
        await Category.findByIdAndUpdate(movieData.categories, { $addToSet: { movieId: movieData._id } });


        if (!newMovie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        res.status(200).json({ message: 'Movie updated successfully', movie: newMovie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteMovie = async function (req, res) {
    try {
        const { movieId } = req.params;

        if (!mongoose.isValidObjectId(String(movieId))) {
            return res.status(400).json({ message: 'Invalid movieId' });
        }

        const movie = await Movie.findByIdAndDelete({ _id: movieId });

        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        res.status(200).json({ message: 'Movie deleted successfully', movie: movie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const SearchMovieByKeywords = async function (req, res) {
    try {
        const { keywords } = req.query;

        const movies = await Movie.find({ $text: { $search: keywords } }, { score: { $meta: 'textScore' } })
            .sort({
                score: { $meta: 'textScore' },
            })
            .populate({
                path: 'categories',
            });

        res.status(200).json({ movies: movies });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
