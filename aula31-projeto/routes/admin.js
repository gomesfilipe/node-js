const read = require('body-parser/lib/read')
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
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

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao deletar categoria.')
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', (req, res) => {
    Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) => {
        res.render('admin/postagens', {postagens: postagens})
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao listar as postagens.')
        res.redirect('/admin')
    })
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao carregar o formulário.')
        res.redirect('/admin')
    })
})

router.post('/postagens/nova', (req, res) => {
    var errors = []

    if(req.body.categoria == '0') {
        errors.push({text: 'Categoria inválida, registre uma para fazer uma postagem.'})
    }

    if(errors.length > 0) {
        res.render('admin/addpostagem', {errors: errors})   
    
    } else {
        const newPostagem = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(newPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao criar postagem. Tente novamente.')
        })
    }
})

router.get('/postagens/edit/:id', (req, res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})

        }).catch((error) => {
            res.flash('error_msg', 'Erro ao listar as categorias.')
            res.redirect('/admin/postagens')
        })

    }).catch((error) => {
        req.flash('error_msg', 'Erro ao carregar o formulário de edição.')
        res.redirect('/admin/postagens')
    }) 
})

router.post('/postagens/edit', (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.title = req.body.title
        postagem.slug = req.body.slug
        postagem.description = req.body.description
        postagem.content = req.body.content
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao salvar edição da postagem. 1')
            res.redirect('/admin/postagens')
        })

    }).catch((error) => {
        req.flash('error_msg', 'Erro ao salvar edição da postagem. 2')
        res.redirect('/admin/postagens')
    })
})

router.get('/postagens/deletar/:id', (req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    }).catch((error) => {
        req.flash('error_msg', 'Erro ao deletar postagem.')
        res.redirect('/admin/postagens')
    })
})

module.exports = router
