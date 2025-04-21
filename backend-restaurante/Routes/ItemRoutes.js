import express from 'express';
import {
    addItem,
    filterItems,
    getItem,
    getItems, getItemsMenu, getTopItems,
    updateAvailability,
    updateItem
} from "../Controllers/ItemController.js";


const router = express.Router();

//Rutas del controlador de Articulos
router.post('/add', addItem)
router.patch('/update', updateItem)
router.patch('/updateStatus', updateAvailability)
router.get('/getOne/:idPlatillo', getItem)
router.get('/getAll', getItems)
router.get('/getMenu/:idCategoria', getItemsMenu)
router.get('/getDashboard', getTopItems)
router.post('/filter', filterItems)

export default router;