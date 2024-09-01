import React from "react";
import "./TipoTarefa.css";
import ListTipoTarefas from "../../components/modeloTarefa/ListTipoTarefas";
import { useNavigate } from "react-router-dom";

const TipoTarefa = () => {
  const navigate = useNavigate();

  const btnNovoTipoTarefa = () => {
    navigate('/tipo-tarefa/new');
  };

  return (
    <div className="geralTipoTarefa">
      <p className="fs-1">Modelo de tarefas</p>

      <button type="button" className="btn btn-primary btnNovoTipoTarefa" onClick={btnNovoTipoTarefa}>
        Novo tipo de Tarefa
      </button>

      <br />
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Descrição do tipo de Tarefa"
          aria-label="Pesquisar"
        />
        <button className="btn btn-primary" type="submit">
          Pesquisar
        </button>
      </form>

      <br />

      <ListTipoTarefas />
    </div>
  );
};

export default TipoTarefa;
