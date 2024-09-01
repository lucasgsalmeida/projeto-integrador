import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Departamentos from './pages/departamento/Departamento.jsx';
import NovoDepartamento from './pages/departamento/novodepartamento/NovoDepartamento.jsx';
import TipoTarefa from './pages/modeloTarefa/TipoTarefa.jsx';
import ListTipoTarefas from './components/modeloTarefa/ListTipoTarefas.jsx';
import NovoTipoTarefa from './pages/modeloTarefa/novotipotarefa/NovoTipoTarefa.jsx';

const App = () => {
  const { isTokenValido } = useContext(ContextLogin);

  return (
    <div className="app-container">
      {isTokenValido && <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={isTokenValido ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isTokenValido ? <Home /> : <Navigate to="/login" />} />
            <Route path="/projetos" element={isTokenValido ? <Projetos /> : <Navigate to="/login" />} />
            <Route path="/projetos/new" element={isTokenValido ? <NovoProjeto /> : <Navigate to="/login" />} />
            <Route path="/tarefas" element={isTokenValido ? <Tarefas /> : <Navigate to="/login" />} />
            <Route path="/tarefas/new" element={isTokenValido ? <NovaTarefa /> : <Navigate to="/login" />} />
            <Route path="/biblioteca" element={isTokenValido ? <Biblioteca /> : <Navigate to="/login" />} />
            <Route path="/cfg" element={isTokenValido ? <Configuracoes /> : <Navigate to="/login" />} />
            <Route path="/equipe" element={isTokenValido ? <Equipe /> : <Navigate to="/login" />} />
            <Route path="/departamentos" element={isTokenValido ? <Departamentos /> : <Navigate to="/login" />} />
            <Route path="/departamentos/new" element={isTokenValido ? <NovoDepartamento /> : <Navigate to="/login" />} />
            <Route path="/tipo-tarefa" element={isTokenValido ? <TipoTarefa /> : <Navigate to="/login" />} />
            <Route path="/tipo-tarefa/new" element={isTokenValido ? <NovoTipoTarefa /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
      </div>
    </div>
  );
};

export default App;
