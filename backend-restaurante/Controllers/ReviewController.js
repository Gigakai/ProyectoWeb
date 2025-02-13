import ReviewModel from "../Models/ReviewModel.js";


export const addReview = async (req, res) => {
    try {
        await ReviewModel.sync()

    } catch (error) {
        res.status(500).json({success: false, msg: error, errores: []})
    }
};