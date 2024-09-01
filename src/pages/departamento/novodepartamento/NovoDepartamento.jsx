import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NovoDepartamento.css";

const NovoDepartamento = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Verifica se já existe a lista de usuários no localStorage
        const storedUsuarios = localStorage.getItem('usuarios');
        if (storedUsuarios) {
          setUsuarios(JSON.parse(storedUsuarios));
        } else {
          const tokenData = JSON.parse(localStorage.getItem('token'));
          const token = tokenData.token; // Extraindo o token do objeto JSON
          const response = await axios.get('http://localhost:8080/usuario/get/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const usuariosData = response.data;
          setUsuarios(usuariosData);
          localStorage.setItem('usuarios', JSON.stringify(usuariosData)); // Salva a lista de usuários no localStorage
        }
      } catch (error) {
        setError('Erro ao buscar usuários');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token; // Extraindo o token do objeto JSON
      await axios.post('http://localhost:8080/departamento/new', {
        nome,
        idUsuario
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNome("");
      setIdUsuario("");
      navigate('/departamentos'); // Redireciona após a criação
    } catch (error) {
      console.error(error);
      alert('Erro ao criar departamento');
    }
  };

  return (
    <div className="geralNovoDepartamentos container mt-5">
      <p className="fs-1">Novo departamento</p>

      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do departamento"
              aria-label="Nome do departamento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <select
              className="form-select"
              aria-label="Usuário responsável"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione o usuário responsável
              </option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Criar Departamento
        </button>
      </form>
    </div>
  );
};

export default NovoDepartamento;
