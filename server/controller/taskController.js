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
    existProject.tasks.push(storedTask._id);
    await existProject.save();
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

const updatedTask = async (req, res) => {
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

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.property = req.body.property || task.property;
  task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

  try {
    const storedTask = await task.save();
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
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

  try {
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);
    await Promise.allSettled([await project.save(), await task.deleteOne()]);
    res.json({ msg: "Tarefa Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const changeState = async (req, res) => {
  const { id } = req.params;

  const task = await Tasks.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarefa não encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (
    task.project.created.toString() !== req.user._id.toString() &&
    !task.project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Ação invalida");
    return res.status(403).json({ msg: error.message });
  }

  task.state = !task.state;
  task.complet = req.user._id;
  await task.save();

  const taskStored = await Tasks.findById(id)
    .populate("project")
    .populate("complet");

  res.json(taskStored);
};

export { addTask, obterTask, updatedTask, deleteTask, changeState };
