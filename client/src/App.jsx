import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import {
  Login,
  Register,
  ConfirmAccount,
  NewPassword,
  RecoverPassword,
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
