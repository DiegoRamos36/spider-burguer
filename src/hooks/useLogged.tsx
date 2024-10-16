import { LoggedContext } from '../contexts/LoggedContext';
import React from 'react';

export const useLogged = () => {
  const context = React.useContext(LoggedContext);

  if (context === undefined) {
    throw new Error('useLogged deve ser usado com LoggedProvider');
  }

  return context;
};
