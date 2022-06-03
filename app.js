const user = require('./routes/users');
const content = require('./routes/content');
const category = require('./routes/category');
const login = require('./routes/login');
const contentUser = require('./routes/contentUser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
//middlewares
const corse = require('cors');
const bodyParser = require("body-parser");
app.use(corse());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('client/build'));
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//Conexion con base de datos
mongoose.connect('mongodb+srv://root:123@cluster0.jwxt0.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado con DB'))
    .catch(() => console.log('No se puedo conectar con DB'))

app.use('/users', user);
app.use('/content', content);
app.use('/category', category);
app.use('/login', login);
app.use('/contentUser', contentUser);


//Iniciamos Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`BackEnd escuchando por puerto ${port}....`)
})