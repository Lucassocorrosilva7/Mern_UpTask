import express from "express";

import {
  obterProjects,
  newProject,
  obterProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  deleteCollaborator,
} from "../controller/projectController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obterProjects).post(checkAuth, newProject);

router
  .route("/:id")
  .get(checkAuth, obterProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.post("/contributors", checkAuth, searchCollaborator);
router.post("/contributors/:id", checkAuth, addCollaborator);
router.post("/delete-contributor/:id", checkAuth, deleteCollaborator);

export default router;
