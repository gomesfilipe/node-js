const db = require('./db')

const Post = db.sequelize.define('postsTable', { // Criando tabela de posts.
    title: {
        type: db.Sequelize.STRING
    },
    content: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Post // Para acessar a tabela de outros arquivos.

// Post.sync({force: true}) // Sincronizando com o bando de dados (comentar após o primeiro uso).
