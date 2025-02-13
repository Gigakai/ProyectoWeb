import express from 'express';
import {addCategory} from "../Controllers/CategoryController.js";

const router = express.Router();

//Rutas del controlador de Categorias
router.post('/add', addCategory)

export default router;