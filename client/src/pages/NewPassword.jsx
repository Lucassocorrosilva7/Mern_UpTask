import React from 'react'

const NewPassword = () => {
  return (
      <>
      <h1 className="text-sky-600 font-black text-4xl capitalize text-center">
        Redefina sua senha e não perca acesso ao seus projetos
      </h1>
      <form className="my-10 bg-white shadow rounded  p-10">
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Criar nova senha"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword