import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

export function useLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    login(username, contrasena)
      .then(() => navigate("/sucursal"))
      .catch(() => {
        setLoginError('Nombre de usuario o contraseña incorrectos');
      });
  };

  return { username, setUsername, contrasena, setContrasena, loginError, handleLogin };
}