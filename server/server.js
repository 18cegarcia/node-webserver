require ('./config/config');
const express = require('express');
const bodyParser =require('body-parser');
const app= express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/usuario',function (req,res) {
    let body = req.body;

    if(body.nombre == undefined){
        res.status(400).json({
            ok:false,
            mensaje:'usuario necesario'
        })
    }else{
        res.json({
            persona:body
        });
    }
});
app.get ('/usuario',function (req,res) {
    res.json('getUsuario')
});

app.put('/usuario/:id',function (req,res) {
    let id=req.params.id;
    res.json({
        id
    });

});
app.delete('/usuario',function(req,res){
res.json('delete');
});

app.listen(process.env.PORT,()=>{
    console.log(`puerto ${process.env.PORT}`);
});