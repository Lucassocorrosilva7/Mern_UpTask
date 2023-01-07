import { format } from "../helpers/Format";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDelete, completeTask } = useProjects();
  const admin = useAdmin();

  const {
    description,
    name,
    property,
    deliveryDate,
    state,
    _id,
  } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-xl">{format(deliveryDate)}</p>
        <p className="mb-5 text-gray-600">Propriedade: {property}</p>
        {state && <p className="text-xs bg-green-600 uppercase p-1.5 rounded text-white">Completada por: {task.complet.name}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditTask(task)}
          >
            Editar
          </button>
        )}
        <button
          onClick={() => completeTask(_id)}
          className={`${state ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {state ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalDelete(task)}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
