import CategoryModel from "../Models/CategoryModel.js";


export const addCategory = async (req, res) => {
    try {
        await CategoryModel.sync()

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};