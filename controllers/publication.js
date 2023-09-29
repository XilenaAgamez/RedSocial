
//Acciones de prueba

const prueba_publication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado dsde controlador publication"
    });
}


//Exportar acciones

module.exports = {
    prueba_publication
}
