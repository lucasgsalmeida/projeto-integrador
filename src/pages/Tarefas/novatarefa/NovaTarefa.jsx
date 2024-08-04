import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import './NovaTarefa.css';

const NovaTarefa = () => {
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock data for projects
  const projects = [
    { value: '1', label: 'Projeto 1' },
    { value: '2', label: 'Projeto 2' },
    { value: '3', label: 'Projeto 3' },
    // Add more projects as needed
  ];

  return (
    <div className="geralNovaTarefas container mt-5">
      <p className="fs-1">Nova Tarefa</p>

      <form className="mb-3">
        <div className="row g-3">
          <div className="col-md-12 mb-3">
            <label htmlFor="projectSelect" className="form-label">
              Selecione o projeto
            </label>
            <Select
              id="projectSelect"
              options={projects}
              value={selectedProject}
              onChange={setSelectedProject}
              placeholder="Selecione um projeto"
            />
          </div>
          <div className="col-md-6">
            <select className="form-select" aria-label="Tipo de tarefa">
              <option value="" selected>
                Tipo de tarefa
              </option>
              <option value="1">Tipo 1</option>
              <option value="2">Tipo 2</option>
              <option value="3">Tipo 3</option>
            </select>
          </div>
          <div className="col-md-6">
            <select className="form-select" aria-label="Prioridade">
              <option value="" selected>
                Prioridade
              </option>
              <option value="1">Urgente</option>
              <option value="2">Alta</option>
              <option value="3">Média</option>
              <option value="4">Baixa</option>
            </select>
          </div>
        </div>
      </form>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="startDate" className="form-label">
            Data de início
          </label>
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
          <label htmlFor="notes" className="form-label">
            Descreva sua tarefa:
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="descricao-tarefa"
          />
        </div>
      </div>
    </div>
  );
};

export default NovaTarefa;
