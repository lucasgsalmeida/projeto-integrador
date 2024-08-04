import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import Projetos from './pages/Projetos/Projetos';
import Tarefas from './pages/Tarefas/Tarefas';
import Biblioteca from './pages/Biblioteca';
import './App.css';
import NovoProjeto from './pages/Projetos/novoprojeto/NovoProjeto';
import NovaTarefa from './pages/Tarefas/novatarefa/NovaTarefa';
import Configuracoes from './pages/cfg/Configuracoes';

const App = () => {
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
