import express from 'express';
import {
    addPayment,
    deletePayment,
    getPayment,
    getPaymentsByUser,
    updatePayment
} from "../Controllers/PaymentController.js";

const router = express.Router();

//Rutas del controlador de Metodos de Pago
router.post('/add', addPayment)
router.patch('/update', updatePayment)
router.delete('/delete', deletePayment)
router.get('/getOne/:idPayment', getPayment)
router.get('/getAll/:idUsuario', getPaymentsByUser)

export default router;