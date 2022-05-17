const express = require('express')
const router = express.Router()

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

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

module.exports = router
