const mongoose = require('mongoose')

// Configurando o mongoose.
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/bancodedados", {
    useNewUrlParser: true
}).then(() => {
    console.log('Conected success!')
}).catch((error) => {
    console.log('Failed to connect: ' + error)
})

// Definindo model
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true    
    },

    age: {
        type: Number,
        require: true
    },

    country: {
        type: String,
        require: true
    }
})

// Collection ("""tabela""")
mongoose.model('users', UserSchema)

// Inserindo user na collection.
const newUser = mongoose.model('users')

new newUser({
    name: "Filipe",
    lastName: "Gomes",
    email: "email@gmail.com",
    age: 22,
    country: "Brazil"
}).save().then(() => {
    console.log('User created success!')
}).catch((error) => {
    console.log('Failed to create user: ' + error)
})

// show databases; (Mostrar todos os bancos de dados)
// use nome_bd; (Acessar um banco de dados)
// show collections; (Mostrar uma collection de um bando de dados)
// db.nome_collection.find() (Mostrar todos os dados de uma collection)
