import express from 'express';
import {addCategory, getCategories, getCategory, updateCategory} from "../Controllers/CategoryController.js";

const router = express.Router();

//Rutas del controlador de Categorias
router.post('/add', addCategory)
router.patch('/update', updateCategory)
router.get('/getCategory/:idCategoria', getCategory)
router.get('/getCategories', getCategories)

export default router;