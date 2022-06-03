const express = require('express');
const ruta = express.Router();
const cors = require('cors');
const Usuario = require('../models/user_model');
const jwt = require('jsonwebtoken');
//middlewares
ruta.use(cors());
ruta.use(express.json());
ruta.use(express.urlencoded({extended:true}))

ruta.post('/', (req, res) => {
    
    let body = req.body;
    Usuario.findOne({email: body.email}, (err, user) => {
        if(err){
            return res.json({
                error: err
            })
        }
        if(!user){
            return res.json({
                msj: "Contrasenia y/o usuario mal ingresados"
            })
        }
        if(user){
            if(user.password === body.password){
                const jwtoken = jwt.sign({_id: user._id}, 'secret', {expiresIn: '1h'})
                return res.json({
                    msj: "OK", jwtoken, user
                })
            }
            else{
                return res.json({
                    msj: "Contrasenia y/o usuario mal ingresados"
                })
            }
        }
    })
})

module.exports = ruta;