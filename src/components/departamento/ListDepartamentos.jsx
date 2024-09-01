import React, { useEffect, useState } from "react";
import axios from "axios";
import './ListDepartamentos.css';

const ListDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const response = await axios.get('http://localhost:8080/departamento/get/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const departamentosData = response.data;
        setDepartamentos(departamentosData);
        localStorage.setItem('departamentos', JSON.stringify(departamentosData));
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
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
          const usuariosData = response.data;
          setUsuarios(usuariosData);
          localStorage.setItem('usuarios', JSON.stringify(usuariosData)); // Salva a lista de usuários no localStorage
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchDepartamentos();
    fetchUsuarios();
  }, []); // Dependências vazias para garantir que o fetch seja chamado uma vez

  const getNomeResponsavel = (idUsuario) => {
    const usuario = usuarios.find(usuario => usuario.id === idUsuario);
    return usuario ? usuario.nome : 'Desconhecido';
  };

  return (
    <div className="list-group">
      {departamentos.length > 0 ? (
        departamentos.map(departamento => (
          <a href={`/editar/${departamento.id}`} className="list-group-item list-group-item-action geralListDepartamentos" key={departamento.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{departamento.nome}</h5>
              <small className="text-body-secondary">#{departamento.id}</small>
            </div>
            <small className="text-body-secondary">Responsável: {getNomeResponsavel(departamento.idUsuario)}</small>
            <br />
          </a>
        ))
      ) : (
        <p>Nenhum departamento encontrado.</p>
      )}
    </div>
  );
};

export default ListDepartamentos;
