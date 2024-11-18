import { API_URL } from "./consts";

export interface LoginResponse {
  token: string;
  id: string;
}

export async function login(username: string, contrasena: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: contrasena
    })
  });

  const data = await response.json() as LoginResponse;

  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.id);
}

export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}