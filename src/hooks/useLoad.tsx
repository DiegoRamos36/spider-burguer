import { LoadingContext } from '../contexts/LoadingContext';
import React from 'react';

export const useLoad = () => {
  const context = React.useContext(LoadingContext);

  if (context === undefined) {
    throw new Error('useLoad deve ser usado com LoadingProvider');
  }

  return context;
};
