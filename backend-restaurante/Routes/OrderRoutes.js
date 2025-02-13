import express from 'express';
import {addOrder} from "../Controllers/OrderController.js";

const router = express.Router();

//Rutas del controlador de Ordenes
router.post('/add', addOrder)

export default router;