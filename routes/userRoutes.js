import express  from "express";
import { register, authentication } from "../controller/userController.js";
const router = express.Router();

// Autenticacao, Registro e confirmacao de usuarios
router.post('/', register);
router.post('/login', authentication);

export default router;



