import Project from "../models/Project.js";
import User from "../models/User.js";

const obterProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ collaborators: { $in: req.user } }, { created: { $in: req.user } }],
  }).select("-tasks");
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
    const project = await Project.findById(id.trim())
      .populate({ path: "tasks", populate: { path: "complet", select: "name" } })
      .populate("collaborators", "name email");

    if (!project) {
      const error = new Error("Projeto não existe");
      return res.status(404).json({ msg: error.message });
    }

    if (
      project.created.toString() !== req.user._id.toString() &&
      !project.collaborators.some(
        (collaborator) =>
          collaborator._id.toString() === req.user._id.toString()
      )
    ) {
      const error = new Error("Ação invalida");
      return res.status(401).json({ msg: error.message });
    }

    res.json(project);
  } else {
    const error = new Error("Projeto não encontrado");
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
    const error = new Error("Projeto não encontrado");
    return res.status(404).json({ msg: error.message });
  }
};

const searchCollaborator = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirm -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("Usúario não encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(user);
};

const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("Projeto não encontrado");
    res.status(404).json({ msg: error.message });
  }

  if (project.created.toString() !== req.user._id.toString()) {
    const error = new Error("Ação invalida");
    res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirm -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("Usúario não encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.created.toString() === user._id.toString()) {
    const error = new Error("O criador do projeto não pode ser colaborador");
    return res.status(404).json({ msg: error.message });
  }

  if (project.collaborators.includes(user._id)) {
    const error = new Error("Esse usuário já pertence a um projeto");
    return res.status(404).json({ msg: error.message });
  }

  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: "Colaborador adicionado" });
};

const deleteCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("Projeto não encontrado");
    res.status(404).json({ msg: error.message });
  }

  if (project.created.toString() !== req.user._id.toString()) {
    const error = new Error("Ação invalida");
    res.status(404).json({ msg: error.message });
  }

  project.collaborators.pull(req.body.id);
  await project.save();
  res.json({ msg: "Colaborador eliminado com sucesso" });
};

export {
  obterProjects,
  newProject,
  obterProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  deleteCollaborator,
};
