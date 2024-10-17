import React from 'react';
import { user } from './api/user';
import { useNotification } from './hooks/useNotification';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { gerarSenha } from './functions/gerarSenha';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { fail, success } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function handleData(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await user.createUser(
        email,
        password,
        firstName + '' + secondName,
      );
      if (data === 201) {
        success('Usuário registrado com sucesso!');
      } else {
        throw new Error('Usuário não registrado!');
      }
    } catch (error) {
      console.error(error);
      fail('Erro ao tentar autenticar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister(res: CredentialResponse) {
    if (!res.credential)
      return fail('Falha ao logar com os serviços da Google');
    const { email, name } = jwtDecode(res.credential) as {
      email: string;
      name: string;
    };
    try {
      const data = await user.createUser(email, gerarSenha(), name);

      if (data !== 201) throw new Error('Falha ao registrar!');

      success('Usuário registrado com sucesso!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      fail('Falha ao logar com Google!');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleFail() {
    fail('Falha ao registrar com os serviços do google!');
  }

  return (
    <section className="sm:w-10/12  lg:w-8/12 mx-4 sm:mx-auto pt-10 pb-10 mb-10">
      <form
        onSubmit={handleData}
        className="border px-8 py-4 sm:mt-0 md:mt-5 lg:mt-0  rounded-lg bg-secondary text-white"
      >
        <h1 className=" font-bold mb-2 text-2xl">Formulário de Cadastro</h1>
        <p className="text-gray-200 text-sm md:text-md ">
          Obrigado por escolher nossa hamburgueria! Para garantirmos o melhor
          atendimento, pedimos que preencha o nosso formulário de registro
          abaixo. As informações fornecidas serão mantidas em total sigilo.
          Somente formulários completamente preenchidos serão aceitos.
        </p>
        <p className="bg-white h-line my-8 "></p>
        <div className="flex justify-around text-lg gap-4 mb-8">
          <label className="w-6/12" htmlFor="name">
            Nome
            <input
              id="name"
              className="border rounded w-full text-secondary py-2 px-3"
              type="text"
              placeholder="Seu nome"
              onChange={({ target }) => {
                setFirstName(target.value);
              }}
            />
          </label>

          <label className="w-6/12" htmlFor="sobrenome">
            Sobrenome
            <input
              className="border text-secondary rounded w-full py-2 px-3"
              id="sobrenome"
              type="text"
              placeholder="Sobrenome"
              onChange={({ target }) => {
                setSecondName(target.value);
              }}
            />
          </label>
        </div>

        <div className="mb-8 text-lg">
          <label htmlFor="email">Email</label>
          <input
            className="text-secondary border rounded w-full py-2 px-3"
            id="email"
            type="email"
            placeholder="Seu email"
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>

        <div className="mb-8 text-lg">
          <label htmlFor="password">Senha</label>
          <input
            className=" text-secondary border rounded w-full py-2 px-3"
            id="password"
            type="password"
            placeholder="********"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-primary text-secondary font-terciary text-xl py-1 px-2 rounded "
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          <GoogleLogin
            text="signup_with"
            theme="filled_black"
            onSuccess={handleGoogleRegister}
            onError={handleGoogleFail}
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
