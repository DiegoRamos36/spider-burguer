import React from 'react';
import { useLogged } from './hooks/useLogged';
import { jwtDecode } from 'jwt-decode';
import { LogOut, Newspaper, ShoppingBasket, TruckIcon } from 'lucide-react';
import { cookie } from './api/cookie';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/useNotification';

export interface DecodedPayload {
  id: number;
  email: string;
  iat: number;
  name: string;
}

const MyAccount = ({ openMenu }: { openMenu: boolean }) => {
  const { logout } = useLogged();
  const navigate = useNavigate();
  const { fail } = useNotification();
  const [user, setUser] = React.useState<Partial<DecodedPayload> | null>();

  function handleLogout() {
    try {
      logout();
      navigate('/');
    } catch (error) {
      let errorMessage = 'Erro desconhecido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      fail(errorMessage);
    }
  }

  React.useEffect(() => {
    async function getUser() {
      try {
        const token = cookie.getAuthTokenFromCookie();
        const user: DecodedPayload = jwtDecode(token!);
        setUser(user);
      } catch (error) {
        let errorMessage = 'Erro Desconhecido';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setUser(null);
        console.error('Um erro ocorreu: ', errorMessage);
      }
    }
    getUser();
  }, []);

  return (
    <div className="fixed bottom-0 left-0 lg:absolute lg:top-10 lg:left-4 z-10">
      {user && openMenu ? (
        <ul className="flex w-screen bg-secondary lg:gap-4 lg:bg-white text-white mx-auto lg:w-48 lg:flex-col lg:rounded justify-around px-6 py-4  text-2xl">
          <div className="flex flex-col items-center">
            <h1 className=" w-24 md:w-auto overflow-hidden text-lg lg:text-2xl lg:text-secondary">
              {user.name}
            </h1>
            <p className="w-full h-1 bg-secondary rounded-lg mt-2 lg:block hidden"></p>
          </div>
          <a
            href="/pedidos"
            className="flex items-center lg:gap-4 cursor-pointer lg:text-slate-800 lg:text-2xl"
          >
            <ShoppingBasket />
            <p className="hidden lg:block">Pedidos</p>
          </a>

          <a
            href="/enderecos"
            className="flex items-center lg:gap-4 cursor-pointer lg:text-slate-800  lg:text-2xl"
          >
            <TruckIcon />
            <p className="hidden  lg:block ">Endereços</p>
          </a>
          <a
            href="/informacoes"
            className="flex items-center lg:gap-4 cursor-pointer lg:text-slate-800  lg:text-2xl"
          >
            <Newspaper />
            <p className="hidden lg:block">Informações</p>
          </a>

          <li
            className="flex lg:gap-4 items-center cursor-pointer lg:text-slate-800  lg:text-2xl"
            onClick={handleLogout}
          >
            <LogOut />
            <p className="hidden lg:block">Deslogar</p>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default MyAccount;
