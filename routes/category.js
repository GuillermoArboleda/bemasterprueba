const express = require('express');
const rute = express.Router();

rute.get('/', (req, res) => {
    res.json('Listo el Get de CATEGORY....')
})

module.exports = rute;