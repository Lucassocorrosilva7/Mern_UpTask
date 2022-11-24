import express from "express";

import {
  obterProjects,
  newProject,
  obterProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  obterTasks,
} from "../controller/projectController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obterProjects).post(checkAuth, newProject);
router
  .route("/:id")
  .get(checkAuth, obterProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.get("/tasks/:id", checkAuth, obterTasks);
router.post("/addCollaborator/:id", checkAuth, addCollaborator);
router.post("/deleteCollaborator/:id", checkAuth, deleteCollaborator);

export default router;
