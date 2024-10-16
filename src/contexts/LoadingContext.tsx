import React, { createContext } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  load: () => void;
  loaded: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const load = () => {
    setLoading(true);
  };
  const loaded = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, load, loaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
