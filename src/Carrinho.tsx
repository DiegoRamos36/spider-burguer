import { CircleArrowRight, Trash2 } from 'lucide-react';
import React from 'react';
import { useCart } from './hooks/useCart';
import { Item } from '@/Cardapio';
import { cookie } from './api/cookie';
import { DecodedPayload } from './MyAccount';
import { jwtDecode } from 'jwt-decode';
import Loading from './components/Loading';

const Carrinho = () => {
  const { pay, remove, removeAll, total, cart } = useCart();
  const [coupon, setCoupon] = React.useState<string | null>(null);
  const token = cookie.getAuthTokenFromCookie();
  const { id }: DecodedPayload = jwtDecode(token!);
  const userId = String(id);

  return (
    <section>
      {cart ? (
        <ul className="w-10/12 mx-auto my-10 flex flex-col gap-4">
          {cart &&
            cart.map((item: Item, index) => (
              <li
                className="flex justify-around items-center border-2 border-black px-4 font-terciary text-2xl"
                key={index}
              >
                <p>1</p>
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={180}
                  height={180}
                />
                <p>{item.name}</p>
                <p>-</p>
                <p>{item.price}</p>
                <p
                  onClick={() => remove(item.id)}
                  className="border-2 rounded-full border-red-600 p-2 cursor-pointer transition ease duration-300 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 width={28} height={28} />
                </p>
              </li>
            ))}
          <form
            className="flex justify-between"
            onSubmit={(event: React.FormEvent) => {
              event.preventDefault();
              pay(cart, userId, coupon);
            }}
          >
            <p
              onClick={() => removeAll()}
              className="bg-primary p-2 rounded-lg font-terciary text-xl"
            >
              Limpar
            </p>

            <button
              type="submit"
              className="bg-primary p-2 rounded-lg font-terciary text-xl flex gap-2"
            >
              Finalizar Compra <CircleArrowRight />
            </button>

            <div className="flex items-center">
              <label>
                <input
                  type="text"
                  placeholder="Cupom"
                  className="border p-2 text-xl"
                  onChange={({ target }) => setCoupon(target.value)}
                />
              </label>

              <p className="bg-primary border-primary border p-2 font-terciary text-xl">
                Total: {total()}
              </p>
            </div>
          </form>
        </ul>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Carrinho;
