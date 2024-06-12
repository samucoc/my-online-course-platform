import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Panel from './components/Panel';
import Auth from './components/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import API_BASE_URL from './components/apiConstants';

const App = ( ) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDNI, setUserDNI] = useState();
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentOption, setCurrentOption] = useState('');

  const handleOptionChange = (option) => {
    setCurrentOption(option);
  };

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

  const handleLoginSuccess = () => {
    setLoggedIn(true);
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
                  <Sidebar onOptionChange={handleOptionChange} />
                </div>
                <div className="col-md-10">
                  <Panel currentOption={currentOption} userDNI={userDNI}/>
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
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
  
  
}

export default App;