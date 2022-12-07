import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const proveToken = async () => {
      try {
        await axios.get(
          `http://localhost:4000/api/users/forgot-the-password/${token}`
        );
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    proveToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "Senha deve ter no minímo de 6 caracteres",
        error: true,
      });

      return;
    }
    try {
      const url = `http://localhost:4000/api/users/forgot-the-password/${token}`
      
      const { data } = await axios.post(url, {password} );
      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordModified(true);
      
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
      <h1 className="text-sky-600 font-black text-4xl capitalize text-center">
        Redefina sua senha e não perca acesso ao seus projetos
      </h1>
      {msg ? <Alert alert={alert} /> : null}

      { validToken ? (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded  p-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nova Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nova Senha"
              autoComplete="on"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Criar nova senha"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      ) : null}
        {passwordModified && (
          <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Íniciar Sessão
        </Link>
        )}
    </>
  );
};

export default NewPassword;
