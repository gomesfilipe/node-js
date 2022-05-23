const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')

router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {
    var errors = []

    if(!req.body.name || typeof(req.body.name) == undefined || req.body.name == null) {
        errors.push({text: 'Nome inválido!'});
    }

    if(!req.body.email || typeof(req.body.email) == undefined || req.body.email == null) {
        errors.push({text: 'E-mail inválido!'});
    }

    if(!req.body.password || typeof(req.body.password) == undefined || req.body.password == null) {
        errors.push({text: 'Senha inválida!'});
    }

    if(req.body.password.length < 4) {
        errors.push({text: 'Senha muito curta! Ela deve conter pelo menos 4 caracteres.'});
    }

    if(req.body.password != req.body.password2) {
        errors.push({text: 'Senhas diferentes.'});
    }

    if(errors.length > 0) {
        res.render('usuarios/registro', {errors: errors})
    } else {

    }
})

module.exports = router
