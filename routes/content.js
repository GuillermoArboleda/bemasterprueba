const express = require('express');
const rute = express.Router();
const Content = require('../models/content_model');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//middlewares
rute.use(cors());
rute.use(express.json());
rute.use(express.urlencoded({extended:true}))

let verificarToken = (req, res, next) =>{
    let token = req.get("Autorization");
    jwt.verify(token, "secret", (err, decoded) => {
        if(err){
            return res.status(401).json({
                err
            })
        }
        req.msj = decoded.msj
        next()
    });
}

rute.get('/:status', verificarToken, (req, res) => {
    
    let statusUser = req.params.status;    

    let result = traerContent(statusUser);

    result.then(value => {
        res.json({
            value: value
        })
    }).catch(err =>{
        res.status(400).json({
            error: err
        })
    })
})

rute.post('/', verificarToken, (req, res) => {

    let body = req.body;
    let result = newContent(body);

    result.then( user => {
        res.json({
            msj: user,
            value: "Ok"
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        })
    })
})

rute.delete('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let result = borrarPeli(id);

    result.then( user => {
        res.json({
            user: user,
            value: "Ok"
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        })
    })

})

rute.put('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let result = actualizarPeli(id, body);

    result.then( user => {
        res.json({
            user: user,
            value: "Ok"
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        })
    })
})

async function actualizarPeli(id, body){
    let content = await Content.updateOne({"_id":id}, {$set: {
        nombre: body.nombre,
        enlace: body.enlace,
        categoria: body.categoria,
        imagen: body.imagen,
        enable: body.enable
    }});

    return content;
}

async function borrarPeli(id){
    let content = await Content.deleteOne({"_id":id});
    return content
}

async function traerContent(statusUser){

    let content = [];    

    if(statusUser.toString() === "admin"){
        content = await Content.find();
    }else{
        content = await Content.find({enable: {$regex: statusUser} });
        
    }    

    return content;
}

async function newContent(body){
    let content = new Content({
        nombre:         body.nombre,
        categoria:      body.categoria,
        enlace:         body.enlace,
        imagen:         body.imagen
    })
    return await content.save();
}

module.exports = rute;