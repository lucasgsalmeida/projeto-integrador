import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import Projetos from './pages/Projetos/Projetos';
import Tarefas from './pages/Tarefas';
import Biblioteca from './pages/Biblioteca';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
