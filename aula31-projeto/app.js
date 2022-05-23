// Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const usuarios = require('./routes/usuario')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Postagem')
require('./models/Categoria')

const Postagem = mongoose.model('postagens')
const Categoria = mongoose.model('categorias')

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
app.use('/usuarios', usuarios) // Prefixo para rotas do grupo usuarios.

app.get('/', (req, res) => {
    Postagem.find().sort({date: 'desc'}).populate('categoria').then((postagens) => {
        res.render('index', {postagens: postagens})
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao carregar postagens.')
        res.redirect('/404')
    })
    
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({slug: req.params.slug}).then((postagem) => {
        if(postagem) {
            res.render('postagem/index', {postagem: postagem})
        } else {
            req.flash('error_msg', 'Postagem inexistente.')
            res.redirect('/')
        }
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao abrir página da postagem.')
        res.redirect('/')
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('categorias/index', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao listar categorias.')
        res.redirect('/')
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
        if(categoria) {
            Postagem.find({categoria: categoria._id}).then((postagens) => {
                res.render('categorias/postagens', {postagens: postagens, categoria: categoria})

            }).catch((error) => {
                req.flash('error_msg', 'Erro ao listar postagens dessa categoria.')
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', 'Categoria inexistente.')
            res.redirect('/')
        }
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao listar postagens dessa categoria.')
        res.redirect('/')
    })
})

app.get('/404', (req, res) => {
    res.send('ERROR 404!')
})

// Outros
const door = 8081
app.listen(door, () => {
    console.log('The server is running in http://localhost:8081')
})
