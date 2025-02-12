import validator from "validator";
import UserModel from "../Models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        await UserModel.sync()
        const {email, password, fechaNacimiento, avatar, telefono, nombre, username, tipo} = req.body;

        const errores = {}

        if(!email || !validator.isEmail(email)) {
            errores.email = "Error en el email"
        }else{
            const isDuplicate = await UserModel.findOne({where: {email: email}})

            if(isDuplicate) {
                errores.duplicado = "Email Duplicado"
            }
        }

        if(!password || !validator.isStrongPassword(password)) {
            errores.password = "Error en la contraseña"
        }

        if(!fechaNacimiento || !validator.isDate(fechaNacimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Nacimiento"
        }

        if(!telefono || !validator.isMobilePhone(telefono ,'es-MX')) {
            errores.telefono = "Error en el Telefono"
        }

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', { ignore: ' ' }) || nombre.length < 3){
            errores.nombre= "Error en el Nombre"
        }

        if (!username || !validator.isAlpha(username, 'es-ES', { ignore: ' ' }) || username.length < 3){
            errores.username = "Error en el nombre de usuario"
        }

        if(!avatar || !validator.isURL(avatar)){
            errores.avatar = "Error en la avatar"
        }


        if(Object.keys(errores) <= 0){
            const usuarioCreado = await UserModel.create({nombre: nombre, username: username, email: email, rol: tipo, password: password, fechaNacimiento: fechaNacimiento, avatar: avatar, telefono: telefono})
            return res.status(200).json({Usuario: usuarioCreado, msg: "Se registro el usuario correctamente", success: true})
        }else{
            return res.status(400).json({errores: errores, msg: "Errores en la informacion ingresada", success: false})
        }

    } catch (error) {
        res.status(500).json({success: false, msg: "Error fatal", errores: error})
    }
};

export const logInUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const errores = {}

        if(!email || !password) {
            errores.incompleto = "Falta de informacion"
        }

        if(Object.keys(errores) <= 0){
            const usuarioEncontrado = await UserModel.findOne({where: {email: email}})

            if(usuarioEncontrado) {
                if(usuarioEncontrado.password !== password) {
                    errores.password = "Contraseña Incorrecta"
                }
            }else{
                errores.email = "No existe este Usuario"
            }

            if(Object.keys(errores) <= 0){
                return res.status(200).json({Usuario: usuarioEncontrado, msg: "Se inicio sesión Correctamente", success: true})
            }else{
                return res.status(200).json({errores: errores, msg: "Credenciales Invalidas", success: false})
            }
        }else{
            return res.status(200).json({errores: errores, msg: "Credenciales Invalidas", success: false})
        }



    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

