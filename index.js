//Importar dependencias
const conectar = require("./database/conexion");
const express = require("express");
const cors = require("cors");
const { route } = require("./routes/user");

//Mnsaje de bienvenida
console.log("API NODE PARA REDSOCIAL ARRANCADA");

//Conexion BD
conectar();

//Crear Servidor Node
const app = express();
const puerto = 3900;

//Configurar Node
app.use(cors());

//convertir los datos del body  objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Cargar conf rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FolloeRoutes = require("./routes/follow");

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FolloeRoutes);


//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json({
        "id": 1,
        "nombre": "xilena",
        "web": "xilenaweb"
    })
})


//Poner servidor a escuchr peticiones http

app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
})