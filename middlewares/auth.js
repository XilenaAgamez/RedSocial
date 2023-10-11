//Importar dependencias o modulos

const jwt = require ("jwt-simple");
const moment= require("moment");

//Importar clave secreta

const libjwt = require ("../helpers/jwt");
const secret = libjwt.secret;

//MIDDLEWARE de autenticacion
exports.auth = (req, res, next) =>{

    //Comprobar si me llega la header de autenticacion 
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "error",
            message: "La cabecera no tiene la cabecera de autenticacion"
        });
    }

    //Limpiar el token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    //Decodificar el token
    try {
        
        let payload = jwt.decode(token, secret);

        console.log(payload.exp);
        
        //Comprobar expiracion
        if(payload.exp<= moment.unix()){
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            });
        }

        //Agregar datos de usuarios a request
        req.user = payload;

    } catch (ex) {
        return res.status(404).send({
            status: "error",
            message: "Token invalido",
            error
        });
    }




    //Pasar a ejecucion de accion
    next();
}

