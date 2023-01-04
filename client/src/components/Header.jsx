import React from "react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Search from "./Search";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { handleSearch, logout } = useProjects();
  const { logoutAuth } = useAuth();

  const Handlelogout = () => {
    logoutAuth();
    logout();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between ">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="font-bold uppercase" onClick={handleSearch}>Buscar Projeto</button>
          <Link to="/projetos" className="font-bold uppercase">
            Projetos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={Handlelogout}
          >
            Encerrar sessão
          </button>
        </div>
        <Search/>
      </div>
    </header>
  );
};

export default Header;
