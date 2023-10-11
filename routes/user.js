const express = require ("express");
const router= express.Router();
const UserController = require("../controllers/user");
const auth = require("../middlewares/auth");
//Definir rutas

router.get("/prueba_usuario", auth.auth, UserController.prueba_user);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile/:id",  auth.auth, UserController.profile);
router.get("/list/:page?",  auth.auth, UserController.list);

//Exportar  Router
module.exports = router;