import { Router } from 'express';
import * as movies from '../controllers/movie';
import { checkPermission } from '../middlewares/permission';

const router = Router();

// CRUD Movies
router.get('/', movies.getAllMovies);

router.get('/search', movies.SearchMovieByKeywords);

router.get('/:movieId', movies.getMovieById);

router.post('/', checkPermission, movies.createMovie);

router.put('/', checkPermission, movies.updateMovie);

router.delete('/', checkPermission, movies.deleteMovie);

export default router;
