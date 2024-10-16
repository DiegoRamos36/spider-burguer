import React from 'react';

type ButtonProps = {
  hasIcon: boolean;
  children: React.ReactNode;
  tipo: 'filled' | 'outlined';
  onClick: React.MouseEventHandler | undefined;
};

const Button = ({ children, hasIcon, tipo, onClick }: ButtonProps) => {
  if (tipo === 'filled') {
    return (
      <button
        onClick={onClick}
        className={`${hasIcon ? 'flex' : 'inline-block'} font-terciary
         items-center justify-betwee n text-secondary text-xl border-primary bg-primary border px-3 py-1 rounded-lg transition ease-in duration-100 hover:bg-transparent  hover:text-white`}
      >
        {children}
      </button>
    );
  }
  if (tipo === 'outlined') {
    return (
      <button
        onClick={onClick}
        className={`${
          hasIcon ? 'flex' : 'inline-block'
        } text-xl items-center justify-between bg-transparent border px-3 py-1 rounded-lg border-primary transition ease-in duration-100 hover:bg-primary`}
      >
        {children}
      </button>
    );
  }

  return <button>{children}</button>;
};

export default Button;
