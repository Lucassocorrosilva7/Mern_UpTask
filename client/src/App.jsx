import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";


  function App(){
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>} />
                <Route path="registrar" element={<Register/>} />
                <Route path="recuperar-senha" element={<RecoverPassword/>} />
                <Route path="recuperar-senha/:token" element={<NewPassword/>} />
                <Route path="confirmar/:id" element={<ConfirmAccount/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    )
  }


export default App;
