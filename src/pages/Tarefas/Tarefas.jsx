import React from "react";
import "./Tarefas.css";
import ListTarefas from "../../components/tarefas/ListTarefas";
import { useNavigate } from "react-router-dom";

const Tarefas = () => {
  const navigate = useNavigate();

  const btnNovaTarefa = () => {
    navigate('/tarefas/new');
  };

  return (
    <div className="geralTarefa">
      <p className="fs-1">Tarefas</p>

      <button type="button" className="btn btn-primary btnNovaTarefa" onClick={btnNovaTarefa}>
        Nova tarefa
      </button>

      <br />
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Nome da tarefa, Data de início, Status"
          aria-label="Pesquisar"
        />
        <button className="btn btn-primary" type="submit">
          Pesquisar
        </button>
      </form>

      <br />

      <ListTarefas />
    </div>
  );
};

export default Tarefas;
