import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import API_BASE_URL from './apiConstants';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Auth = ({ onLoginSuccess }) => {
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

    try {
      const response = await axios.post(API_BASE_URL+'/users/sign-in', {
        userEmail: username,
        userPassword: password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        onLoginSuccess(); // Llama a la función de callback para actualizar el estado de loggedIn en App.js
      } else {
        setError('Error en el inicio de sesión.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.messages.error || 'Error en el inicio de sesión.');
      } else {
        setError('Error en el inicio de sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');

    try {
      const response = await axios.post(API_BASE_URL+'/users/register', {
        role_id: 1,
        userDNI : "88888888",
        userEmail: email,
        userFullName: registerUsername,
        userPassword: registerPassword,
        userPasswordConfirm: registerConfirmPassword,
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Registro exitoso:', response.data);
        // Maneja la respuesta exitosa aquí, como redirigir al usuario
        Swal.fire({
          icon: 'success',
          title: 'Registro Correcto',
          text: response.data.messages,
        });
      } else {
        setRegisterError('Error en el registro.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      if (error.response && error.response.data) {
        setRegisterError(error.response.data.messages.error || 'Error en el registro.');
      } else {
        setRegisterError('Error en el registro.');
      }
    } finally {
      setRegisterLoading(false);
    }
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
            registerLoading={registerLoading}
            registerError={registerError}
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
