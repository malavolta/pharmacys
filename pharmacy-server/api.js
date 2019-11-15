'use strict'

const express = require('express')
const debug = require('debug')
const { parsePayload } = require('./utils')
const rp = require("request-promise-native");
const { getPharmacys, pharmacys } = require("./lib/pharmacy")

const api = express.Router()

api.get('/pharmacy/turn', async(req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')

    if (!req.query.id_comuna || !req.query.local_nombre) {
        let pharmacys = await getPharmacys()
        res.status(200).send(pharmacys)
        return
    }
    if (req.query.local_nombre.length < 3) {
        res.status(400).send('{ code: 400 }')
        return
    }

    let pharmacys = await getPharmacys()
    let pharmacysFilter = pharmacys.filter(a => a.fk_comuna === req.query.id_comuna && a.local_nombre.includes(req.query.local_nombre))

    if (pharmacysFilter.length >= 2) {
        res.send(
            pharmacysFilter
        )
    } else {
        res.status(404).send('{ code: 404 }')
        return
    }
})

api.get('/comunas', async(req, res, next) => {
    console.log('qui')
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'application/json')
    var options = {
        method: 'POST',
        uri: 'https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones',
        form: {
            reg_id: '7'
        },
        json: false
    };

    let comunas = await rp(options)
    console.log(comunas)
    res.send(comunas)
})

module.exports = api