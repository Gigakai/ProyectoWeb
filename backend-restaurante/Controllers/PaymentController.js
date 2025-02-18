import PaymentModel from "../Models/PaymentModel.js";
import validator from "validator";

export const addPayment = async (req, res) => {
    try {
        await PaymentModel.sync()
        const { nombre, tipo, ultimosDigitos, fechaVencimiento, idUsuario } = req.body;
        const errores = {}

        if(!idUsuario){
            errores.idUsuario = "Error en el usuario"
        }

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!tipo) {
            errores.tipo = "Error en el tipo"
        }

        if (!ultimosDigitos || !validator.isNumeric(ultimosDigitos) || ultimosDigitos.length !== 4) {
            errores.ultimosDigitos = "Error en el tipo"
        }

        if (!fechaVencimiento || !validator.isDate(fechaVencimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Vencimiento"
        }

        if(Object.keys(errores).length <= 0){
            const paymentAdded = await PaymentModel.create({nombre, tipo, ultimosDigitos, fechaVencimiento, idOwner: idUsuario})

            return res.status(200).json({
                metodoPago: paymentAdded,
                msg: "Se registro el metodo de pago",
                success: true
            })
        }else{
            return res.status(400).json({
                errores: errores,
                msg: "No se creo el Metodo de Pago",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { nombre, tipo, ultimosDigitos, fechaVencimiento, idMetodoPago } = req.body;
        const errores = {}



        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!tipo) {
            errores.tipo = "Error en el tipo"
        }

        if (!ultimosDigitos || !validator.isNumeric(ultimosDigitos) || ultimosDigitos.length !== 4) {
            errores.tipo = "Error en el tipo"
        }

        if (!fechaVencimiento || !validator.isDate(fechaVencimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Vencimiento"
        }

        if(Object.keys(errores).length <= 0){
            await PaymentModel.update({nombre, tipo, ultimosDigitos, fechaVencimiento}, {where: {id: idMetodoPago}})

            const paymentUpdated = await PaymentModel.findOne({where: { id: idMetodoPago }})

            return res.status(200).json({
                metodoPago: paymentUpdated,
                msg: "Se actualizo el metodo de pago",
                success: true
            })
        }else{
            return res.status(400).json({
                errores: errores,
                msg: "No actualizo el Metodo de Pago",
                success: false
            })
        }

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const deletePayment = async (req, res) => {
    try {
        const {idPayment} = req.body;
        const errors = {}

        if(!idPayment){
            errors.idPayment = "No se ingreso un Metodo de Pago especifico"
        }

        if(Object.keys(errors).length <= 0){

            await PaymentModel.destroy({where: {id: idPayment}})

            return res.status(200).json({
                msg: "Se elimino el metodo de pago",
                success: true
            })
        }else{
            return res.status(400).json({
                errores: errores,
                msg: "Datos incorrectos para eliminar el metodo de Pago",
                success: false
            })
        }

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getPayment = async (req, res) => {
    try {
        const {idPayment} = req.params;
        const paymentEncontrado = await PaymentModel.findOne({where: {id: idPayment}})
        const errores = {}

        if(paymentEncontrado) {
            return res.status(200).json({
                metodoPago: paymentEncontrado,
                msg: "Se encontro el Metodo de Pago",
                success: true
            })
        }else{
            errores.notFound = "No se encontro el metodo de pago"
            return res.status(400).json({
                errores: errores,
                msg: "No se encontro el metodo de pago",
                success: false
            })
        }

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getPaymentsByUser = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const paymentEncontrados = await PaymentModel.findAll({where: {idOwner: idUsuario}})

        return res.status(200).json({
            metodos: paymentEncontrados,
            msg: "Se obtuvieron los metodos de pago",
            success: true
        })

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}
