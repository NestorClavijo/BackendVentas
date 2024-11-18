import '../assets/login.css';

import Navbar from '../components/NavBar';
import { useLogin } from '../lib/hooks/login';

export default function LoginForm() {

  const { username, setUsername, contrasena, setContrasena, loginError, handleLogin } = useLogin();

  return (
    <div className="form-container">
      <Navbar />
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        {loginError && <p className="text-danger text-center">{loginError}</p>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            name="contrasena"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
