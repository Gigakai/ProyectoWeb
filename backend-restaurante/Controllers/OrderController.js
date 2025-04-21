import OrderModel from "../Models/OrderModel.js";
import ItemOrderModel from "../Models/ItemOrderModel.js";
import ItemModel from "../Models/ItemModel.js";
import '../associations.js'
import PaymentModel from "../Models/PaymentModel.js";

export const addOrder = async (req, res) => {
    try {
        await OrderModel.sync()
        await ItemOrderModel.sync()

        const { idUsuario, direccion, platillos } = req.body
        const errores = {}

        if (!idUsuario || idUsuario.length <= 0) {
            errores.usuario = "Error en el usuario"
        }

        if (!platillos || platillos.length <= 0) {
            errores.platillos = "Error en los platillos"
        }

        const regexAddress = /^[A-Za-z0-9\s]+,\s*\d{1,5},\s*[A-Za-z\s]+,\s*[A-Za-z\s]+,\s*[A-Za-z\s]+$/

        if(!regexAddress.test(direccion)){
            errores.direccion = "Error en la direccion"
        }

        if (Object.keys(errores).length <= 0) {
            const orderCreado = await OrderModel.create({
                estatus: "A",
                idUsuario: idUsuario,
                direccion: direccion
            })

            for (const platillo of platillos) {
                await ItemOrderModel.create({idPedido: orderCreado.id, idPlatillo: platillo.id, cantidad: platillo.cantidad, precioUnitario: platillo.precio})
            }

            return res.status(200).json({
                Orden: orderCreado,
                msg: "Se creo la orden",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo crear la orden",
                success: false
            })
        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

export const getOrder = async (req, res) => {
    try {
        const {idOrden} = req.params

        const order = await OrderModel.findOne({where: {id: idOrden},  include: [{
                model: ItemOrderModel,
                include: [{
                    model: ItemModel,
                    attributes: ['nombre'],
                }],
                attributes: ['cantidad', 'precioUnitario'],
            }],})

        if(order){
            return res.status(200).json({
                Orden: order,
                msg: "Se obtuvo la orden",
                success: true
            })
        }else{
            return res.status(200).json({
                errores: [],
                msg: "No se encontro la orden",
                success: true
            })
        }

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}

export const getOrdersByUser = async (req, res) => {
    try {
        const { idUsuario } = req.params;

        const orders = await OrderModel.findAll({
            where: { idUsuario },
            include: [
                {
                    model: ItemOrderModel,
                    include: [
                        {
                            model: ItemModel,
                            attributes: ['nombre'],
                        }
                    ],
                    attributes: ['cantidad', 'precioUnitario'],
                },
                {
                    model: PaymentModel,
                    attributes: ['nombre', 'tipo', 'ultimosDigitos', 'fechaVencimiento'],
                }
            ],
        });

        return res.status(200).json({
            Ordenes: orders,
            msg: "Se obtuvieron las Ordenes",
            success: true
        });

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message, errores: [] });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { idOrden, estatus } = req.body
        const errores = {}

        if (!idOrden || idOrden.length <= 0) {
            errores.orden = "Error en la orden"
        }

        if (Object.keys(errores).length <= 0) {
            await OrderModel.update({ estatus: estatus }, {where: {id: idOrden}})

            const updatedOrden = await OrderModel.findOne({where: {id: idOrden}})


            return res.status(200).json({
                Orden: updatedOrden,
                msg: "Se actualizo la orden",
                success: true
            })
        } else {
            return res.status(400).json({
                errores: errores,
                msg: "No se pudo actualizar la orden",
                success: false
            })
        }

    }catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
}