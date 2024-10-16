import { Navigate } from 'react-router-dom';
import { useLogged } from './hooks/useLogged';

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useLogged();

  return isLoggedIn ? children : <Navigate to="/initial" />;
};

export default ProtectRoute;
