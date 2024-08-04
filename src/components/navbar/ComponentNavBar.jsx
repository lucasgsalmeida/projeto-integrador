import React from 'react';
import { NavLink } from 'react-router-dom';

const ComponentNavBar = (props) => {
  return (
    <li className="nav-item">
      <NavLink 
        to={props.route} 
        className={({ isActive }) => `nav-link text-white ${isActive ? 'active fw-bolder' : ''}`}
      >
        <img src={props.img} alt="Logo Branca" width={40} height={32} className="bi pe-none me-2" />
        {props.nome}
      </NavLink>
    </li>
  );
};

export default ComponentNavBar;
