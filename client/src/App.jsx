import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RouteProtected from "./layouts/RouteProtected";
import {
  Login,
  Register,
  ConfirmAccount,
  NewPassword,
  RecoverPassword,
  Projects,
  NewProject,
  Project,
  EditProject
} from "./pages";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="recuperar-senha" element={<RecoverPassword />} />
              <Route path="recuperar-senha/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/projetos" element={<RouteProtected />}>
              <Route index element={<Projects />} />
              <Route path="criar-projeto" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="editar/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
