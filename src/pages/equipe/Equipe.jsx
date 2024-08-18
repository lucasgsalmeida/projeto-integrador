import React from 'react'
import './Equipe.css'
import ListDepartamentos from '../../components/equipe/ListDepartamentos'
import ListEquipe from '../../components/equipe/ListEquipe'

const Equipe = () => {
  return (
    <div className="geralEquipe">
      <p className="fs-1">Definição de equipe</p>
      <br/><br/>

      <div className='geralDepartamentos'>
        <p className='fs-3'>Departamentos</p>
        <ListDepartamentos/>
      </div>

      <div className='geralPessoas'>
        <p className='fs-3'>Equipe</p>
        <ListEquipe/>
      </div>

      </div>
  )
}

export default Equipe