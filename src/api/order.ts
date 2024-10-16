import { apiUrl } from './config';
import { cookie } from './cookie';

async function create() {
  const token = cookie.getAuthTokenFromCookie();
  if (token == null) return 'Token inválido!';

  try {
    const response = await fetch(`${apiUrl}/novo-pedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        'Um erro ocorreu: ' + response.status + '' + response.statusText,
      );
    }

    return response.json();
  } catch (e) {
    let messageError = 'Erro desconhecido';

    if (e instanceof Error) {
      messageError = e.message;
      return messageError;
    }
  }
}

async function get(userId: number) {
  try {
    const response = await fetch(`${apiUrl}/pedidos`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (e) {
    let errorMessage = 'Erro desconhecido';
    if (e instanceof Error) {
      errorMessage = e.message;
      return errorMessage;
    }
  }
}

async function remove() {}

export const Order = { create, get, remove };
