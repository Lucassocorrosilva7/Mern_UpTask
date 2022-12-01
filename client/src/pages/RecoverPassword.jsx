import {Link} from "react-router-dom"

const RecoverPassword = () => {
  return (
     <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Recuperar senha
      </h1>
      <form className="my-10 bg-white shadow rounded  p-10">
     
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
  )
}

export default RecoverPassword