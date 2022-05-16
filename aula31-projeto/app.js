// Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
// const mongoose = require('mongoose')

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

// Configuração Public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.use('/admin', admin) // Prefixo para rotas do grupo admin.

// Outros
const door = 8081
app.listen(door, () => {
    console.log('The server is running in http://localhost:8081')
})
