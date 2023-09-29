const express = require ("express");
const router= express.Router();
const FollowController = require("../controllers/follow");

//Definir rutas

router.get("/prueba_follow", FollowController.prueba_follow);

//Exportar  Router
module.exports = router;