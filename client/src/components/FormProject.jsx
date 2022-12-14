import { useState, useEffect } from "react";
import clientAxios from "../config/clientAxios";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");

  const { showAlert, alert, submitProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deliveryDate, client].includes("")) {

      showAlert({
        msg: "Todos os campos são obrigatorios",
        error: true,
      });
      return;
    }

    await submitProject({name,description,deliveryDate,client,});
    setName('')
    setDescription('')
    setDeliveryDate('')
    setClient('')

  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nome Projeto
        </label>
        <input
          id="name"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nome do projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descrição
        </label>
        <textarea
          id="description"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descrição do Projeto"
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
          id="delivery-date"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nome Cliente
        </label>
        <input
          id="client"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nome do cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Criar Projeto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
