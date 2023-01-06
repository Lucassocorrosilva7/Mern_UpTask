import React from "react";
import Search from "./Search";
import useProjects from "../hooks/useProjects";

const Header = () => {
  const { handleSearch } = useProjects();
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between ">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <div className="flex justify-center">
          <button
            type="button"
            className="font-bold uppercase flex gap-2 items-center"
            onClick={handleSearch}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            Buscar Projeto
          </button>
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Header;
