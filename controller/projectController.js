import Project from "../model/Project.js";

const obterProjects = async (req, res) => {
  const projects = await Project.find().where("created").equals(req.user);
  res.json(projects);
};

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

const obterProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Não encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.created.toString() !== req.user._id.toString()) {
    const error = new Error("Ação invalida");
    return res.status(404).json({ msg: error.message });
  }

  res.json(project);
};

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
