import React, { useState, useContext } from "react";
import { ContextLogin } from "../../context/LoginContext.jsx";
import LogoBranca from './../../imgs/logo-branca.png';

const Login = () => {
  const { loginApi } = useContext(ContextLogin); // Acesse a função de login do contexto
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      await loginApi({ email, senha }); // Chama a função de login do contexto
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src={LogoBranca}
          alt=""
          width={72}
          height={57}
        />
        <h1 className="h3 mb-3 fw-normal">Por favor, identifique-se</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
          />
          <label htmlFor="floatingInput">Usuário</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Fazer Login
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2024</p>
      </form>
    </main>
  );
};

export default Login;
