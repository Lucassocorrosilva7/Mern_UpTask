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

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const project = await Project.findById(id.trim());

    if (!project) {
      const error = new Error("Projeto não existe");
      return res.status(404).json({ msg: error.message });
    }

    if (project.created.toString() !== req.user._id.toString()) {
      const error = new Error("Ação invalida");
      return res.status(401).json({ msg: error.message });
    }

    res.json(project);
  } else {
    const error = new Error("Id inválido");
    return res.status(404).json({ msg: error.message });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const project = await Project.findById(id.trim());

    if (!project) {
      const error = new Error("Projeto não existe");
      return res.status(404).json({ msg: error.message });
    }

    if (project.created.toString() !== req.user._id.toString()) {
      const error = new Error("Ação invalida");
      return res.status(401).json({ msg: error.message });
    }
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
    project.client = req.body.client || project.client;

    try {
      const projectSave = await project.save();
      res.json(projectSave);
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const project = await Project.findById(id.trim());

    if (!project) {
      const error = new Error("Projeto não existe");
      return res.status(404).json({ msg: error.message });
    }

    if (project.created.toString() !== req.user._id.toString()) {
      const error = new Error("Ação invalida");
      return res.status(401).json({ msg: error.message });
    }
    try {
      await project.deleteOne();
      res.json({ msg: "Projeto Eliminado" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Id inválido");
    return res.status(404).json({ msg: error.message });
  }
};

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
