import { apiUrl } from './config';

type FormData = {
  nome: string;
  address: string;
  bairro: string;
  numero: string;
  reference: string;
  userId: number;
};

async function get(userId: number) {
  if (!userId) return null;

  try {
    const response = await fetch(`${apiUrl}/get-address`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ userId }),
    });

    return response.json();
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}
async function remove(id: number) {
  if (!id) return null;

  try {
    const response = await fetch(`${apiUrl}/remove-address`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ id }),
    });

    return response.statusText;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

async function create(formData: FormData) {
  try {
    const response = await fetch(`${apiUrl}/new-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
}

async function getDefault(userId: number) {
  if (!userId || userId < 0) return null;

  try {
    const response = await fetch(`${apiUrl}/get-default-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok)
      throw new Error('Um erro ocorreu: ' + response.statusText);

    return response.json();
  } catch (error) {
    return error instanceof Error ? error.message : 'Erro Desconhecido';
  }
}

async function setDefault(userId: number, enderecoId: number) {
  if (!userId || userId < 0 || !enderecoId || enderecoId < 0) return null;

  try {
    const response = await fetch(`${apiUrl}/set-default-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, enderecoId }),
    });

    if (!response.ok)
      throw new Error('Um erro ocorreu: ' + response.statusText);

    return response.json();
  } catch (error) {
    return error instanceof Error ? error.message : 'Erro Desconhecido';
  }
}

export const enderecos = { get, getDefault, setDefault, create, remove };
