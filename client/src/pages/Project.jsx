import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import { useParams, Link } from "react-router-dom";
import ModalForm from "../components/ModalForm";

const Project = ({ id }) => {
  const params = useParams();

  const { obterProject, project, loading, handleModalTask } = useProjects();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    obterProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Carregando...";

  return (
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
      <ModalForm modal={modal} setModal={setModal} />
    </>
  );
};

export default Project;
