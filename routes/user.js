const express = require ("express");
const router= express.Router();
const UserController = require("../controllers/user");

//Definir rutas

router.get("/prueba_usuario", UserController.prueba_user);

//Exportar  Router
module.exports = router;