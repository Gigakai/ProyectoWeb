import express from 'express';
import {addReview, getReviewsByProduct, getReviewsByUser} from "../Controllers/ReviewController.js";

const router = express.Router();

//Rutas del controlador de Comentarios
router.post('/add', addReview)
router.get('/getByItem/:idPlatillo', getReviewsByProduct)
router.get('/getByUser/:idPlatillo/:idUsuario', getReviewsByUser)

export default router;