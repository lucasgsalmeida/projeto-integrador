import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import Projetos from './pages/Projetos/Projetos';
import Tarefas from './pages/Tarefas/Tarefas';
import Biblioteca from './pages/Biblioteca';
import './App.css';
import NovoProjeto from './pages/Projetos/novoprojeto/NovoProjeto';
import NovaTarefa from './pages/Tarefas/novatarefa/NovaTarefa';
import Configuracoes from './pages/cfg/Configuracoes';
import Equipe from './pages/equipe/Equipe';
import Login from './pages/login/Login';
import { ContextLogin } from './context/LoginContext.jsx';

const App = () => {
  const { isTokenValido } = useContext(ContextLogin); // Acesse o valor de isTokenValido

  if (!isTokenValido) {
    return <Login />; // Se o token não for válido, renderize o componente de login
  }

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/projetos/new" element={<NovoProjeto/>} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/tarefas/new" element={<NovaTarefa />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/cfg" element={<Configuracoes/>}/>
            <Route path="/equipe" element={<Equipe/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para home caso a rota não exista */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
