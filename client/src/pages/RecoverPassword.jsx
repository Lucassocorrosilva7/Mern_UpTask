import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === ''){
      <Alert/>
    }
    
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Recuperar senha
      </h1>
      <form className="my-10 bg-white shadow rounded  p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar Instruções"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Já possui uma conta? Íniciar Sessão
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          Não tem uma conta? Registre-se
        </Link>
      </nav>
    </>
  );
};

export default RecoverPassword;
