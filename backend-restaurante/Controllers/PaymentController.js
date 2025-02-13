import PaymentModel from "../Models/PaymentModel.js";

export const addPayment = async (req, res) => {
    try {
        await PaymentModel.sync()

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};