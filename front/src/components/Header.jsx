import React from 'react';

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    // Llamar a la función onLogout para borrar la sesión
    onLogout();
    // Redirigir a la página de inicio de sesión
    window.location.href = '/';
  };

  return (
    <div className="header navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#333' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: '#fff' }}></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;