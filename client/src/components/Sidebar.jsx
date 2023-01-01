import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  const { name } = auth;
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-sky-200">
      <p className="md:text-base lg:text-xl font-bold">Olá: {name}</p>
      <Link
        to="criar-projeto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Novo Projeto
      </Link>
    </aside>
  );
};

export default Sidebar;
