import ItemModel from "../Models/ItemModel.js";
import ItemCategoryModel from "../Models/ItemCategoryModel.js";
import validator from "validator";
import {Op} from "sequelize";
import '../associations.js'
import CategoryModel from "../Models/CategoryModel.js";

export const addItem = async (req, res) => {
    try {
        await ItemModel.sync()
        await ItemCategoryModel.sync()

        const {nombre, descripcion, precio, imagen, categorias} = req.body
        const errores = {}

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!descripcion || !validator.isAlpha(descripcion, 'es-ES', {ignore: ' '}) || descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if (!imagen || !validator.isURL(imagen)) {
            errores.imagen = "Error en la imagen"
        }

        const options = {
            allow_negatives: false,
            require_decimal: false
        };

        if (!precio || !validator.isCurrency(precio, options)) {
            errores.precio = "Error en la precio"
        }

        if (!categorias || categorias.length <= 0) {
            errores.categoria = "Error en las categorias"
        }

        if (Object.keys(errores).length <= 0) {
            const itemCreado = await ItemModel.create({
                estatus: "A",
                imagen: imagen,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion
            })

            for (const categoria of categorias) {
                await ItemCategoryModel.create({idPlatillo: itemCreado.id, idCategoria: categoria})
            }

            return res.status(200).json({
                Platillo: itemCreado,
                msg: "Se creo el Platillo",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo crear el Platillo",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const updateItem = async (req, res) => {
    try {
        const {nombre, descripcion, precio, imagen, categorias, idPlatillo} = req.body
        const errores = {}

        if (!nombre || !validator.isAlpha(nombre, 'es-ES', {ignore: ' '}) || nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!descripcion || !validator.isAlpha(descripcion, 'es-ES', {ignore: ' '}) || descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if (!imagen || !validator.isURL(imagen)) {
            errores.avatar = "Error en la avatar"
        }

        const options = {
            allow_negatives: false,
            require_decimal: false
        };

        if (!precio || !validator.isCurrency(precio, options)) {
            errores.precio = "Error en la precio"
        }

        if (Object.keys(errores).length <= 0) {
            await ItemModel.update({
                imagen: imagen,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion
            }, {where: {id: idPlatillo}})
            const updatedItem = await ItemModel.findOne({where: {id: idPlatillo}})

            await ItemCategoryModel.destroy({where: {idPlatillo: idPlatillo}})

            for (const categoria of categorias) {
                await ItemCategoryModel.create({idPlatillo: idPlatillo, idCategoria: categoria})
            }

            return res.status(200).json({
                Platillo: updatedItem,
                msg: "Se actualizo el Platillo",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo actualizar el Platillo",
                success: false
            })
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const {estatus, idPlatillo} = req.body
        const errores = {}

        const updatedItem = await ItemModel.findOne({where: {id: idPlatillo}})

        if (!updatedItem) {
            errores.notFound = "No se encontro el Platillo"
        }

        if (Object.keys(errores).length <= 0) {
            await ItemModel.update({estatus: estatus}, {where: {id: idPlatillo}})
            const modifiedItem = await ItemModel.findOne({where: {id: idPlatillo}})

            return res.status(200).json({
                Platillo: modifiedItem,
                msg: "Se actualizo el estatus",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo actualizar el estatus",
                success: false
            })
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getItem = async (req, res) => {
    try {
        const {idPlatillo} = req.params
        const errores = {}

        const itemEncontrado = await ItemModel.findOne({where:{[Op.and]: [
                    {id: idPlatillo},
                    {estatus: "A"}
                ]} })
        if (itemEncontrado) {
            return res.status(200).json({
                Platillo: itemEncontrado,
                msg: "Se encontro el usuario",
                success: true
            })
        } else {
            errores.notFound = "No se encontro el platillo"
            return res.status(400).json({
                errores: errores,
                msg: "No se encontro el platillo",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getItems = async (req, res) => {
    try {
        const platillos = await ItemModel.findAll({where: {estatus: "A"}})

        return res.status(200).json({
            Platillos: platillos,
            msg: "Se obtuvieron los platillos",
            success: true
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const filterItems = async (req, res) => {
    try {
        const {idCategoria, availability, searchText, minPrice, maxPrice} = req.body;

        if (!idCategoria || idCategoria.length <= 0) {
            const platillos = await ItemModel.findAll({
                where: {
                    [Op.and]: [
                        {precio: {[Op.gte]: minPrice}},
                        {precio: {[Op.lte]: maxPrice}},
                        {nombre: {[Op.like]: `%${searchText}%`}},
                        {estatus: {[Op.eq]: availability}},
                    ]
                }
            })

            return res.status(200).json({
                Platillos: platillos,
                msg: "Se obtuvieron los platillos",
                success: true
            })

        } else {
            const platillos = await ItemModel.findAll({
                where: {
                    [Op.and]: [
                        {precio: {[Op.gte]: minPrice}},
                        {precio: {[Op.lte]: maxPrice}},
                        {nombre: {[Op.like]: `%${searchText}%`}},
                        {estatus: {[Op.eq]: availability}},
                    ]
                },
                include: {
                    model: CategoryModel,
                    where: {id: idCategoria},
                    attributes: [],
                    required: true
                },
            })

            return res.status(200).json({
                Platillos: platillos,
                msg: "Se obtuvieron los platillos",
                success: true
            })

        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}
