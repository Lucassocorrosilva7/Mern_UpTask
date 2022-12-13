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
  NewProject
} from "./pages";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
