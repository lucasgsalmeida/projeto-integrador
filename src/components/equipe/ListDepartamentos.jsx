import React from 'react'

const ListDepartamentos = () => {
    return (
        <a href="#" class="list-group-item list-group-item-action geralListTarefa">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">NOME DO DEPARTAMENTO</h5>
            <small class="text-body-secondary">ID</small>
          </div>
          <small class="text-body-secondary">Responsável: </small>
          <br />
          <small class="text-body-secondary">Integrantes: </small>
        </a>
      );
    };

export default ListDepartamentos