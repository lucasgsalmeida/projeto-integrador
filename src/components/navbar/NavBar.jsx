import React from 'react';
import './NavBar.css';
import LogoBranca from './../../imgs/logo-branca.png';
import ComponentNavBar from './ComponentNavBar';

const NavBar = () => {
  return (
    <div className="geralNavBar">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: 280 }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img className="bi pe-none me-2" width={40} height={32} src={LogoBranca} alt="Logo Branca" />
          <span className="fs-4 fw-lighter text-uppercase text-end">Gestão 10x</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <ComponentNavBar nome="Home" img={LogoBranca} route="/" />
          <ComponentNavBar nome="Projetos" img={LogoBranca} route="/projetos" />
          <ComponentNavBar nome="Tarefas" img={LogoBranca} route="/tarefas" />
          <ComponentNavBar nome="Biblioteca" img={LogoBranca} route="/biblioteca" />
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
