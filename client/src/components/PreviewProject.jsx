import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();

  const { name, _id, client, created } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row items-center justify-between">
     <div className="flex items-center gap-2">
       <p className="flex-1">
        {name} -
        <span className="text-sky-500 capitalize">
          {""} {client}
        </span>
      </p>
      {auth._id !== created && <p className="p-1.5 text-xs rounded text-gray-900 bg-green-400 font-bold uppercase">Colaborador</p>}
     </div>
      <Link
        className="bg-sky-600 hover:bg-sky-700 transition-colors p-3 rounded-sm text-white  uppercase text-sm font-bold"
        to={`${_id}`}
      >
        Ver Projeto
      </Link>
    </div>
  );
};

export default PreviewProject;
