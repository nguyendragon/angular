import { Router } from 'express';
import * as movies from '../controllers/movie';
import { checkPermission } from '../middlewares/permission';

const router = Router();

// CRUD Movies
router.get('/', movies.getAllMovies);

router.get('/search', movies.SearchMovieByKeywords);

router.get('/:movieId', movies.getMovieById);

router.post('/', movies.createMovie);

router.put('/', movies.updateMovie);

router.delete('/:movieId', movies.deleteMovie);

export default router;
