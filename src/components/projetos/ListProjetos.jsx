import React, { useEffect, useState } from "react";
import axios from "axios";  // Importa o Axios
import './ListProjetos.css';

const ListProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const token = tokenData.token; // Extraindo o token do objeto JSON
        const storedProjetos = localStorage.getItem('projetos');

        if (storedProjetos) {
          setProjetos(JSON.parse(storedProjetos));
        } else {
          const response = await axios.get('http://localhost:8080/projeto/get/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const projetosData = response.data;
          setProjetos(projetosData);
          localStorage.setItem('projetos', JSON.stringify(projetosData));
        }
      } catch (error) {
        setError('Erro ao buscar projetos.');
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  return (
    <div className="list-group">
      {error && <p>{error}</p>}
      {projetos.length > 0 ? (
        projetos.map(projeto => (
          <a href="#" className="list-group-item list-group-item-action geralListProjetos" key={projeto.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{projeto.nome}</h5>
              <small className="text-body-secondary">ID: {projeto.id}</small>
            </div>
            <small className="text-body-secondary">Status: {projeto.status}</small>
            <br />
            <small className="text-body-secondary">Data de início: {new Date(projeto.dataInicio).toLocaleDateString()}</small>
          </a>
        ))
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};

export default ListProjetos;
