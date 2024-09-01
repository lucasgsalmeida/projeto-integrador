import React, { useEffect, useState } from "react";
import axios from "axios";
import './ListTipoTarefas.css';

const ListTipoTarefas = () => {
  const [tiposTarefas, setTiposTarefas] = useState([]);

  useEffect(() => {
    const fetchTiposTarefas = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/modelo/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const tiposTarefasData = response.data;
        setTiposTarefas(tiposTarefasData);
        localStorage.setItem('tiposTarefas', JSON.stringify(tiposTarefasData));
      } catch (error) {
        console.error('Erro ao buscar tipos de Tarefas:', error);
      }
    };

    fetchTiposTarefas();
  }, []);

  return (
    <div className="list-group">
      {tiposTarefas.length > 0 ? (
        tiposTarefas.map(tipoTarefa => (
          <a href={`/editar/${tipoTarefa.id}`} className="list-group-item list-group-item-action geralListTipoTarefas" key={tipoTarefa.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{tipoTarefa.descricao}</h5>
              <small className="text-body-secondary">#{tipoTarefa.id}</small>
            </div>
          </a>
        ))
      ) : (
        <p>Nenhum tipo de Tarefa encontrado.</p>
      )}
    </div>
  );
};

export default ListTipoTarefas;
