////
// PUERTO
process.env.PORT = process.env.PORT || 8080;
process.env.NODE_ENV = process.env_NODE_ENV || 'dev';



//VEcIMIENTO TOKEN y SEED

process.env.caducidad_TOKEN=60*60*12*12;
process.env.SED=process.env.SED||'secret-demo' ;


let urldb;
//if (process.env.NODE_ENV === 'dev') {
   // urldb = 'mongodb://localhost:27017/cafe';
//}// else {
    urldb = process.env.MONG_URI;
//}
process.env.URLDB = urldb;

