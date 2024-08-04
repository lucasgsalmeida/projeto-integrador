import React from "react";
import "./Projetos.css";
import ListProjetos from "../../components/projetos/ListProjetos";
import { useNavigate } from "react-router-dom";

const Projetos = () => {

  const navigate = useNavigate();

  const btnNovoProjeto = () => {
    navigate('/projetos/new');
  };

  return (
    <div className="geralProjetos">
      <p className="fs-1">Projetos</p>

      <button type="button" className="btn btn-primary btnNovoProjeto" onClick={btnNovoProjeto}>
        Novo projeto
      </button>

      <br />
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Nome do projeto, Data de início, Status"
          aria-label="Pesquisar"
        />
        <button className="btn btn-primary" type="submit">
          Pesquisar
        </button>
      </form>

      <br />

      <ListProjetos />
    </div>
  );
};

export default Projetos;
