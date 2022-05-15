const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// Configurando.
// Template engine.
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))

app.set('view engine', 'handlebars')

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rotas
app.get('/', function(req, res) {
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts) {
        console.log(posts)
        res.render('home', {posts: posts})
    })
    
})

app.get('/register', function(req, res) {
    res.render('form')
})

// Rota só pode ser acessada ao enviar formulários.
app.post('/receiveforms', function(req, res) {
    Post.create({ // Inserindo post na tabela de posts.
        title: req.body.title,
        content: req.body.content
    
    }).then(function() {
        // res.send("Post created success!")
        res.redirect('/') // Voltando para página inicial após envio do formulário.
    
    }).catch(function(error) {
        res.send("Ocurred an error: " + error)
    })
    
    // res.send('Form success sent!<br>Title: ' + req.body.title + '<br>Content: ' + req.body.content)
})

app.get('/delete/:id', function(req, res) {
    Post.destroy({where: {'id': req.params.id}}).then(function() {
        res.send("Post deleted success!")
    }).catch(function(error) {
        res.send("This post doesn't exist!")
    })
})

app.listen(8081, function() {
    console.log('The server is running in http://localhost:8081')
}) // Sempre última linha do código.
