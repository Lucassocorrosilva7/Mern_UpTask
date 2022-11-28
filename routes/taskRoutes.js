import express from "express";
import {
  addTask,
  obterTask,
  updatedTask,
  deleteTask,
  changeState,
} from "../controller/taskController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, addTask);

router
  .route("/:id")
  .get(checkAuth, obterTask)
  .put(checkAuth, updatedTask)
  .delete(checkAuth, deleteTask);
  
router.post("/state/:id", checkAuth, changeState);

export default router;
