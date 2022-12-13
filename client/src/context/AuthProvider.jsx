import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, SetLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const authenticationUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        SetLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios("/users/perfil", config);
        setAuth(data);
        navigate('/projetos');
      } catch (error) {
        setAuth({});
      }

      SetLoading(false);
    };
    authenticationUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
