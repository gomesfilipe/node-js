const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemacadastro', 'root', 'mysqlfilipe123!', {
    host: "localhost",
    dialect: "mysql"
})

const post = sequelize.define('posts', { // Criando nova tabela.
    title: {
        type: Sequelize.STRING // Tem limite de caracteres.
    },
    content: {
        type: Sequelize.TEXT // Não tem limite de caracteres.
    }
})

const users2 = sequelize.define('users2', {
    name: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

post.create({ // Inserindo post na tabela de posts.
    title: "post title",
    content: "ola, blablabla......"
})

users2.create({ // Inserindo usuário na tabela de usuários.
    name: "Filipe",
    lastName: "Gomes",
    age: 22,
    email: "email@gmail.com"
})

// Só usar esse comando para criar uma nova tabela, depois deve comentar.
post.sync({force: true}) // Sincronizando com o mysql.
users2.sync({force: true})
