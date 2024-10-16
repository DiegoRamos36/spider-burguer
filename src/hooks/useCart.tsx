import { CartContext } from '../contexts/CartContext';
import React from 'react';

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart deve ser usado com CartProvider');
  }

  return context;
};
