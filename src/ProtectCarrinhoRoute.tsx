import { useLogged } from './hooks/useLogged';
import Login from './Login';
import Carrinho from './Carrinho';

const ProtectCarrinhoRoute = () => {
  const { isLoggedIn } = useLogged();

  return <> {isLoggedIn ? <Carrinho /> : <Login />} </>;
};

export default ProtectCarrinhoRoute;
