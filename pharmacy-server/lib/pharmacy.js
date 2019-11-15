'use strcit'

const request = require('request')
const { parsePayload } = require('../utils')
const rp = require("request-promise-native");

const getPharmacys = async() => {
    let options = {
        uri: 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7',
        json: true
    };
    return await rp(options)
}
let pharmacys = 'hola'

module.exports = {
    pharmacys,
    getPharmacys
}