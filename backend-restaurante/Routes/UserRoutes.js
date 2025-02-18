import express from 'express';
import {getUserByEmail, getUsers, logInUser, registerUser, updateUser} from "../Controllers/UserController.js";

const router = express.Router();

//Rutas del controlador de Usuarios
router.post('/logIn', logInUser)
router.post('/register', registerUser)
router.patch('/update', updateUser)
router.get('/getAllUsers', getUsers)
router.get('/getByEmail/:email', getUserByEmail)

export default router;