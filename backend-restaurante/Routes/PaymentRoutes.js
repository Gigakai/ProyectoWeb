import express from 'express';
import {addPayment} from "../Controllers/PaymentController.js";

const router = express.Router();

//Rutas del controlador de Metodos de Pago
router.post('/add', addPayment)

export default router;