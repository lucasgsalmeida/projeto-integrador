import React from "react";
import "./Departamento.css";
import ListDepartamentos from "../../components/departamento/ListDepartamentos"
import { useNavigate } from "react-router-dom";

const Departamentos = () => {
  const navigate = useNavigate();

  const btnNovoDepartamento = () => {
    navigate('/departamentos/new');
  };

  return (
    <div className="geralDepartamentos">
      <p className="fs-1">Departamentos</p>

      <button type="button" className="btn btn-primary btnNovoDepartamento" onClick={btnNovoDepartamento}>
        Novo departamento
      </button>

      <br />
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Nome do departamento, Data de início, Status"
          aria-label="Pesquisar"
        />
        <button className="btn btn-primary" type="submit">
          Pesquisar
        </button>
      </form>

      <br />

      <ListDepartamentos />
    </div>
  );
};

export default Departamentos;
