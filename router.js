let express = require('express');
let router = express.Router();

// Import user controller
const movieController = require('./controllers/movieController');
const categoryController = require('./controllers/categoryController');



router.get('/api/movie', movieController.movieList);
router.post('/api/movie', movieController.movieCreate)
router.put('/api/movie/:movieId', movieController.movieUpdate);
router.delete('/api/movie/:movieId', movieController.movieDelete);


router.get('/api/movie/:movieId', movieController.movieFindOne);
router.get('/api/category/:categoryId', categoryController.categoryFindOne);

//router.get('/api/category/:categoryId/movies', categoryController.categoryFindMovies);


router.get('/api/category', categoryController.categoryList);
router.post('/api/category', categoryController.categoryCreate)
router.put('/api/category/:categoryId', categoryController.categoryUpdate);
router.delete('/api/category/:categoryId', categoryController.categoryDelete);

module.exports = router;