import ItemModel from "../Models/ItemModel.js";
import ItemCategoryModel from "../Models/ItemCategoryModel.js";


export const addItem = async (req, res) => {
    try {
        await ItemModel.sync()
        await ItemCategoryModel.sync()



    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};

