import validator from "validator";
import UserModel from "../Models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        await UserModel.sync()
        const {email, password, fechaNacimiento, avatar, telefono, nombre, username, tipo} = req.body;

        const errores = {}

        if (!email || !validator.isEmail(email)) {
            errores.email = "Error en el email"
        } else {
            const isDuplicate = await UserModel.findOne({where: {email: email}})

            if (isDuplicate) {
                errores.duplicadoEmail = "Email Duplicado"
            }
        }

        if (!password || !validator.isStrongPassword(password)) {
            errores.password = "Error en la contraseña"
        }

        if (!fechaNacimiento || !validator.isDate(fechaNacimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Nacimiento"
        }

        if (!telefono || !validator.isMobilePhone(telefono, 'es-MX')) {
            errores.telefono = "Error en el Telefono"
        }

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!username || !validator.isAlpha(username, 'es-ES', {ignore: ' '}) || username.length < 3) {
            errores.username = "Error en el nombre de usuario"
        } else {
            const isDuplicateUser = await UserModel.findOne({where: {username: username}})

            if (isDuplicateUser) {
                errores.duplicadoUsername = "Username Duplicado"
            }
        }

        if (!avatar || !validator.isURL(avatar)) {
            errores.avatar = "Error en la avatar"
        }


        if (Object.keys(errores) <= 0) {
            const usuarioCreado = await UserModel.create({
                nombre: nombre,
                username: username,
                email: email,
                rol: tipo,
                password: password,
                fechaNacimiento: fechaNacimiento,
                avatar: avatar,
                telefono: telefono
            })
            return res.status(200).json({
                Usuario: usuarioCreado,
                msg: "Se registro el usuario correctamente",
                success: true
            })
        } else {
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

        if (!email || !password) {
            errores.incompleto = "Falta de informacion"
        }

        if (Object.keys(errores) <= 0) {
            const usuarioEncontrado = await UserModel.findOne({where: {email: email}})

            if (usuarioEncontrado) {
                if (usuarioEncontrado.password !== password) {
                    errores.password = "Contraseña Incorrecta"
                }
            } else {
                errores.email = "No existe este Usuario"
            }

            if (Object.keys(errores) <= 0) {
                return res.status(200).json({
                    Usuario: usuarioEncontrado,
                    msg: "Se inicio sesión Correctamente",
                    success: true
                })
            } else {
                return res.status(400).json({errores: errores, msg: "Credenciales Invalidas", success: false})
            }
        } else {
            return res.status(400).json({errores: errores, msg: "Credenciales Invalidas", success: false})
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const updateUser = async (req, res) => {
    try {
        const {email, nombre, password, fechaNacimiento, avatar, telefono } = req.body;

        const errores = {}

        if (!password || !validator.isStrongPassword(password)) {
            errores.password = "Error en la contraseña"
        }

        if (!fechaNacimiento || !validator.isDate(fechaNacimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Nacimiento"
        }

        if (!telefono || !validator.isMobilePhone(telefono, 'es-MX')) {
            errores.telefono = "Error en el Telefono"
        }

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!avatar || !validator.isURL(avatar)) {
            errores.avatar = "Error en la avatar"
        }

        const usuarioEncontrado = await UserModel.findOne({where: {email: email}})

        if(!usuarioEncontrado) {
            errores.usuario = "No se encontro el usuario"
        }

        if(Object.keys(errores).length <= 0){
            await UserModel.update({telefono: telefono, nombre: nombre, fechaNacimiento: fechaNacimiento, password: password, avatar: avatar},{where: {email: email}})

            const updatedUser = await UserModel.findOne({where: {email: email}})

            return res.status(200).json({
                Usuario: updatedUser,
                msg: "Se inicio sesión Correctamente",
                success: true
            })
        }else{
            return res.status(400).json({
                errores: errores,
                msg: "Se encontraron errores en la informacion ingresada",
                success: false
            })
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()

        return res.status(200).json({
            Usuarios: users,
            msg: "Se obtuvieron los Usuarios",
            success: true
        })

    }catch(error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const usuarioEncontrado = await UserModel.findOne({where: {email: email}})
        const errores = {}

        if(usuarioEncontrado) {
            return res.status(200).json({
                Usuario: usuarioEncontrado,
                msg: "Se encontro el usuario",
                success: true
            })
        }else{
            errores.notFound = "No se encontro el usuario"
            return res.status(400).json({
                errores: errores,
                msg: "No se encontro el usuario",
                success: false
            })
        }
    }catch(error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}