import { useLogged } from './hooks/useLogged';
import Cardapio from './Cardapio';
import Login from './Login';

const ProtectCardapioRoute = () => {
  const { isLoggedIn } = useLogged();

  return <> {isLoggedIn ? <Cardapio /> : <Login />} </>;
};

export default ProtectCardapioRoute;
