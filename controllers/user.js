//Importar dependencias y modulos
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-pagination");

//Importar modelos
const user = require("../models/user");

//importar servicios
const jwt = require("../helpers/jwt");


//Acciones de prueba
const prueba_user = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado dsde controlador usuario",
        user: req.user
    });
}


//Registro de usuario
const register = (req, res) => {
    //recoger datos de peticion
    let params = req.body;

    //comprobar que llegan + validacion
    if (!params.name || !params.email || !params.password || !params.nick) {
        return res.status(400).json({
            status: "error",
            menssage: "Faltan datos por enviar"
        });
    }

    //Control de usuarios duplicados
    user.find({
            $or: [{
                    email: params.email.toLowerCase()
                },
                {
                    nick: params.nick.toLowerCase()
                }
            ]
        })

        .then(async (users) => {
            if (users.length >= 1) {
                return res.status(200).send({
                    status: "success",
                    message: "El usuario ya existe"
                });
            }

            //cifrar la contraseña
            let pwd = await bcrypt.hash(params.password, 10);
            params.password = pwd;

            //Crear objeto de usuario
            let user_to_save = new user(params);

            //Guardar Usuario en BD       
            try {
                const userStore = await user_to_save.save();

                return res.status(200).json({
                    status: "success",
                    message: "Usuario registrado correctamente",
                    user: userStore
                });


            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: "Error al guardar el usuario"
                });
            }


        }).catch((error) => {
            return res.status(500).send({
                status: "error",
                mensaje: "Error en la consulta de usuarios"
            });
        });
}


//Login de usuario
const login = async (req, res) => {
    // Recoger parámetros del cuerpo (body)
    const params = req.body;

    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // Buscar en la base de datos si existe el usuario
    try {
        const existingUser = await user.findOne({
            email: params.email
        }).select('-password');

        if (!existingUser) {
            return res.status(400).json({
                status: "error",
                message: "No existe el usuario"
            });
        }

        // Comparar la contraseña proporcionada con la contraseña en la base de datos usando bcrypt
        /*const isPasswordValid = bcrypt.compareSync(params.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({
                status: "error",
                message: "No te has identificado correctamente"
            });
        }*/

        // Generar un token JWT
        const token = jwt.createToken(existingUser);

        // Devolver datos del usuario y el token
        return res.status(200).json({
            status: "success",
            message: "Te has identificado correctamente",
            user: existingUser,
            token: token
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda del usuario",
            error: error.message
        });
    }
}


const profile = async (req, res) => {
    try {
        // Recibir el parámetro del id de usuario desde la URL
        const id = req.params.id;

        // Consulta para obtener los datos del usuario
        const userProfile = await user.findById(id).select({password: 0, role: 0});;

        if (!userProfile) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no existe"
            });
        }

        // Devolver el resultado
        // Más adelante: devolver información de seguidores (follow)
        return res.status(200).send({
            status: "Success",
            user: userProfile
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Ha ocurrido un error en el servidor"
        });
    }
}




const list = async function (req, res) {
    let page = 1;
    if (req.params.page) {
        page = parseInt(req.params.page);
    }

    const itemsPerPage = 5;

    try {
        const users = await user.find()
            .sort({ _id: 1 })
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        const total = await user.countDocuments();

        return res.status(200).send({
            status: "Success",
            page,
            itemsPerPage,
            total,
            users,
            pages: Math.ceil(total / itemsPerPage)
        });
        
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "No se pudieron obtener los usuarios",
            error: error.message
        });
    }
}


//Exportar acciones
module.exports = {
    prueba_user,
    register,
    login,
    profile,
    list
}