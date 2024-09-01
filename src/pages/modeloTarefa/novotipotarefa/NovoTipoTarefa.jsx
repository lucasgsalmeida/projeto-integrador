import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NovoTipoTarefa.css";

const NovoTipoTarefa = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsaveis, setResponsaveis] = useState([]);
  const [departamentoOrdem, setDepartamentoOrdem] = useState([{ idDepartamento: "", ordem: 1 }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        // Verifica se já existe a lista de departamentos no localStorage
        const storedDepartamentos = localStorage.getItem('departamentos');
        if (storedDepartamentos) {
          setDepartamentos(JSON.parse(storedDepartamentos));
        } else {
          const tokenData = JSON.parse(localStorage.getItem('token'));
          const token = tokenData.token; // Extraindo o token do objeto JSON
          const response = await axios.get('http://localhost:8080/departamento/get/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const departamentosData = response.data;
          setDepartamentos(departamentosData);
          localStorage.setItem('departamentos', JSON.stringify(departamentosData)); // Salva a lista de departamentos no localStorage
        }
      } catch (error) {
        setError('Erro ao buscar departamentos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchResponsaveis = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/usuario/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setResponsaveis(response.data);
      } catch (error) {
        setError('Erro ao buscar responsáveis');
        console.error(error);
      }
    };

    fetchDepartamentos();
    fetchResponsaveis();
  }, []);

  const handleDepartamentoOrdemChange = (index, e) => {
    const { name, value } = e.target;
    const newDepartamentoOrdem = [...departamentoOrdem];
    newDepartamentoOrdem[index][name] = value;
    setDepartamentoOrdem(newDepartamentoOrdem);
  };

  const addDepartamentoOrdem = () => {
    setDepartamentoOrdem([...departamentoOrdem, { idDepartamento: "", ordem: departamentoOrdem.length + 1 }]);
  };

  const removeDepartamentoOrdem = (index) => {
    const newDepartamentoOrdem = departamentoOrdem.filter((_, i) => i !== index);
    setDepartamentoOrdem(newDepartamentoOrdem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token; // Extraindo o token do objeto JSON
      console.log("Nome:", nome);
      console.log("Descrição:", descricao);
      console.log("Responsável Departamento Projetos:", departamentoOrdem.map(d => ({
        idDepartamento: d.idDepartamento,
        ordem: d.ordem
      })));
      
      await axios.post('http://localhost:8080/modelo/create', {
        nome,
        descricao,
        responsavelDepartamentoProjetos: departamentoOrdem.map(d => ({
          idDepartamento: d.idDepartamento,
          ordem: d.ordem
        }))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNome("");
      setDescricao("");
      setDepartamentoOrdem([{ idDepartamento: "", ordem: 1 }]);
      navigate('/tipo-tarefa'); // Redireciona após a criação
    } catch (error) {
      console.error(error);
      alert('Erro ao criar tipo de tarefa');
    }
  };

  return (
    <div className="geralNovoTipoTarefas container mt-5">
      <p className="fs-1">Novo Tipo de Tarefa</p>

      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do tipo de tarefa"
              aria-label="Nome do tipo de tarefa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Descrição do tipo de tarefa"
              aria-label="Descrição do tipo de tarefa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>

        {departamentoOrdem.map((d, index) => (
          <div key={index} className="row g-3 mb-3">
            <div className="col-md-5">
              <select
                className="form-select"
                aria-label="Departamento"
                name="idDepartamento"
                value={d.idDepartamento}
                onChange={(e) => handleDepartamentoOrdemChange(index, e)}
                required
              >
                <option value="" disabled>
                  Selecione o departamento
                </option>
                {departamentos.map(departamento => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="ordem"
                placeholder="Ordem de prioridade"
                aria-label="Ordem de prioridade"
                value={d.ordem}
                onChange={(e) => handleDepartamentoOrdemChange(index, e)}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-danger" onClick={() => removeDepartamentoOrdem(index)}>
                Remover
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addDepartamentoOrdem}>
          Adicionar Departamento
        </button>
        <br />
        <button type="submit" className="btn btn-primary mt-3">
          Criar Tipo de Tarefa
        </button>
      </form>
    </div>
  );
};

export default NovoTipoTarefa;
