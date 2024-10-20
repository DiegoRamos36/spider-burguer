import React from 'react';
import {
  PlusCircle,
  LogIn,
  ShoppingBag,
  Instagram,
  Phone,
  User,
} from 'lucide-react';
import logoHeader from '../assets/logo-spider.webp';
import { useLogged } from '../hooks/useLogged';
import { useCart } from '../hooks/useCart';
import MyAccount from '../MyAccount';

export interface DecodedPayload {
  id: number;
  email: string;
  iat: number;
}

const Header = React.memo(() => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { isLoggedIn } = useLogged();
  const { total } = useCart();
  const filialWhatsappLink = '';
  const filialInstagramLink = '';

  return (
    <nav className="bg-secondary w-screen z-20 py-1 lg:py-3 fixed shadow">
      <div className="flex items-center justify-between px-2 md:w-11/12 m-auto">
        <div className="flex gap-2 sm:gap-5 text-white font-terciary text-xl">
          <a
            href={filialInstagramLink}
            target="_blank"
            className="flex items-center px-2 gap-2"
          >
            <Instagram className="text-primary w-7 h-7 sm:w-9 sm:h-9" />
            <span className="hidden lg:block">Instagram</span>
          </a>
          <a
            href={filialWhatsappLink}
            target="_blank"
            className="flex items-center cursor-pointer gap-2"
          >
            <Phone className="text-primary w-7 h-7 sm:w-9 sm:h-9" />
            <span className="hidden lg:block">WhatsApp</span>
          </a>
        </div>
        <a
          href="/"
          className="font-primary text-primary text-2xl hidden lg:block"
        >
          Spider Burguer
        </a>
        <a href="/" className="lg:hidden cursor-pointer ">
          <img
            src={logoHeader}
            alt="Logo Spider"
            className="cursor-pointer w-20 h-20"
          />
        </a>

        <div className={`font-terciary text-xl text-white flex sm:gap-5`}>
          {isLoggedIn ? (
            <p
              className="flex items-center gap-2 cursor-pointer px-2 relative"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <User className="text-primary  w-7 h-7 sm:w-9 sm:h-9" />{' '}
              <a className="hidden lg:block">MINHA CONTA</a>
              <MyAccount openMenu={openMenu} />
            </p>
          ) : (
            <a
              href="/login"
              className="flex items-center gap-2 cursor-pointer px-2 relative"
            >
              <LogIn className="text-primary  w-7 h-7 sm:w-9 sm:h-9" />{' '}
              <a className="hidden lg:block">LOGAR</a>
            </a>
          )}

          {isLoggedIn ? (
            <a
              href="/carrinho"
              className="flex items-center gap-2 cursor-pointer px-2"
            >
              <ShoppingBag className="text-primary  w-7 h-7 sm:w-9 sm:h-9" />{' '}
              <a className="hidden lg:block">Carrinho: {total()}</a>
            </a>
          ) : (
            <a
              href="/register"
              className="flex items-center gap-2 cursor-pointer px-2"
            >
              <PlusCircle className="text-primary  w-7 h-7 sm:w-9 sm:h-9" />{' '}
              <a className="hidden lg:block">CRIAR CONTA</a>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Header;
