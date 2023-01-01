import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormContributor = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert, submitContributor } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === ""){
        showAlert({
            msg: 'O E-mail é obrigatório',
            error: true
        })
        return
    }

    submitContributor(email);

  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
        {msg && <Alert alert={alert}/>}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email do Usúario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 transition-colors w-full py-3 rounded uppercase font-bold text-white text-sm cursor-pointer"
        value="Buscar colaborador"
      />
    </form>
  );
};

export default FormContributor;
