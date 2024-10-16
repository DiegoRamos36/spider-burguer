import React, { createContext, ReactNode } from 'react';
import { Id, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationContextType {
  success: (message: string) => Id;
  fail: (message: string) => Id;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  function success(message: string) {
    return toast.success(message);
  }

  function fail(message: string) {
    return toast.error(message);
  }

  return (
    <NotificationContext.Provider value={{ success, fail }}>
      {children}
    </NotificationContext.Provider>
  );
};
