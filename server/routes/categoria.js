const express = require('express');
const _ = require('underscore')

const Categoria = require('../models/categoria');

const { verificaToken, verificaAdminRole } = require('../middleware/autenticacion')

const app = express();

/// Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find()
        .sort('descripcion')
        .populate('usuario', 'email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Categoria.count((err, conteo) => {

                res.json({
                    ok: true,
                    count: conteo,
                    categorias,
                    usuario: req.usuario

                })
            })
        })
});

/// Mostrar una categoria
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});


/// Crear una categoria
app.post('/categoria/', verificaToken, (req, res) => {

    let body = req.body;

    let idUsuario = req.usuario._id;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: idUsuario
    })

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});


/// actualizar una categoria
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id

    let descCategoria = {
        descripcion: req.body.descripcion
    }

    console.log(descCategoria);

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

});


/// borrar una categoria
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Categoria no encontrada'
                }
            })
        }

        res.json({
            ok: true,
            mensaje: 'Categoria Borrada',
            categoria: categoriaDB
        })
    })
});




module.exports = app;