import OrderModel from "../Models/OrderModel.js";
import ItemOrderModel from "../Models/ItemOrderModel.js";


export const addOrder = async (req, res) => {
    try {
        await OrderModel.sync()
        await ItemOrderModel.sync()

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};