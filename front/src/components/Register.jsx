import React from 'react';

const Register = ({ email, username, password, confirmPassword, loading, error, setEmail, setUsername, setPassword, setConfirmPassword, handleRegister }) => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center mb-4">
                <h3>Registrar</h3>
              </div>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <input type="hidden" name="role_id" id="role_id"/>
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="userEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userFullName" className="form-label">Nombre de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userFullName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userPassword" className="form-label">Contraseña</label>
                  <input
                    type="userPassword"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userPasswordConfirm" className="form-label">Repita Contraseña</label>
                  <input
                    type="userPasswordConfirm"
                    className="form-control"
                    id="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Cargando...' : 'Registrar'}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
