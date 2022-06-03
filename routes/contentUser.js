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

rute.get('/:nombre/:categoria/:enable', verificarToken, (req, res) => {
    let nombre = req.params.nombre;
    let categoria = req.params.categoria;
    let enablePeli = req.params.enable;

    let result = filtroPelis(nombre, categoria, enablePeli);

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

async function filtroPelis(nombre, categoria, enablePeli){

    let content = [];

    
        if(nombre != "sn" && categoria != "sn"){
            content = Content.find({categoria: {$regex: categoria} ,nombre: {$regex: nombre}, enable: {$regex: enablePeli}});        
        }else if(nombre != "sn"){
            content = Content.find({nombre: {$regex: nombre}, enable: {$regex: enablePeli}});  
        }else if(categoria != "sn"){
            content = Content.find({categoria: {$regex: categoria}, enable: {$regex: enablePeli}});  
        }else{
            content = Content.find({enable: {$regex: enablePeli}});  
        }


    return await content;
}

module.exports = rute;