import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Panel from './components/Panel';
import Auth from './components/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import API_BASE_URL from './components/apiConstants';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDNI, setUserDNI] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession) {
      setLoggedIn(true);
      setUserDNI(userSession);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setLoggedIn(false);
    setUserDNI('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/sign-in`, { userEmail: username, userPassword: password });
      setUserDNI(response.data.userDNI);
      setLoggedIn(true);
      localStorage.setItem('userSession', response.data.userDNI);
      localStorage.setItem('roleSession', response.data.role_id);
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };


  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="app">
      <div className="content">
        {loggedIn ? (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Header onLogout={handleLogout} />
                </div>
                {/* Botón para mostrar/ocultar la barra lateral en pantallas pequeñas */}
                <button
                  className={`btn d-block d-sm-none ${sidebarVisible ? 'active' : ''}`}
                  onClick={toggleSidebar}
                  style={{ backgroundColor: '#333', color: '#fff' }}
                >
                  Menú
                </button>
                {/* Oculta la barra lateral en pantallas extra pequeñas (xs) */}
                <div className={`col-md-2 ${sidebarVisible ? 'd-block' : 'd-none'} d-sm-block`}>
                  <Sidebar />
                </div>
                <div className="col-md-10">
                  <Panel />
                </div>
              </div>
            </div>
        ) : (
          <Auth
            username={username}
            password={password}
            loading={loading}
            error={error}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
  
  
}

export default App;