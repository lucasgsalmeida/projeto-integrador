import React, { useEffect, useState } from "react";
import axios from "axios";
import './ListTarefas.css';

const ListTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/tarefa/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTarefas(response.data);
        localStorage.setItem('tarefas', JSON.stringify(response.data));
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const storedUsuarios = localStorage.getItem('usuarios');
        if (storedUsuarios) {
          setUsuarios(JSON.parse(storedUsuarios));
        } else {
          const tokenData = JSON.parse(localStorage.getItem('token'));
          const token = tokenData.token; // Extraindo o token do objeto JSON
          const response = await axios.get('http://localhost:8080/usuario/get/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsuarios(response.data);
          localStorage.setItem('usuarios', JSON.stringify(response.data)); // Salva a lista de usuários no localStorage
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchTarefas();
    fetchUsuarios();
  }, []); // Dependências vazias para garantir que o fetch seja chamado uma vez

  const getNomeResponsavel = (idUsuario) => {
    const usuario = usuarios.find(usuario => usuario.id === idUsuario);
    return usuario ? usuario.nome : 'Desconhecido';
  };

  return (
    <div className="list-group">
      {tarefas.length > 0 ? (
        tarefas.map(tarefa => (
          <a href={`/editar/${tarefa.id}`} className="list-group-item list-group-item-action geralListTarefas" key={tarefa.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{tarefa.descricao}</h5>
              <small className="text-body-secondary">#{tarefa.id}</small>
            </div>
            <small className="text-body-secondary">Responsável: {getNomeResponsavel(tarefa.idUsuario)}</small>
            <br />
          </a>
        ))
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
};

export default ListTarefas;
