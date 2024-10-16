import { apiUrl } from './config';

async function New(
  nome: string,
  desc: string,
  preco: string,
  quantidade: string,
  slug: string,
  imgSrc: string,
  imgAlt: string,
) {
  try {
    const response = await fetch(`${apiUrl}/novo-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        desc,
        preco,
        quantidade,
        slug,
        imgSrc,
        imgAlt,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function All() {
  try {
    const response = await fetch(`${apiUrl}/obter-item`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function ByName(name: string) {
  try {
    const response = await fetch(`${apiUrl}/obter-item-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.json();

    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

async function Delete(id: string) {
  try {
    const response = await fetch(`${apiUrl}/cardapio/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    let errorMessage = 'Erro Desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  }
}

export const Item = { New, All, ByName, Delete };
