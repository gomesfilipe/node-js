const express = require('express')
const res = require('express/lib/response')
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
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao listar categorias. Atualize a página.')
        res.redirect('/admin')
    })
    // res.send('Página de categorias')
})

router.post('/categorias/nova', (req, res) => {
    // Validação do formulário.
    var errors = []
    
    if(!req.body.name || typeof(req.body.name) == undefined || req.body.name == null) {
        errors.push({text: 'Nome inválido!'})
    }

    if(!req.body.slug || typeof(req.body.slug) == undefined || req.body.slug == null) {
        errors.push({text: 'Slug inválido!'})
    }

    if(req.body.name.length < 2) {
        errors.push({text: 'Nome da categoria muito pequeno!'})
    }

    if(errors.length > 0) {
        res.render('admin/addcategorias', {errors: errors})
    } else {
        const newCategoria = {
            name: req.body.name,
            slug: req.body.slug
        }
    
        new Categoria(newCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((error) => {
            req.flash('error_msg', 'Erro na criação da categoria. Tente novamente.')
            res.redirect('/admin')
        })  
    }
    
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((error) => {
        req.flash('error_msg', 'Categoria inexistente.')
        res.redirect('/admin/categorias')
    })
    
    // res.send('Página de editar categorias!')
})

router.post('/categorias/edit', (req, res) => {
    // Validação do formulário.
    var errors = []

    if(!req.body.name || typeof(req.body.name) == undefined || req.body.name == null) {
        errors.push({text: 'Nome inválido!'})
    }

    if(!req.body.slug || typeof(req.body.slug) == undefined || req.body.slug == null) {
        errors.push({text: 'Slug inválido!'})
    }

    if(req.body.name.length < 2) {
        errors.push({text: 'Nome da categoria muito pequeno!'})
    }
    
    if(errors.length > 0) {
        // Não é a melhor forma.
        var msg = ''
        for(var i in errors) {
            msg += errors[i].text + ' '
        }

        req.flash('error_msg', msg)
        res.redirect(`/admin/categorias/edit/${req.body.id}`)
    } else {
        Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.name = req.body.name
            categoria.slug = req.body.slug
            
            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso!')
                res.redirect('/admin/categorias')
            }).catch((error) => {
                req.flash('error_msg', 'Erro ao editar categoria.')
                res.redirect('/admin/categorias')
            })
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao editar categoria.')
            res.redirect('/admin/categorias')
        })
    }
})

module.exports = router
