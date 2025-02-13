import express from 'express';
import {addReview} from "../Controllers/ReviewController.js";

const router = express.Router();

//Rutas del controlador de Comentarios
router.post('/add', addReview)

export default router;