import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Tarefas.css'
import ListTarefas from '../../components/tarefas/ListTarefas';

const Tarefas = () => {

  const navigate = useNavigate();

  const btnNovaTarefa = () => {
    navigate('/tarefas/new');
  };

  const btnTipoTarefa = () => {
    navigate('/tarefas/tipo');
  };
 
  return (
    <div className="geralTarefa">
      <p className="fs-1">Tarefas</p>

      <div className='botoesTarefas'>

      <button type="button" className="btn btn-primary btnNovoTarefa" onClick={btnNovaTarefa}>
        Nova Tarefa
      </button>

      <button type="button" className="btn btn-primary btnNovoTarefa tiposTarefasBtn" onClick={btnTipoTarefa}>
        Tipos de tarefa
      </button>
      </div>
      <br />

      <div class="container">

</div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Nome da Tarefa, Data de início, Status"
          aria-label="Pesquisar"
        />
        <button className="btn btn-primary" type="submit">
          Pesquisar
        </button>
      </form>
      <br />
      <ListTarefas/>
    </div>
  )
}

export default Tarefas