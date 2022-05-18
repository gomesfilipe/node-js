// Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Configuração sessão
app.use(session({
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') // Variável global.
    res.locals.error_msg = req.flash('error_msg') // Variável global.
    next() // Middleware permitindo a requisição continuar.
})

// Configuração Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configuração Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))

app.set('view engine', 'handlebars')

// Configuração Mongoose
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/blogapp").then(() => {
    console.log('Connected to Mongo!')
}).catch((error) => {
    console.log('Failed to connect to Mongo! ' + error)
})

// Configuração Public
app.use(express.static(path.join(__dirname, 'public')))

// Middleware
// app.use((req, res, next) => {
//     console.log('Hello, I am a Middleware!')
//     next()
// })

// Rotas
app.use('/admin', admin) // Prefixo para rotas do grupo admin.

// Outros
const door = 8081
app.listen(door, () => {
    console.log('The server is running in http://localhost:8081')
})
