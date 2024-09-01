import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NovoProjeto.css";

const NovoProjeto = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [orcamentoMensal, setOrcamentoMensal] = useState("");
  const [observacao, setObservacao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [responsaveisDepartamentos, setResponsaveisDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/usuario/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        setError('Erro ao buscar usuários');
        console.error(error);
      }
    };

    const fetchDepartamentos = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/departamento/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDepartamentos(response.data);
        setResponsaveisDepartamentos(response.data.map(departamento => ({
          idDepartamento: departamento.id,
          idUsuario: departamento.idUsuario || '' // Assumindo que cada departamento pode ter um usuário por padrão
        })));
      } catch (error) {
        setError('Erro ao buscar departamentos');
        console.error(error);
      }
    };

    fetchUsuarios();
    fetchDepartamentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token; // Extraindo o token do objeto JSON
      await axios.post('http://localhost:8080/projeto/new', {
        nome,
        status,
        prioridade,
        tipoServico,
        rdp: responsaveisDepartamentos,
        dataInicio,
        orcamentoMensal,
        observacao
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNome("");
      setStatus("");
      setPrioridade("");
      setTipoServico("");
      setOrcamentoMensal("");
      setObservacao("");
      setDataInicio("");
      setResponsaveisDepartamentos([]);
      navigate('/projetos'); // Redireciona após a criação
    } catch (error) {
      console.error(error);
      alert('Erro ao criar projeto');
    }
  };

  const handleResponsavelDepartamentoChange = (index, field, value) => {
    const newResponsaveis = [...responsaveisDepartamentos];
    newResponsaveis[index][field] = value;
    setResponsaveisDepartamentos(newResponsaveis);
  };

  return (
    <div className="geralNovoProjetos container mt-5">
      <p className="fs-1">Novo projeto</p>

      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do projeto"
              aria-label="Nome do projeto"
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
              aria-label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o status</option>
              <option value="ATIVO">Ativo</option>
              <option value="PAUSADO">Pausado</option>
              <option value="ENCERRAMENTO">Encerramento</option>
              <option value="ENCERRADO">Encerrado</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              aria-label="Prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              <option value="" disabled>Selecione a prioridade</option>
              <option value="MUITO_ALTO">Muito Alto</option>
              <option value="ALTO">Alto</option>
              <option value="MEDIO">Médio</option>
              <option value="BAIXO">Baixo</option>
              <option value="MUITO_BAIXO">Muito Baixo</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <select
              className="form-select"
              aria-label="Tipo de serviço"
              value={tipoServico}
              onChange={(e) => setTipoServico(e.target.value)}
              required
            >
              <option value="" disabled>Selecione o tipo de serviço</option>
              <option value="TRAFEGO">Tráfego</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="TRAFEGO_SOCIAL_MEDIA">Tráfego & Social Media</option>
              <option value="AUTOMACAO">Automação</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Orçamento mensal"
              aria-label="Orçamento mensal"
              value={orcamentoMensal}
              onChange={(e) => setOrcamentoMensal(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">Data de início</label>
            <div
              className="input-group date-wrapper"
              onClick={() => document.getElementById("startDate").focus()}
            >
              <input
                id="startDate"
                className="form-control"
                type="date"
                aria-label="Data de início"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-12">
            <label htmlFor="notes" className="form-label">Notas:</label>
            <textarea
              className="form-control"
              id="notes"
              aria-label="With textarea"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="row g-3 mb-3">
          {responsaveisDepartamentos.map((rdp, index) => (
            <div key={index} className="row g-3 mb-3">
              <div className="col-md-6">
                <select
                  className="form-select"
                  aria-label="Departamento"
                  value={rdp.idDepartamento}
                  onChange={(e) => handleResponsavelDepartamentoChange(index, 'idDepartamento', e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione o departamento</option>
                  {departamentos.map(departamento => (
                    <option key={departamento.id} value={departamento.id}>
                      {departamento.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  aria-label="Responsável"
                  value={rdp.idUsuario}
                  onChange={(e) => handleResponsavelDepartamentoChange(index, 'idUsuario', e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione o responsável</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Criar Projeto</button>
      </form>
    </div>
  );
};

export default NovoProjeto;

