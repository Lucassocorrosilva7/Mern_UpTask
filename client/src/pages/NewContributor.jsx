import { useEffect } from "react";
import FormContributor from "../components/FormContributor";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";

const NewContributor = () => {
  const { obterProject, project, loading, contributor, addContributor, alert } = useProjects();

  const params = useParams();

  useEffect(() => {
    obterProject(params.id);
  }, []);

  if (loading) return "Loading...";

  const { name } = project;

  if(!project?._id) return <Alert alert={alert}/>
  return (
    <>
      <h1 className="text-3xl font-black">
        Adicionar Colaborador(a), Projeto: {name}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormContributor />
      </div>

      {loading ? (
        <p className="text-center">Carregando</p>
      ) : (
        contributor?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:{" "}
              </h2>
              <div className="flex justify-between items-center">
                <p>{contributor.name}</p>
                <button
                  type="button"
                  className="bg-sky-500 hover:bg-sky-600 transition-colors px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => addContributor({
                    email: contributor.email
                  })}
                >
                  Adicionar Projeto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewContributor;
