import React from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotification deve ser usado com NotificationProvider');
  }

  return context;
};
