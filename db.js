const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'sumoviesv2', 
    'root', 
    'root',  {
    dialect: 'mysql',
    host: 'localhost'
   }
);
module.exports = sequelize