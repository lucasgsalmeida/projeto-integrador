import React from 'react'
import './ListTarefas.css'

const ListTarefas = () => {
    return (
        <a href="#" class="list-group-item list-group-item-action geralListTarefa">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">TIPO DA TAREFA</h5>
            <small class="text-body-secondary">ID</small>
          </div>
          <small class="text-body-secondary">Projeto: </small>
          <br />
          <small class="text-body-secondary">Responsável atual: </small>
          <br />
          <small class="text-body-secondary">Data de entrega da etapa atual: </small>
          <br />
          <small class="text-body-secondary">Data limite para entrega: </small>
        </a>
      );
    };

export default ListTarefas