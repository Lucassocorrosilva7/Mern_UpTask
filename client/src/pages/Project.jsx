import { useEffect } from "react";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";

const Project = ({ id }) => {
  const params = useParams();

  const { obterProject, project, loading } = useProjects();
  useEffect(() => {
    obterProject(params.id);
  }, []);

  const { name } = project;

  return loading ? (
    "Carreganado"
  ) : (
    <div>
      <h1 className="font-black text-4xl">{name}</h1>
    </div>
  );
};

export default Project;
