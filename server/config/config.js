////
// PUERTO
process.env.PORT=process.env.PORT || 8080;
process.env.NODE_ENV=process.env_NODE_ENV || 'dev';
let urldb ;
//if (process.env.NODE_ENV==='dev'){
  //urldb='mongodb://localhost:27017/cafe';
//}else{
    urldb='mongodb+srv://cegarcia:zF0c4HYkxDv1zfv6@cluster0-zshzn.mongodb.net/cafe';
//}
process.env.URLDB=urldb;
