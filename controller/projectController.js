import Project from "../model/Project.js";

const obterProjects = async (req, res) => {};

const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.created = req.user._id;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

const obterProject = async (req, res) => {};

const editProject = async (req, res) => {};

const deleteProject = async (req, res) => {};

const addCollaborator = async (req, res) => {};

const deleteCollaborator = async (req, res) => {};

const obterTasks = async (req, res) => {};

export {
  obterProjects,
  newProject,
  obterProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  obterTasks,
};
