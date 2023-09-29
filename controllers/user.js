
//Acciones de prueba

const prueba_user = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado dsde controlador usuario"
    });
}


//Exportar acciones

module.exports = {
    prueba_user
}
