import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlert({
        msg: "E-mail é obrigátorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-the-password`,
        { email }
      );

      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Recuperar senha
      </h1>
      {msg ? <Alert alert={alert} /> : null}
      <form
        className="my-10 bg-white shadow rounded  p-10"
        onSubmit={handleSubmit}
      >
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
            autoComplete="on"
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
