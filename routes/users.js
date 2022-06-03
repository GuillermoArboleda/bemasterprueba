const express = require('express');
const User = require('../models/user_model');
const rute = express.Router();
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

rute.get('/',verificarToken, (req, res) => {
    let result = traerUsers();

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

async function traerUsers(){
    let users = await User.find();
    return users;
}

rute.post('/', (req, res) => {
    let body = req.body;
    let result = newUser(body);

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

rute.put('/:id', verificarToken, (req, res) => {
    let body = req.body;
    let result = updateUser(req.params.id, body);

    result.then(value => {
        res.json({
            value: "Ok"
        })
    }).catch(err =>{
        res.status(400).json({
            error: err
        })
    })
})

rute.delete('/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    let result = deleteUser(id);

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

async function newUser(body){
    let user = new User({
        email:  body.email,
        name:   body.name,
        password:   body.password,
        usercategory:   body.usercategory
    })
    return await user.save();
}

async function updateUser(id, body){
    let uStatus = false;
    if(body.userstateAux === "true"){
        uStatus = true
    }

    let user = await User.findOneAndUpdate({"_id":id}, {
        $set:{
            email: body.emailAux, 
            nombre: body.nombreAux1,
            password: body.passwordAux,
            userstate: body.userstateAux,
            status: body.categoriaAux1
        }
    }, {new: true});
    return user;
}

async function deleteUser(id){
    let user = await User.deleteOne({_id: id});
    return user;
}


module.exports = rute;