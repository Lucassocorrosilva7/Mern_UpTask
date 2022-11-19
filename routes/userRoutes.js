import express  from "express";
import { users } from "../controller/userController.js";
const router = express.Router();

router.get('/',users);

export default router;


