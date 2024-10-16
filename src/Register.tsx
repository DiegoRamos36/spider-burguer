import React from 'react';
import { user } from './api/user';
import { useNotification } from './hooks/useNotification';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { fail, success } = useNotification();
  const [loading, setLoading] = React.useState(false);

  async function handleData(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await user.createUser(email, password, username);
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

  return (
    <section className="w-10/12 mx-auto pt-20 pb-10 md:pt-10 mb-10">
      <div className="bg-primary px-4 py-2 mx-auto max-w-xl rounded-md">
        <h1 className="text-3xl font-terciary">
          Registre-se em Spider Burguer!
        </h1>
      </div>
      <div className="bg-white px-8 pb-8 pt-4 mx-auto rounded-lg shadow-lg w-full max-w-xl">
        <form onSubmit={handleData}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Seu nome"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Seu email"
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
