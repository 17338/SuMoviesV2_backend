const Sequelize = require('sequelize')

const db = {};
db.Sequelize = Sequelize;

db.Movie = require('../models/movieModel');
db.Category = require('../models/categoryModel');

db.Movie.belongsToMany(db.Category, {
    through: "Category_Movie",
    as: "category",
    foreignKey: "movieId",
});

db.Category.belongsToMany(db.Movie, {
    through: "Category_Movie",
    as: "movie",
    foreignKey: "categoryId",
})
module.exports = db