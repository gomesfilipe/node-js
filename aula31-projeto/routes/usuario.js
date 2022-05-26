const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

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
        Usuario.findOne({email: req.body.email}).then(usuario => {
            if(usuario) {
                req.flash('error_msg', 'E-mail já cadastrado. Tente novamente.')
                res.redirect('/usuarios/registro')
            } else {
                const newUsuario = new Usuario({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUsuario.password, salt, (error, hash) => {
                        if(error) {
                            req.flash('error_msg', 'Erro durante salvamento do usuário.')
                            res.redirect('/')
                        }

                        newUsuario.password = hash

                        newUsuario.save().then(() => {
                            req.flash('success_msg', 'Usuário criado com sucesso!')
                            res.redirect('/')
                        }).catch((error) => {
                            req.flash('error_msg', 'Erro ao criar usuário, tente novamente.')
                            res.redirect('/usuarios/registro')
                        })
                    })
                })
            }
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao cadastrar conta.')
            res.redirect('/') 
        })
    }
})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true 
    })(req, res, next)
})

module.exports = router
