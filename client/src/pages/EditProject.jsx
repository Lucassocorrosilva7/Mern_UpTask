import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import FormProject from "../components/FormProject";

const EditProject = () => {
  const params = useParams();

  const { obterProject, project, loading } = useProjects();
  useEffect(() => {
    obterProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Carregando...";

  return (
    <>
      <h1 className="font-black text-4xl">Editar: {name}</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default EditProject;
