import express from 'express';
import {addReview, getReviewsByProduct} from "../Controllers/ReviewController.js";

const router = express.Router();

//Rutas del controlador de Comentarios
router.post('/add', addReview)
router.get('/getByItem/:idPlatillo', getReviewsByProduct)

export default router;