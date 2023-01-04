import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, SetLoading] = useState(true);


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
      } catch (error) {
        setAuth({});
      }

      SetLoading(false);
    };
    authenticationUser();
  }, []);

  const logoutAuth = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logoutAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
