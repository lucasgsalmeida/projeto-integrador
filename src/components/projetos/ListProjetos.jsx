import React from "react";
import './ListProjetos.css'

const ListProjetos = () => {
  return (
    <a href="#" class="list-group-item list-group-item-action geralListProjetos">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">NOME DO PROJETO</h5>
        <small class="text-body-secondary">ID</small>
      </div>
      <small class="text-body-secondary">Status: </small>
      <br />
      <small class="text-body-secondary">Data de início: </small>
    </a>
  );
};

export default ListProjetos;
