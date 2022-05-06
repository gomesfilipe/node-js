var http = require('http') // Importando módulo http

http.createServer(function(req, res) { // Função de callback passada.
    res.end('Hello World!') // O parâmrtro res é para enviar respostas e o req requisições
}).listen(8081) // Porta 8081

console.log('The server is running!')

// npm install express --save
