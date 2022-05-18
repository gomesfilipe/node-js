const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render('admin/index')
    // res.send('Página principal do painel ADM')
})

router.get('/posts', (req, res) => {
    res.send('Página de posts')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
    // res.send('Página de categorias')
})

router.post('/categorias/nova', (req, res) => {
    const newCategoria = {
        name: req.body.name,
        slug: req.body.slug
    }

    new Categoria(newCategoria).save().then(() => {
        console.log('Success to create!')
    }).catch((error) => {
        console.log('Failed to create! ' + error)
    })  
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

module.exports = router
