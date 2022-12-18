import React from "react";
import { Link } from "react-router-dom";

const PreviewProject = ({ project }) => {
  const { name, _id, client } = project;
  return (
    <div className="border-b p-5 flex items-center">
      <p className="flex-1">{name} - 
        <span className="text-sky-500 capitalize">{''} {client}</span>
      </p>
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
