import { cookie } from '../api/cookie';
import { enderecos } from '../api/address';
import { Plus } from 'lucide-react';
import React from 'react';
import { DecodedPayload } from '../MyAccount';
import { jwtDecode } from 'jwt-decode';
import { useNotification } from '../hooks/useNotification';

interface FormData {
  nome: string;
  address: string;
  bairro: string;
  numero: string;
  reference: string;
  userId: number;
  padrao: boolean;
}

interface FormDataWithId extends FormData {
  id: number;
}

const Address = () => {
  const token = cookie.getAuthTokenFromCookie();
  const { id }: DecodedPayload = jwtDecode(token!);
  const [modal, openModal] = React.useState(false);
  const [address, setAddress] = React.useState<FormDataWithId[] | []>([]);
  const [formData, setFormData] = React.useState<FormData>({
    nome: '',
    address: '',
    bairro: '',
    numero: '',
    reference: '',
    padrao: false,
    userId: id,
  });

  const { success, fail } = useNotification();

  React.useEffect(() => {
    async function getAddress() {
      const data = await enderecos.get(id);
      setAddress(data);
    }
    getAddress();
  }, [id, address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData || Object.keys(formData).length === 0) {
      console.error('Formulário vazio ou incompleto.');
      return;
    }

    try {
      const data = await enderecos.create(formData);
      if (data.error) {
        fail('Erro ao adicionar endereço:' + data.error);
      }
      success('Endereço adicionado com sucesso');
      openModal(false);
    } catch (error) {
      fail('Erro ao enviar dados:' + error);
    }
  }

  async function handleClick(target: number) {
    try {
      const data = await enderecos.remove(target);
      success(`Endereço removido com sucesso! ${data}!`);
    } catch (error) {
      fail(error instanceof Error ? error.message : 'Erro Desconhecido');
    }
  }

  async function definirPadrao(addressId: number) {
    const data = await enderecos.setDefault(id, addressId);
    success(`Endereço: ${data.nome} definido como padrão!`);
  }

  return (
    <section className=" pt-10 mt-10 mb-10 pb-10 lg:pt-0 lg:mt-5 lg:my-10">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-10/12 mx-auto ">
        {address
          ? address.map((endereco, index) => (
              <li
                key={index}
                className="flex flex-col justify-between border pb-4 shadow"
              >
                {endereco.padrao ? (
                  <p className="py-2 mb-2 bg-secondary text-xl text-white font-terciary text-center">
                    Endereço de envio padrão
                  </p>
                ) : (
                  ''
                )}
                <div
                  className={`flex-grow px-4 ${endereco.padrao ? '' : 'pt-4'}`}
                >
                  <h2 className="font-bold">{endereco.nome}</h2>
                  <p>{endereco.address}</p>
                  <p>{endereco.bairro}</p>
                  <p>{endereco.numero}</p>
                  <p>{endereco.reference}</p>
                </div>
                <div className="flex justify-between mt-6 px-4">
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => definirPadrao(endereco.id)}
                  >
                    Definir Padrão
                  </button>
                  <p>|</p>
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => handleClick(endereco.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          : ''}
        <div
          className="border rounded flex justify-center cursor-pointer items-center py-2"
          onClick={() => openModal(true)}
        >
          <Plus width={50} height={200} className="text-secondary" />
        </div>
      </ul>
      {modal ? (
        <div className="fixed top-0 bg-black bg-opacity-50 w-full min-h-screen flex flex-col gap-10 items-center justify-center z-50 ">
          <form
            className="flex flex-col p-4 bg-white font-terciary rounded text-2xl"
            onSubmit={handleSubmit}
          >
            <label htmlFor="nome">Nome </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="mb-4 border border-black rounded font-sans text-lg px-2"
              placeholder="ex: Diego"
              onChange={handleChange}
            />
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              className="mb-4 border border-black rounded font-sans text-lg px-2"
              placeholder="ex: Avenida Sobe e desce"
              onChange={handleChange}
            />
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              className="mb-4 border border-black rounded font-sans text-lg px-2"
              placeholder="ex: Desaparece"
              onChange={handleChange}
            />
            <label htmlFor="numero">Numero </label>
            <input
              type="text"
              id="numero"
              name="numero"
              className="mb-4 border border-black rounded font-sans text-lg px-2"
              placeholder="ex: 1180"
              onChange={handleChange}
            />
            <label htmlFor="reference">Ponto de Referência </label>
            <input
              type="text"
              id="reference"
              name="reference"
              className="mb-4 border border-black rounded font-sans text-lg px-2"
              placeholder="ex: Mercado do Tião"
              onChange={handleChange}
            />

            <div className="flex justify-between gap-10">
              <button
                type="submit"
                className="bg-primary px-2 py-1 font-terciary text-lg rounded"
              >
                Adicionar novo endereço
              </button>
              <p
                onClick={() => openModal(false)}
                className="font-sans text-lg border-2 px-2 py-1 rounded cursor-pointer"
              >
                agora não
              </p>
            </div>
          </form>
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default Address;
