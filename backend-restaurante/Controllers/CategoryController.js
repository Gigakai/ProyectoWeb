import CategoryModel from "../Models/CategoryModel.js";
import validator from "validator";


export const addCategory = async (req, res) => {
    try {
        await CategoryModel.sync()

        const {nombre, descripcion} = req.body;
        const errores = {}

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!descripcion || !validator.isAlpha(descripcion, 'es-ES', {ignore: ' '}) || descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }


        if (Object.keys(errores).length <= 0) {
            const categoriaCreada = await CategoryModel.create({nombre: nombre, descripcion: descripcion})

            return res.status(200).json({
                Categoria: categoriaCreada,
                msg: "Se creo la categoria",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo crear la categoria",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const updateCategory = async (req, res) => {
    try {
        const {idCategoria, nombre, descripcion} = req.body;
        const errores = {}

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!descripcion || !validator.isAlpha(descripcion, 'es-ES', {ignore: ' '}) || descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if (Object.keys(errores).length <= 0) {
            await CategoryModel.update({nombre: nombre, descripcion: descripcion}, {where: {id: idCategoria}})

            const updatedCategory = await CategoryModel.findOne({where: {id: idCategoria}})

            return res.status(200).json({
                Categoria: updatedCategory,
                msg: "Se actualizo la categoria",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo actualizar la categoria",
                success: false
            })
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getCategory = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const categoriaEncontrado = await CategoryModel.findOne({where: {id: idCategoria}})
        const errores = {}

        if(categoriaEncontrado) {
            return res.status(200).json({
                Categoria: categoriaEncontrado,
                msg: "Se encontro la categoria",
                success: true
            })
        }else{
            errores.notFound = "No se encontro la categoria"
            return res.status(400).json({
                errores: errores,
                msg: "No se encontro la categoria",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getCategories = async (req, res) => {
    try {
        const categorias = await CategoryModel.findAll()

        return res.status(200).json({
            Categorias: categorias,
            msg: "Se obtuvieron las Categorias",
            success: true
        })

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}