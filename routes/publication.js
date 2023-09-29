const express = require ("express");
const router= express.Router();
const PublicationController = require("../controllers/publication");

//Definir rutas

router.get("/prueba_publicacion", PublicationController.prueba_publication);

//Exportar  Router
module.exports = router;