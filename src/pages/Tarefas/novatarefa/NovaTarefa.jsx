import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './NovaTarefa.css';

const NovaTarefa = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const [tiposTarefas, setTiposTarefas] = useState([]);
  const [subTarefaList, setSubTarefaList] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [idProjeto, setIdProjeto] = useState("");
  const [idTipoTarefa, setIdTipoTarefa] = useState("");
  const [responsaveis, setResponsaveis] = useState([]);
  const [prioridadeTarefa, setPrioridadeTarefa] = useState("BAIXA");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token;
        const response = await axios.get('http://localhost:8080/projeto/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    const fetchTiposTarefas = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token;
        const response = await axios.get('http://localhost:8080/modelo/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTiposTarefas(response.data);
      } catch (error) {
        console.error('Erro ao buscar tipos de tarefas:', error);
      }
    };

    fetchProjetos();
    fetchTiposTarefas();
  }, []);

  const handleProjetoChange = async (e) => {
    const projetoId = e.target.value;
    setIdProjeto(projetoId);

    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token;
      const response = await axios.get(`http://localhost:8080/projeto/get?id=${projetoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResponsaveis(response.data.responsaveis || []);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    }
  };

  const handleTipoTarefaChange = async (e) => {
    const tipoTarefaId = e.target.value;
    setIdTipoTarefa(tipoTarefaId);

    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token;
      const response = await axios.get(`http://localhost:8080/modelo/get?id=${tipoTarefaId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const tipoTarefa = response.data;
      setDescricao(tipoTarefa.descricao);

      const subTarefas = tipoTarefa.responsavelDepartamentoProjetos?.map(rdp => ({
        idProjeto: idProjeto,
        idUsuario: rdp.idUsuario, // ID do responsável pelo departamento
        nomeResponsavel: '', // Inicialmente vazio, será preenchido depois
        nomeDepartamento: rdp.nomeDepartamento, // Nome do departamento
        statusTarefa: "PARA_FAZER",
        dataInicio: dataInicio,
        dataFim: dataFim
      })) || [];

      setSubTarefaList(subTarefas);

      // Preencher o nome do responsável após definir a lista de sub-tarefas
      const responsaveisMap = responsaveis.reduce((map, resp) => {
        map[resp.id] = resp.nome;
        return map;
      }, {});

      setSubTarefaList(prevList =>
        prevList.map(subTarefa => ({
          ...subTarefa,
          nomeResponsavel: responsaveisMap[subTarefa.idUsuario] || 'Não definido'
        }))
      );
    } catch (error) {
      console.error('Erro ao buscar detalhes do tipo de tarefa:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      const token = tokenData.token;
      await axios.post('http://localhost:8080/tarefa/create', {
        idProjeto,
        id_tipoTarefa: idTipoTarefa,
        subTarefaList,
        prioridadeTarefa,
        dataInicio,
        descricao,
        status: "PARA_FAZER"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/tarefas');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div className="novaTarefa">
      <h1>Criar Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projeto">Projeto</label>
          <select id="projeto" className="form-control" onChange={handleProjetoChange} required>
            <option value="">Selecione um projeto</option>
            {projetos.map(projeto => (
              <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tipoTarefa">Tipo de Tarefa</label>
          <select id="tipoTarefa" className="form-control" onChange={handleTipoTarefaChange} required>
            <option value="">Selecione um tipo de tarefa</option>
            {tiposTarefas.map(tipoTarefa => (
              <option key={tipoTarefa.id} value={tipoTarefa.id}>{tipoTarefa.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" className="form-control" value={descricao} readOnly />
        </div>

        {subTarefaList.length > 0 && subTarefaList.map((subTarefa, index) => (
          <div key={index} className="subTarefa">
            <h4>Subtarefa {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`responsavel_${index}`}>Responsável</label>
              <select
                id={`responsavel_${index}`}
                className="form-control"
                value={subTarefa.idUsuario}
                onChange={(e) => {
                  const newSubTarefaList = [...subTarefaList];
                  newSubTarefaList[index].idUsuario = e.target.value;
                  // Atualiza o nome do responsável na lista de sub-tarefas
                  newSubTarefaList[index].nomeResponsavel = responsaveis.find(resp => resp.id === e.target.value)?.nome || 'Não definido';
                  setSubTarefaList(newSubTarefaList);
                }}
                required
              >
                <option value="">Selecione um responsável</option>
                {responsaveis.map(resp => (
                  <option key={resp.id} value={resp.id}>{resp.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`departamento_${index}`}>Departamento</label>
              <input type="text" id={`departamento_${index}`} className="form-control" value={subTarefa.nomeDepartamento} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor={`dataInicio_${index}`}>Data de Início</label>
              <input type="date" id={`dataInicio_${index}`} className="form-control" value={subTarefa.dataInicio} onChange={(e) => {
                const newSubTarefaList = [...subTarefaList];
                newSubTarefaList[index].dataInicio = e.target.value;
                setSubTarefaList(newSubTarefaList);
              }} required />
            </div>
            <div className="form-group">
              <label htmlFor={`dataFim_${index}`}>Data de Fim</label>
              <input type="date" id={`dataFim_${index}`} className="form-control" value={subTarefa.dataFim} onChange={(e) => {
                const newSubTarefaList = [...subTarefaList];
                newSubTarefaList[index].dataFim = e.target.value;
                setSubTarefaList(newSubTarefaList);
              }} />
            </div>
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="prioridade">Prioridade</label>
          <select id="prioridade" className="form-control" value={prioridadeTarefa} onChange={(e) => setPrioridadeTarefa(e.target.value)} required>
            <option value="MUITO_ALTO">MUITO ALTO</option>
            <option value="ALTO">ALTO</option>
            <option value="NORMAL">NORMAL</option>
            <option value="BAIXO">BAIXO</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dataInicio">Data de Início da Tarefa</label>
          <input type="date" id="dataInicio" className="form-control" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="dataFim">Data de Fim da Tarefa</label>
          <input type="date" id="dataFim" className="form-control" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default NovaTarefa;
