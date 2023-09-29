
//Acciones de prueba

const prueba_follow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado dsde controlador follow"
    });
}


//Exportar acciones

module.exports = {
    prueba_follow
}
