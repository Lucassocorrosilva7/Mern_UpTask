import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

const Sidebar = () => {
  const { logout } = useProjects();
  const { auth, logoutAuth } = useAuth();

  const Handlelogout = () => {
    logoutAuth();
    logout();
    localStorage.removeItem("token");
  };

  const { name } = auth;
  return (
    <aside className="md:w-1/3  xl:w-1/6 px-5 py-10 bg-sky-700">
      <p className="md:text-base p-2 text-white lg:text-xl font-bold">Olá: {name}</p>
      <div className="flex  flex-col justify-items-end ">
     <div>
         <Link
        to="criar-projeto"
        className="flex items-center p-2 text-base font-bold text-white rounded-lg dark:text-white md:hover:bg-sky-400 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <span className="ml-3">Novo Projeto</span>
      </Link>
      <Link
        to="/projetos"
        className="flex items-center p-2 text-base font-bold text-white rounded-lg dark:text-white md:hover:bg-sky-400 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>

        <span className="ml-3">Projetos</span>
      </Link>
     </div>
     <div>
       <button
        type="button"
        className="flex w-full items-center p-2 text-base font-bold text-white rounded-lg dark:text-white md:hover:bg-sky-400 dark:hover:bg-gray-700"
        onClick={Handlelogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <span className="ml-3">Sair</span>
      </button>
     </div>
      </div>
    </aside>
  );
};

export default Sidebar;
