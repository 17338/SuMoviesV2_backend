const Sequelize = require('sequelize')
const db = require('../db.js')

const Movie = db.define('movie', {
    movieId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    synopsys: {type: Sequelize.TEXT, allowNull: false },
    image:{ type: Sequelize.TEXT, allowNull: false},
    createdAt: { type: Sequelize.DATE, allowNull: false},
    duration: { type: Sequelize.TIME, allowNull: false},
    summary: { type: Sequelize.TEXT, allowNull: false}
})

module.exports = Movie