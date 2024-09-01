import { createContext, useContext, useState } from "react";
import { ContextUserClient } from "./ContextUsuarioEscritorio";
import axios from 'axios';

const getTokenInfoFromLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item;
};

export const ContextLogin = createContext();

export const ContextLoginProvider = ({ children }) => {
  const [tokenInfo, setTokenInfo] = useState(getTokenInfoFromLocalStorage("token"));

  const isTokenValid = () => {
    if (!tokenInfo) return false;
    const expiration = new Date(tokenInfo.expiration);
    return expiration > new Date();
  };

  const isAuthenticated = () => {
    return isTokenValid() && tokenInfo !== null;
  };

  const { requestContextUserClient } = useContext(ContextUserClient);
  const [isTokenValido, setTokenValido] = useState(isAuthenticated());

  const tokenVerify = async () => {
    try {
      const response = await axios.post("http://localhost:8080/usuario/verify-token", {}, {
        headers: {
          Authorization: `Bearer ${tokenInfo.token}`
        }
      });

      if (response.status === 200) {
        console.log("TOKEN VÁLIDO!");
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 3600 * 1000);
        setTokenInfo({ token: tokenInfo.token, expiration });
        localStorage.setItem("token", JSON.stringify({ token: tokenInfo.token, expiration }));
        requestContextUserClient(tokenInfo.token);
        setTokenValido(true);
      } else {
        console.log("TOKEN INVÁLIDO!");
        localStorage.clear();
        setTokenInfo(null);
        setTokenValido(false);
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      localStorage.clear();
      setTokenInfo(null);
      setTokenValido(false);
    }
  };

  const loginApi = async (dadosLogin) => {
    try {
      const response = await axios.post("http://localhost:8080/usuario/login", {
        usuario: dadosLogin.email,
        senha: dadosLogin.senha,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = response.data;

      if (data.token) {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 3600 * 1000);
        setTokenInfo({ token: data.token, expiration });
        localStorage.setItem("token", JSON.stringify({ token: data.token, expiration }));
        console.log(data.token);
        requestContextUserClient(data.token);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <ContextLogin.Provider value={{
      tokenInfo,
      loginApi,
      setTokenValido,
      isTokenValido,
      tokenVerify,
    }}>
      {children}
    </ContextLogin.Provider>
  );
};
