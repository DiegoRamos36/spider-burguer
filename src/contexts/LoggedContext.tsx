import { cookie } from '../api/cookie';
import { useNotification } from '../hooks/useNotification';
import React, { createContext } from 'react';

interface LoggedContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const LoggedContext = createContext<LoggedContextType | undefined>(
  undefined,
);

export const LoggedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => {
    const savedState = cookie.getAuthTokenFromCookie()
      ? localStorage.getItem('isLoggedIn')
      : localStorage.setItem('isLoggedIn', 'false');
    return savedState === 'true';
  });
  const { success } = useNotification();

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    success('Usuário autenticado com sucesso!');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    cookie.clearCookie('authToken');
    success('Você deslogou!');
  };

  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(savedState === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LoggedContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoggedContext.Provider>
  );
};
