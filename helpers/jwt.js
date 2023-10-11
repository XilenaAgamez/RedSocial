//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");


//Clave secreta
const secret = "CLAVE_SECRETA_REDSOCIAL_4415";

//Crear funcion para generar token

const createToken = (user) =>{
    const payload = {
        id: user._id,
        name : user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    //Devolver jwt token codificado
    return jwt.encode(payload, secret);
}


module.exports={
    secret, 
    createToken
}


