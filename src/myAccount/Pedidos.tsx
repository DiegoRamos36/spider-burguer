import { DecodedPayload } from '../components/header';
import { Order } from '../api/order';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { cookie } from '../api/cookie';
import { Item } from '../Cardapio';
import Loading from '../components/Loading';
import { limparData } from '../functions/limparData';
import { inverterData } from '../functions/inverterData';

type InformacaoDoPedido = {
  amountTotal: number;
  coupon: string | null;
  createdAt: Date;
  currency: 'brl';
  id: number;
  produtos: ItensDoPedido[];
  sessionId: string;
  userId: number;
};

type ItensDoPedido = {
  id: number;
  pedidoId: number;
  produto: Item;
  produtoId: number;
  quantity: number;
};

const Pedidos = () => {
  const token: string | null = cookie.getAuthTokenFromCookie();
  const { id }: DecodedPayload = jwtDecode(token!);
  const [pedidos, setPedidos] = React.useState<InformacaoDoPedido[]>([]);

  React.useEffect(() => {
    async function obterPedidos() {
      const data = await Order.get(id);
      setPedidos(data);
    }
    obterPedidos();
  }, [id]);

  return (
    <>
      {pedidos.length > 0 ? (
        <section className="w-10/12 mx-auto my-10">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {pedidos.reverse().map((pedido) => (
              <li
                key={pedido.id}
                className="flex flex-col border-2 shadow-lg p-4  rounded-lg justify-between"
              >
                <div className="flex justify-between mb-4 font-bold text-lg">
                  <p>{inverterData(limparData(pedido.createdAt))}</p>
                  <p>R$ {pedido.amountTotal / 100}</p>
                </div>
                <div className="flex flex-col flex-grow gap-2 ">
                  {pedido.produtos.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-xl font-terciary"
                    >
                      <img
                        src={item.produto.imgSrc}
                        alt={item.produto.imgAlt}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <p>-</p>
                      <p>{item.produto.name}</p>
                      <p>-</p>
                      <p>{item.quantity}</p>
                    </li>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <button className="bg-primary text-secondary font-terciary px-2 rounded-md text-lg">
                    Ajuda
                  </button>
                  <button className="bg-primary text-secondary font-terciary px-2 rounded-md text-lg">
                    Reportar problema
                  </button>
                </div>
              </li>
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Pedidos;
