import express from 'express';
import {logInUser, registerUser} from "../Controllers/UserController.js";

const router = express.Router();

//Rutas del controlador de Usuarios
router.post('/logIn', logInUser)
router.post('/register', registerUser)

export default router;