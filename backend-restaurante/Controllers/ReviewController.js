import ReviewModel from "../Models/ReviewModel.js";
import validator from "validator";
import UserModel from "../Models/UserModel.js";
import '../associations.js'

export const addReview = async (req, res) => {
    try {
        await ReviewModel.sync()

        const {texto, calificacion, idPlatillo, idUsuario} = req.body;
        const errores = {}

        if (!texto || !validator.isAlpha(texto, 'es-ES', {ignore: ' '}) || texto.length < 3) {
            errores.texto = "Error en el texto"
        }

        if (!calificacion || calificacion.length <= 0) {
            errores.calificacion = "Error en la calificacion"
        }

        if (!idPlatillo || idPlatillo.length <= 0) {
            errores.platillo = "Error en la platillo"
        }

        if (!idUsuario || idUsuario.length <= 0) {
            errores.usuario = "Error en la usuario"
        }

        if (Object.keys(errores).length <= 0) {
            const reviewCreada = await ReviewModel.create({texto: texto, calificacion: calificacion, idPlatillo: idPlatillo, idUsuario: idUsuario})

            return res.status(200).json({
                Comentario: reviewCreada,
                msg: "Se creo el comentario",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo crear el comentario",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const getReviewsByProduct = async (req, res) => {
    try {
        const { idPlatillo } = req.params;

        const reviews = await ReviewModel.findAll({where: {idPlatillo: idPlatillo}, include: [{
                model: UserModel,
                attributes: ['nombre', 'avatar']
            }]})

        return res.status(200).json({
            Comentarios: reviews,
            msg: "Se obtuvieron las comentarios",
            success: true
        })

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}


export const getReviewsByUser = async (req, res) => {
    try {
        const { idPlatillo, idUsuario } = req.params;

        const review = await ReviewModel.findOne({where: {idPlatillo: idPlatillo, idUsuario: idUsuario}, include: [{
                model: UserModel,
                attributes: ['nombre', 'avatar']
            }]})

        return res.status(200).json({
            Comentario: review,
            msg: "Se obtuvieron las comentarios",
            success: true
        })

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}