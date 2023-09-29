const mongoose = require ("mongoose");

const conectar = async function(){
    try {
        await mongoose.connect("mongodb://localhost:27017/redsocial");
        console.log("Conectado correctamente a bd: redsocial");

    } catch (error) {
        console.log(error);
        throw new   Error("No se ha podido conectar a la base de datos");
    }
}

module.exports =  conectar