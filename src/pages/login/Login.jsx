import React, { useState, useContext, useEffect } from 'react';
import { ContextLogin } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginApi, isTokenValido } = useContext(ContextLogin); // Função de login do contexto
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginApi({ email, senha });
  };

  useEffect(() => {
    if (isTokenValido) {
      navigate('/'); // Redireciona para a página principal após o login
    }
  }, [isTokenValido, navigate]); // O useEffect vai disparar sempre que isTokenValido mudar

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Por favor, identifique-se</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Fazer login</button>
      </form>
    </main>
  );
};

export default Login;
