import express  from "express";
import { register } from "../controller/userController.js";
const router = express.Router();

// Autenticacao, Registro e confirmacao de usuarios
router.post('/', register)

export default router;



