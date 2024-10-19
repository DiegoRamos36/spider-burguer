import React from 'react';
import spiderLogo from '../assets/logo-spider.webp';

const Footer = React.memo(() => {
  const endereco = {
    linha1: 'Avenida Rio Branco',
    numero: 1234,
    ref: 'Perto do arco iris',
  };
  return (
    <footer className={`bg-primary py-4 font-text`}>
      <div className="w-10/12 mx-auto grid grid-cols-2 lg:grid-cols-3  lg:gap-5">
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">
            Spider Burguer
          </h2>
          <p className="text-stone-600 leading-4">
            {' '}
            {endereco.linha1} {endereco.numero}, {endereco.ref}. Venha
            experimentar nossos deliciosos lanches!
          </p>
        </div>
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">
            Aqui é o seu lar
          </h2>
          <p className="text-stone-600 leading-4">
            Cada prato que preparamos é pensado com cuidado para trazer até você
            o melhor da nossa cozinha.
          </p>
        </div>
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">Registre-se</h2>
          <p className="text-stone-600 leading-4">
            Ao criar sua conta, você terá acesso exclusivo a ofertas especiais e
            promoções personalizadas.
          </p>
        </div>
      </div>
      <p className="w-10/12 mx-auto mt-10 h-0.5 bg-stone-900"></p>
      <div className="w-10/12 mx-auto flex items-center justify-between">
        <img src={spiderLogo} alt="Logo Spider" width={100} />
        <div>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/login'}
          >
            Logar
          </a>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/register'}
          >
            Registrar
          </a>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/carrinho'}
          >
            Carrinho
          </a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
