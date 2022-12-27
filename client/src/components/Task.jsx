import { format } from "../helpers/Format";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {

  const { handleModalEditTask } = useProjects();

  const { description, name, property, deliveryDate, state, _id } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-xl">{format(deliveryDate)}</p>
        <p className="mb-1 text-gray-600">Propriedade: {property}</p>
      </div>

      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditTask(task)}
        >
          Editar
        </button>
        {state ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Task;
