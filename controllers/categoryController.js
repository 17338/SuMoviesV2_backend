const db = require('../models/index');
const Movie = db.Movie;
const Category = db.Category;

exports.categoryList = async function (req, res) {
    await Category.findAll({ include: [
        {
          model: Movie,
          as: "movie"
         
        },
      ], })
        .then(data => {
            console.log("All Categories:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.categoryCreate = async (req, res) => {
    let category = Category.build({ 
        name: req.body.name
    })
    await category.save()
        .then(data => {
            console.log(category.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.categoryUpdate = async function (req, res) {
    if (req.params.categoryId > 0) {
        await Category.update(
            { 
                name: req.body.name
            },
            { where: { categoryId : req.params.categoryId  } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}


exports.categoryDelete = async function (req, res) {
    if (req.params.categoryId) {
        await Category.destroy({ where: { categoryId: req.params.categoryId } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.categoryFindOne = async function (req, res) {
    if (req.params.categoryId) {
        await Category.findOne({ include: [
            {
              model: Movie,
              as: "movie"
             
            },
          ],where: {categoryId: req.params.categoryId} })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}



