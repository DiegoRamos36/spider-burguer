import { apiUrl } from './config';

async function createUser(email: string, password: string, username: string) {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar');
    }

    return response.status;
  } catch (error) {
    let errorMessage = 'Erro desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function authUser(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status !== 200) {
      throw new Error('Falha ao logar!');
    }

    const token = await response.text();
    if (!token) throw new Error('Token inválido!');
    return { status: response.status, token };
  } catch (error) {
    let errorMessage = 'Erro desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

export const user = { authUser, createUser };
