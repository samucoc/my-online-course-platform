import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  // State for Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for Register
  const [email, setEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    // Aquí va la lógica de autenticación
    // Ejemplo: await loginUser(username, password);
    setLoading(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');
    // Aquí va la lógica de registro
    // Ejemplo: await registerUser(email, registerUsername, registerPassword);
    setRegisterLoading(false);
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Iniciar Sesión</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Registrarse</button>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 'login' ? (
          <Login 
            username={username}
            password={password}
            loading={loading}
            error={error}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Register
            email={email}
            username={registerUsername}
            password={registerPassword}
            confirmPassword={registerConfirmPassword}
            loading={registerLoading}
            error={registerError}
            setEmail={setEmail}
            setUsername={setRegisterUsername}
            setPassword={setRegisterPassword}
            setConfirmPassword={setRegisterConfirmPassword}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
}

export default Auth;
