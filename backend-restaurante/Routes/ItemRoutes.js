import express from 'express';
import {addItem} from "../Controllers/ItemController.js";


const router = express.Router();

//Rutas del controlador de Articulos
router.post('/add', addItem)

export default router;