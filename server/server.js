require ('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app= express();
const bodyParser =require('body-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require('./routes/usuario') ) ;

mongoose.connect(process.env.URLDB,
    {useNewUrlParser:true,useCreateIndex:true},
    (err,res)=>{
    if(err) {
        console.log('errr',err);
    }
    console.log('Base de datos Online');
});

app.listen(process.env.PORT,()=>{
    console.log(`puerto ${process.env.PORT}`);
});


