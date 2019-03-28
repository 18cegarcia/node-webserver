const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let rolesValidos={
    values:['ADMIN-ROLE','USER-ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true

    },
    img:{
        type:String,
        require:false
    },
    role:{
        type:String,
        default:['USER-ROLE','ADMIN-ROLE'],
        enum:  rolesValidos
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default:false
    }

});

usuarioSchema.methods.toJSON= function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} Ya existe esa cuenta de correo;'});
module.exports=mongoose.model('Usuario',usuarioSchema);


