import React from 'react';
import { Item } from './api/items';
import { useCart } from './hooks/useCart';
import { useLoad } from './hooks/useLoad';
import Loading from './components/Loading';

export type Item = {
  desc: string;
  id: number;
  imgAlt: string;
  imgSrc: string;
  name: string;
  price: number;
};

const Cardapio = () => {
  const [products, setProducts] = React.useState<Item[] | null>();
  const { add } = useCart();
  const { isLoading } = useLoad();

  async function getItem() {
    const data = await Item.All();
    setProducts(data);
  }

  React.useEffect(() => {
    getItem();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section>
      {products ? (
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto w-10/12">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col shadow-md py-4 rounded-ss-xl rounded-se-xl"
            >
              <img
                className="rounded-ss-xl rounded-se-xl"
                src={product.imgSrc}
                alt={product.imgAlt}
              />
              <h2 className="font-secondary text-2xl mx-auto my-4">
                {product.name}
              </h2>
              <p className="mx-2">{product.desc}</p>

              <span className="flex items-center m-4 justify-between">
                <button
                  onClick={() => add(product)}
                  className="bg-primary px-2 py-1 text-lg rounded-xl font-terciary"
                >
                  Adicionar ao Carrinho
                </button>

                <p className="font-bold">R$ {product.price}</p>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Cardapio;
