import React from 'react';
import loginPage from './assets/logiin.jfif';
import { CircleUserRound, LogIn } from 'lucide-react';
import { user } from './api/user';
import { useNavigate } from 'react-router-dom';
import { useLogged } from './hooks/useLogged';
import { useNotification } from './hooks/useNotification';
import { cookie } from './api/cookie';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

type DataType = {
  status: number;
  token: string;
};

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { login } = useLogged();
  const { fail } = useNotification();
  const [loading, setLoading] = React.useState(false);

  async function handleData(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (!email || !password) {
      fail('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const data = (await user.authUser(email, password)) as DataType;

      if (data.status !== 200) throw new Error('Falha ao autenticar');
      cookie.setAuthTokenCookie(data.token, 1);
      login();
      navigate('/cardapio');
    } catch (error) {
      console.error(error);
      fail('Usuário ou senha incorretos!');
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginSuccess(res: CredentialResponse) {
    if (!res.credential) return fail('Falha ao logar com Google!');
    const { email } = jwtDecode(res.credential) as { email: string };
    try {
      const data = (await user.authUserFromGoogle(email)) as DataType;
      if (data.status !== 200) throw new Error('Falha ao autenticar');
      cookie.setAuthTokenCookie(data.token, 1);
      login();
      navigate('/cardapio');
    } catch (error) {
      console.error(error);
      fail('Falha ao logar com Google!');
    } finally {
      setLoading(false);
    }
  }

  const handleLoginFailure = () => {
    fail('Falha ao logar com os serviços da Google!');
  };

  return (
    <section
      className={`text-white font-terciary px-6 pb-10 md:p-10 sm:mt-0 md:mt-10 lg:mt-0 flex justify-center  md:w-10/12 mx-auto `}
    >
      <div className="grid-cols-1 lg:grid-cols-2 grid w-full sm:w-10/12 justify-center mt-20 md:mt-0 ">
        <div className="hidden bg-primary lg:flex flex-col items-center justify-between rounded">
          <h1 className="text-3xl lg:text-4xl text-center text-secondary py-2 ">
            Entre em Spider Burguer
          </h1>
          <img
            height={400}
            src={loginPage}
            className="flex-grow"
            alt="Para todos os momentos"
          />
        </div>

        <form
          onSubmit={handleData}
          className="flex flex-col  bg-secondary justify-center rounded-md lg:rounded "
        >
          <div className="flex flex-col w-10/12 lg:w-8/12 mx-auto">
            <p className="text-center flex justify-center mt-6 lg:mt-0 lg: mb-6 pt-10">
              <CircleUserRound height={90} width={90} />
            </p>
            <label className="text-2xl mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              name="email"
              value={email}
              className=" text-lg text-secondary font-sans mb-4  rounded-md pl-1 "
            />
            <label className="text-2xl mb-2" htmlFor="password">
              Senha
            </label>
            <input
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              value={password}
              name="password"
              className=" text-lg text-secondary font-sans mb-8 rounded-md"
            />
            <span className="mb-4 flex justify-between">
              <button
                className="bg-primary rounded-lg flex text-black py-1 px-2 items-center text-xl "
                type="submit"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Enviar'}{' '}
                <LogIn className="text-secondary" />
              </button>
            </span>

            <h1 className="text-2xl">ou</h1>

            <div className="py-4">
              <GoogleLogin
                locale="pt-BR"
                type="standard"
                shape="rectangular"
                text="continue_with"
                theme="filled_black"
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
