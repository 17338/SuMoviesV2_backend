const db = require('../models/index');
const { categoryCreate } = require('./categoryController');
const Movie = db.Movie;
const Category = db.Category;

exports.movieList = async function (req, res) {
    await Movie.findAll({ include: [
        {
          model: Category,
          as: "category"
         
        },
      ], })
        .then(data => {
            console.log("All movies:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.movieCreate = async (req, res) => {
    let movie = Movie.build({ 
        title: req.body.title, 
        synopsys: req.body.synopsys,
        image: req.body.image,
        createdAt: req.body.createdAt,
        duration: req.body.duration,
        summary: req.body.summary
    })
    await movie.save()
        .then(data => {
            console.log(movie.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.movieUpdate = async function (req, res) {
    if (req.params.movieId > 0) {
        await Movie.update(
            {   title: req.body.title, 
                synopsys: req.body.synopsys,
                image: req.body.image,
                createdAt: req.body.createdAt,
                duration: req.body.duration,
                summary: req.body.summary
            },
            { where: { movieId : req.params.movieId  } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Movie not found' })
}


exports.movieDelete = async function (req, res) {
    if (req.params.movieId) {
        await Movie.destroy({ where: { movieId: req.params.movieId } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Movie not found' })
}

exports.movieFindOne = async function (req, res) {
    if (req.params.movieId) {
        await Movie.findOne({include: [
            {
              model: Category,
              as: "category"
             
            },
          ], where: { movieId: req.params.movieId} })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Movie not found' })
}

exports.addMoviesByCategory = async function (req,res){
    let movie = await Movie.findById(req.body.movieId);
    await Category.addMovie(movie);
}