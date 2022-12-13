import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider value={{}}>{children}</ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
