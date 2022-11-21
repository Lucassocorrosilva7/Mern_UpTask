import express  from "express";
import { register, authentication, confirm, forgotPassword } from "../controller/userController.js";
const router = express.Router();

// Autenticacao, Registro e confirmacao de usuarios
router.post('/', register);
router.post('/login', authentication);
router.get("/confirm/:token", confirm);
router.post("/forgot-the-password", forgotPassword)

export default router;



