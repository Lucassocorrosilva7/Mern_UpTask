import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import { useParams,Link } from "react-router-dom";

const Project = ({ id }) => {
  const params = useParams();

  const { obterProject, project, loading } = useProjects();
  useEffect(() => {
    obterProject(params.id);
  }, []);

  const { name } = project;

  if(loading) return "Carregando..."

  return (
    <div className="flex justify-between items-center ">
      <h1 className="font-black text-4xl">{name}</h1>
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
        <Link className="uppercase font-bold" to={`/projetos/editar/${params.id}`}>Editar</Link>
      </div>
    </div>
  );
};

export default Project;
