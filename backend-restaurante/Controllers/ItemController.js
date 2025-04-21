import ItemModel from "../Models/ItemModel.js";
import ItemCategoryModel from "../Models/ItemCategoryModel.js";
import validator from "validator";
import {Op} from "sequelize";
import '../associations.js'
import CategoryModel from "../Models/CategoryModel.js";
import ReviewModel from "../Models/ReviewModel.js";
import dbConnection from "../database.js";
import ItemOrderModel from "../Models/ItemOrderModel.js";

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
        const platillos = await ItemModel.findAll({
            where: { estatus: "A" },
            include: [{
                model: CategoryModel,
                through: { attributes: [] },
                attributes: ['id', 'nombre']
            }]
        });


        const platillosConCalificacion = await Promise.all(platillos.map(async (platillo) => {
            const totalComentarios = await ReviewModel.count({ where: { idPlatillo: platillo.id } });
            const totalLikes = await ReviewModel.count({ where: { idPlatillo: platillo.id, calificacion: 'L' } });

            const porcentajeLikes = totalComentarios === 0 ? 0 : (totalLikes / totalComentarios) * 100;

            return {
                ...platillo.toJSON(),
                calificacion: porcentajeLikes.toFixed(2)  // Agrega la calificación como porcentaje
            };
        }));

        return res.status(200).json({
            Platillos: platillosConCalificacion,
            msg: "Se obtuvieron los platillos",
            success: true
        })
    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getItemsMenu = async (req, res) => {
    try {
        const { idCategoria } = req.params;

        const platillos = await ItemModel.findAll({
            where: { estatus: "A" },
            include: [{
                model: CategoryModel,
                where: { id: idCategoria },
                through: { attributes: [] },
                attributes: ['id', 'nombre']
            }]
        });

        const platillosConCalificacion = await Promise.all(platillos.map(async (platillo) => {
            const totalComentarios = await ReviewModel.count({ where: { idPlatillo: platillo.id } });
            const totalLikes = await ReviewModel.count({ where: { idPlatillo: platillo.id, calificacion: 'L' } });

            const porcentajeLikes = totalComentarios === 0 ? 0 : (totalLikes / totalComentarios) * 100;

            return {
                ...platillo.toJSON(),
                calificacion: porcentajeLikes.toFixed(2)
            };
        }));


        return res.status(200).json({
            Platillos: platillosConCalificacion,
            msg: "Se obtuvieron los platillos",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getTopItems = async (req, res) => {
    try {
        // **Más vendidos**
        const topVendidos = await ItemModel.findAll({
            attributes: [
                'id',
                'nombre',
                [dbConnection.fn('COUNT', dbConnection.col('PlatillosPedidos.idPlatillo')), 'cantidadVendida']
            ],
            include: [{
                model: ItemOrderModel,
                attributes: []
            }],
            group: ['id'],
            order: [[dbConnection.sequelize.literal('cantidadVendida'), 'DESC']],
            limit: 3
        });

        // **Más recientes**
        const topRecientes = await ItemModel.findAll({
            order: [['createdAt', 'DESC']],
            limit: 3
        });

        // **Mejor valorados (porcentaje de "Likes")**
        const topValorados = await ItemModel.findAll({
            include: [{
                model: ReviewModel,
                attributes: [
                    [dbConnection.fn('COUNT', dbConnection.col('ReviewModel.id')), 'totalComentarios'],
                    [dbConnection.fn('SUM', dbConnection.literal("CASE WHEN calificacion = 'L' THEN 1 ELSE 0 END")), 'totalLikes']
                ],
                group: ['ReviewModel.idPlatillo'],
            }],
            order: [
                [dbConnection.sequelize.literal('totalLikes / totalComentarios'), 'DESC']
            ],
            limit: 3
        });


        const topValoradosConCalificacion = await Promise.all(topValorados.map(async (platillo) => {
            const totalComentarios = await ReviewModel.count({ where: { idPlatillo: platillo.id } });
            const totalLikes = await ReviewModel.count({ where: { idPlatillo: platillo.id, calificacion: 'L' } });

            const porcentajeLikes = totalComentarios === 0 ? 0 : (totalLikes / totalComentarios) * 100;

            return {
                ...platillo.toJSON(),
                calificacion: porcentajeLikes.toFixed(2)
            };
        }));

        return res.status(200).json({
            topVendidos,
            topRecientes,
            topValorados: topValoradosConCalificacion,
            msg: "Se obtuvieron los platillos destacados",
            success: true
        });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message, errores: [] });
    }
};

export const filterItems = async (req, res) => {
    try {
        const { idCategoria, availability, searchText, minPrice, maxPrice } = req.body;

        const whereConditions = {
            precio: { [Op.between]: [minPrice, maxPrice] },
            nombre: { [Op.like]: `%${searchText}%` },
            estatus: { [Op.eq]: availability }
        };

        const includeConditions = [{
            model: CategoryModel,
            through: { attributes: [] },
            attributes: ['id', 'nombre']
        }];

        if (idCategoria && idCategoria.length > 0) {
            includeConditions[0].where = { id: idCategoria };  // Filtrar por categoría
        }

        const platillos = await ItemModel.findAll({
            where: whereConditions,
            include: includeConditions
        });

        const platillosConCalificacion = await Promise.all(platillos.map(async (platillo) => {
            const totalComentarios = await ReviewModel.count({ where: { idPlatillo: platillo.id } });
            const totalLikes = await ReviewModel.count({ where: { idPlatillo: platillo.id, calificacion: 'L' } });

            const porcentajeLikes = totalComentarios === 0 ? 0 : (totalLikes / totalComentarios) * 100;

            return {
                ...platillo.toJSON(),
                calificacion: porcentajeLikes.toFixed(2)
            };
        }));

        return res.status(200).json({
            Platillos: platillosConCalificacion,
            msg: "Se obtuvieron los platillos",
            success: true
        });

    } catch (error) {
        console.error("Error en filterItems:", error);
        return res.status(500).json({ success: false, msg: "Error del servidor", errores: [] });
    }
};

