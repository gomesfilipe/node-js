const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Welcome to my web app!')
})

app.get('/about', function(req, res) {
    res.send('My page about!')
})

app.get('/blog', function(req, res) {
    res.send('Welcome to my blog!')
}) 

app.get('/blog/article', function(req, res) {
    res.send('Any articles here!')
})

app.get('/hello/:name/:age/:height', function(req, res) { // Enviando parâmetros
    // res.send(req.params)
    // Só pode usar send 1 vez a cada requisição, se não dá erro.
    res.send('<h1>Hello ' + req.params.name + '!</h1>' + '<h2>You are ' + req.params.age + ' years old!</h2>' + '<h3>Your height is ' + req.params.height + ' centimeters!</h3>')
    
})

// app.listen(8081) // Também pode ser assim.

app.listen(8081, function() {
    console.log('The server is running in http://localhost:8081')
}) // Sempre última linha do código.