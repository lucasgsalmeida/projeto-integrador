import React from "react";
import "./NovoProjeto.css";

const NovoProjeto = () => {
  return (
    <div className="geralNovoProjetos container mt-5">
      <p className="fs-1">Novo projeto</p>

      <form className="mb-3">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do projeto"
              aria-label="Nome do projeto"
            />
          </div>
        </div>
      </form>

      <form className="mb-3">
        <div className="row g-3">
          <div className="col-md-6">
            <select className="form-select" aria-label="Status">
              <option value="" selected>
                Status
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-md-6">
            <select className="form-select" aria-label="Prioridade">
              <option value="" selected>
                Prioridade
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>

      <form className="mb-3">
        <div className="row g-3">
          <div className="col-md-6">
            <select className="form-select" aria-label="Tipo de serviço">
              <option value="" selected>
                Tipo de serviço
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Orçamento mensal"
              aria-label="Orçamento mensal"
            />
          </div>
        </div>
      </form>

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
            />
          </div>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-12">
          <label htmlFor="notes" className="form-label">Notas:</label>
          <textarea className="form-control" id="notes" aria-label="With textarea"></textarea>
        </div>
      </div>
    </div>
  );
};

export default NovoProjeto;
