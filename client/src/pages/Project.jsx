import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import { useParams, Link } from "react-router-dom";
import ModalForm from "../components/ModalForm";
import ModalDeleteTask from "../components/ModalDeleteTask";
import Task from "../components/Task";
import Alert from "../components/Alert";
import Contributor from "../components/Contributor";
import ModalDeleteContributor from "../components/ModalDeleteContributor";

const Project = () => {
  const params = useParams();

  const { obterProject, project, loading, handleModalTask, alert } =
    useProjects();

  useEffect(() => {
    obterProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Carregando...";

  const { msg } = alert;

  return msg && alert.error ? (
    <Alert alert={alert} />
  ) : (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-black text-2xl md:text-4xl">{name}</h1>
        <div className="flex gap-2 text-gray-400 hover:text-black transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <Link
            className="uppercase font-bold"
            to={`/projetos/editar/${params.id}`}
          >
            Editar
          </Link>
        </div>
      </div>
      <button
        onClick={handleModalTask}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
        font-bold bg-sky-400 hover:bg-sky-500 transition-colors
         text-white text-center mt-5  flex items-center  justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nova Tarefa
      </button>
      <p className="font-bold text-xl mt-10">Tarefas de projetos</p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alert alert={alert} />}
        </div>
      </div>

      <div className="bg-white shawdom mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">Não há tarefas neste projeto.</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl">Colaboradores</p>
        <Link
          className="text-gray-400 hover:text-gray-500 transition-colors uppercase font-bold"
          to={`/projetos/novo-colaborador/${project._id}`}
        >
          Adicionar
        </Link>
      </div>

      <div className="bg-white shawdom mt-10 rounded-lg">
        {project.collaborators?.length ? (
          project.collaborators?.map((contributor) => (
            <Contributor key={contributor._id} contributor={contributor} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            Não há colaboradores neste projeto.
          </p>
        )}
      </div>

      <ModalForm />
      <ModalDeleteTask />
      <ModalDeleteContributor />
    </>
  );
};

export default Project;
