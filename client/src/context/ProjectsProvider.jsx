import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [contributor, setContributor] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteContributor, setModalDeleteContributor] = useState(false);
  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obterProjct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    obterProjct();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const projectsUpdate = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(projectsUpdate);

      setAlert({
        msg: "Projeto Atualizado",
        error: false,
      });

      setTimeout(() => {
        navigate("/projetos");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: "Projeto criado corretamente",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projetos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obterProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      navigate("/projetos");
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`/projects/${id}`, config);
      const projectUpdate = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectUpdate);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projetos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await toEditTask(task);
    } else {
      await createdTask(task);
    }
  };

  const createdTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/tasks", task, config);

      setAlert({});
      setModalFormTask(false);

      socket.emit("new task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const toEditTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      setAlert({});
      setModalFormTask(false);

      socket.emit("atualizar tarefa", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });

      setModalDeleteTask(false);

      socket.emit("Deletar tarefa", task);

      setTask({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalDelete = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const submitContributor = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        "/projects/contributors",
        { email },
        config
      );
      setContributor(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addContributor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/contributors/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setContributor({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalDeleteContributor = (contributor) => {
    setModalDeleteContributor(!modalDeleteContributor);
    setContributor(contributor);
  };

  const deleteContributor = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/delete-contributor/${project._id}`,
        { id: contributor._id },
        config
      );

      const projectUpdate = { ...project };

      projectUpdate.collaborators = projectUpdate.collaborators.filter(
        (contributorState) => contributorState._id !== contributor._id
      );

      setProject(projectUpdate);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setContributor({});

      setTimeout(() => {
        setAlert({});
      }, 3000);

      setModalDeleteContributor(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);

      socket.emit("mudar estado", data);

      setTask({});
      setAlert({});
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const submitTaskProject = (task) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = [...project.tasks, task];
    setProject(projectUpdate);
  };

  const deleteTaskProject = (task) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = projectUpdate.tasks.filter(
      (taskState) => taskState._id !== task._id
    );
    setProject(projectUpdate);
  };

  const updateTaskProject = (task) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = projectUpdate.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdate);
  };

  const changeTaskState = (task) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = projectUpdate.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdate);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        obterProject,
        project,
        loading,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDelete,
        deleteTask,
        submitContributor,
        contributor,
        addContributor,
        handleModalDeleteContributor,
        modalDeleteContributor,
        deleteContributor,
        completeTask,
        search,
        handleSearch,
        submitTaskProject,
        deleteTaskProject,
        updateTaskProject,
        changeTaskState,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
