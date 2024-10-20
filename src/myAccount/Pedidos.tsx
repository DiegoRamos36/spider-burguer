import { DecodedPayload } from '../components/header';
import { Order } from '../api/order';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { cookie } from '../api/cookie';
import { Item } from '../Cardapio';
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
        <section className="sm:w-10/12 mx-4 sm:mx-auto  mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            {pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="flex flex-col  border-2 shadow-lg  p-4  rounded-lg justify-between"
              >
                <div className="flex justify-between mb-4 font-bold text-lg">
                  <p>{inverterData(limparData(pedido.createdAt))}</p>
                  <p>R$ {pedido.amountTotal / 100}</p>
                </div>
                <div className="flex flex-col flex-grow gap-4 md:gap-2 ">
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
                <div className="flex justify-between py-4">
                  <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                    Ajuda
                  </button>
                  <button className="bg-primary text-secondary font-terciary px-2 rounded-sm text-lg">
                    Reportar problema
                  </button>
                </div>
              </li>
            ))}
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Pedidos;
