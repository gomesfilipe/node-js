const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemacadastro', 'root', 'mysqlfilipe123!', {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function() { // Testando se conectou ao banco de dados com sucesso.
    console.log('Success!')
}).catch(function(error) {
    console.log('Failed! ' + error)
})
