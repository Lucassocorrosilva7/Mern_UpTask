import Project from "../models/Project.js";
import Tasks from "../models/Tasks.js";

const addTask = async (req, res) => {
  const { project } = req.body;

  const existProject = await Project.findById(project);

  if (!existProject) {
    const error = new Error("Projeto não existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existProject.created.toString() !== req.user._id.toString()) {
    const error = new Error("Não temos permissões para acessar essa tarefa");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const storedTask = await Tasks.create(req.body);
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }

  console.log(existProject);
};

const obterTask = async (req, res) => {
  const { id } = req.params;

  const task = await Tasks.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarefa não encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.created.toString() !== req.user._id.toString()) {
    const error = new Error("Ação invalida");
    return res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

const updatedTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const changeState = async (req, res) => {};

export { addTask, obterTask, updatedTask, deleteTask, changeState };
