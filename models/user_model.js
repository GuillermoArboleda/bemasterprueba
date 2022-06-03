const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    userstate:{
        type: Boolean,
        default: true
    },
    userimg:{
        type: String,
        require: false
    },
    usercategory:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model('User', userSchema)

