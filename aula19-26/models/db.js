// Arquivo para link com o bando de dados postApp.

const Sequelize = require('sequelize')

const sequelize = new Sequelize('postApp', 'root', 'mysqlfilipe123!', {
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
