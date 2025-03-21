import express from 'express';
import {addOrder, getOrder, getOrdersByUser, updateStatus} from "../Controllers/OrderController.js";

const router = express.Router();

//Rutas del controlador de Ordenes
router.post('/add', addOrder)
router.patch('/updateStatus', updateStatus)
router.get('/getOrder/:idOrden', getOrder)
router.get('/getOrders/:idUsuario', getOrdersByUser)

export default router;