import { cookie } from '../api/cookie';
import { useNotification } from '../hooks/useNotification';
import React from 'react';

const CookieWarning = () => {
  const [openWarning, setOpenWarning] = React.useState(() => {
    const hasCookie = cookie.getCookie('useCookie');
    return !hasCookie;
  });
  const { fail, success } = useNotification();

  function cookieUsage(option: 'accept' | 'deny') {
    let selected = true;

    if (option === 'accept') selected = true;
    if (option === 'deny') selected = false;

    const stringSelect = String(selected);
    try {
      cookie.setCookie('useCookie', stringSelect, 365);
      setOpenWarning(false);
      success('Permissões de cookies definidas com sucesso!');
    } catch (error) {
      let errorMessage = 'Erro desconhecido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      fail(errorMessage);
    }
  }

  return (
    <>
      {openWarning ? (
        <div className="fixed p-4 w-full bottom-0 bg-secondary text-white">
          <div className="mx-10 flex text-md md:text-lg justify-between items-center">
            <p className="font-bold ">
              Este site usa cookies para garantir que você obtenha a melhor
              experiência em nosso site. <span>Saiba mais</span>
            </p>
            <div className="flex gap-4 ">
              <button
                className="bg-primary text-secondary font-terciary p-2 cursor-pointer"
                onClick={() => cookieUsage('accept')}
              >
                Aceitar
              </button>
              <button
                className="bg-primary text-secondary font-terciary p-2 cursor-pointer"
                onClick={() => cookieUsage('deny')}
              >
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CookieWarning;
