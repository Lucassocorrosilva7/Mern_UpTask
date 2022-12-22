import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import { useParams } from 'react-router-dom'

const PROPERTY = ["low", "medium", "high"];

const ModalForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [property, setProperty] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const { modalFormTask, handleModalTask, showAlert, alert, submitTask } =
    useProjects();

  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, deliveryDate, property].includes("")) {
      showAlert({
        msg: "Todos os campos são obrigatórios",
        error: true,
      });
      return;
    }

    submitTask({ name, description, deliveryDate, property, project: params.id });
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalFormTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Fechar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Criar Tarefa
                  </Dialog.Title>

                  {msg && <Alert alert={alert} />}

                  <form onSubmit={handleSubmit} className="my-10">
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nome Tarefa
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Nome Tarefa"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descrição da Tarefa
                      </label>
                      <textarea
                        id="description"
                        placeholder="Descrição da Tarefa"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="delivery-date"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Data de entrega
                      </label>
                      <input
                        type="date"
                        id="delivery-date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Selecionar Nível
                      </label>
                      <select
                        id="property"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
                      >
                        <option value="">-- Selecionar --</option>
                        {PROPERTY.map((options) => (
                          <option key={options}>{options}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value="Criar Tarefa"
                      className="bg-sky-600 hover:bg-sky-700 transition-colors w-full py-3 rounded uppercase font-bold text-white text-sm cursor-pointer"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalForm;
