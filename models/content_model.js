const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    categoria:{
        type: String,
        require: true
    },
    enlace:{
        type: String,
        require: true
    },
    imagen:{
        type: String,
        require: true
    },
    enable:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Content', contentSchema)