const express = require('express');

const Producto = require('../models/producto');
const { verificaToken } = require('../middleware/autenticacion');

const app = express();

// Mostrar todos los productos
app.get('/producto', verificaToken, (req, res) => {
    // populate: categoria usuario
    //ordenado


    let desde = req.body.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(10)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Producto.count((err, conteo) => {

                res.json({
                    ok: true,
                    count: conteo,
                    productos

                })
            })
        })
});

// Mostrar producto por id
app.get('/producto/:id', verificaToken, (req, res) => {
    // populate: categoria usuario

    let id = req.params.id

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
})

// Buscar productos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    // populate: categoria usuario

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
})


// Crear producto
app.post('/producto', verificaToken, (req, res) => {
    // populate: categoria usuario

    let body = req.body;

    let idUsuario = req.usuario._id;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        usuario: idUsuario,
        categoria: body.categoria
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB

        })
    })
})

// Actualizar producto
app.put('/producto/:id', verificaToken, (req, res) => {
    // populate: categoria usuario

    let id = req.params.id

    let updatedProducto = {
        nombre: req.body.nombre,
        precioUni: req.body.precio,
        descripcion: req.body.descripcion
    }

    Producto.findByIdAndUpdate(id, updatedProducto, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })

})


// borrar producto
app.delete('/producto/:id', verificaToken, (req, res) => {
    // populate: categoria usuario

    let id = req.params.id

    let deleteProducto = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, deleteProducto, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })

})















module.exports = app;