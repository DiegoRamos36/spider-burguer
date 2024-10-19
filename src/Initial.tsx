import React from 'react';
import spiderman from './assets/spiderman.webp';
import { Item as Product } from './Cardapio';
import { Item } from './api/items';
import { useCart } from './hooks/useCart';
import CookieWarning from './components/CookieWarning';
import Loading from './components/Loading';
import { useNotification } from './hooks/useNotification';

const Initial = () => {
  const [searchedProduct, setSearchedProduct] = React.useState<Product>({
    desc: 'Pesquise algum item para vê-lo aqui.',
    id: 0,
    imgAlt: 'Ponto de interrogação',
    imgSrc:
      'https://blog.stoodi.com.br/wp-content/uploads/2024/03/ponto-de-interrogacao.webp',
    name: 'Item de Amostra',
    price: 0,
  });
  const [searchField, setSearchField] = React.useState('');
  const [products, setProducts] = React.useState<Product[] | null>();
  const { add } = useCart();
  const { fail, success } = useNotification();

  React.useEffect(() => {
    async function getItems() {
      const data = await Item.All();
      setProducts(data);
    }
    getItems();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchField === '') {
      return fail('Preencha o campo!');
    }
    const data = await Item.ByName(searchField);
    setSearchedProduct({
      desc: data.desc,
      id: data.id,
      imgAlt: data.imgAlt,
      imgSrc: data.imgSrc,
      name: data.name,
      price: data.price,
    });
    console.log(data);

    return success(`Item obtido com sucesso: ${data.name}`);
  }

  return (
    <section>
      <CookieWarning />
      {products ? (
        <section>
          <>
            <section className="bg-[url('./assets/bg-landingpage.webp')] bg-cover bg-center">
              <div className="flex h-max mx-auto w-10/12 ">
                <div className="my-auto w-full lg:text-left text-center ">
                  <h1 className="text-5xl text-white  ">
                    Onde o <span className="font-secondary">SABOR</span> e a{' '}
                    <span className="font-secondary">QUALIDADE</span> encontram{' '}
                    <span className="font-secondary">SUPERPODERES</span>
                  </h1>
                  <div className="flex lg:mx-0 text-white font-terciary mt-10 max-w-sm  justify-between mx-auto ">
                    <a
                      href="/cardapio"
                      className="font-terciary border border-primary rounded-xl px-3 md:py-1 md:text-xl text-lg mr-2 transition duration-100 ease-in hover:bg-primary hover:text-secondary"
                    >
                      VEJA NOSSO CARDÁPIO
                    </a>

                    <a
                      href="/cardapio"
                      className="font-terciary border border-primary bg-primary text-secondary rounded-xl px-3 md:py-1 text-lg md:text-xl md:mr-2    transition duration-100 ease-in hover:bg-transparent hover:text-primary"
                    >
                      {' '}
                      FAÇA UM PEDIDO
                    </a>
                  </div>
                </div>
                <img
                  src={spiderman}
                  alt="Homem-Aranha"
                  className="object-fill flex-grow hidden lg:block brightness-75"
                />
              </div>
            </section>

            <section className={`w-10/12 mx-auto my-10 `}>
              <h1
                className={`font-secondary text-secondary text-4xl lg:text-5xl mb-10`}
              >
                Ultimos Lançamentos
              </h1>

              <nav>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 ">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex flex-col shadow-lg py-4"
                    >
                      <img
                        className="rounded-ss-md rounded-se-md "
                        src={product.imgSrc}
                        alt={product.imgAlt}
                        width={600}
                        height={600}
                      />
                      <h2 className="font-secondary text-2xl mx-auto my-4">
                        {product.name}
                      </h2>
                      <p className="mx-2 min-h-12">{product.desc}</p>

                      <span className="flex items-center m-4 justify-between">
                        <button
                          onClick={() => add(product)}
                          className="bg-primary px-2 py-1 text-lg rounded-lg font-terciary"
                        >
                          Adicionar ao Carrinho
                        </button>

                        <p className="font-bold">R$ {product.price}</p>
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>

            <section className="bg-secondary pt-10  mt-10">
              <h2
                className={`font-secondary text-center text-white mx-auto text-4xl md:text-5xl`}
              >
                NÃO ENCONTROU O QUE PROCURAVA?
              </h2>

              <form
                className="flex mx-2 sm:w-10/12 sm:mx-auto mt-5"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="text-xl flex-grow pl-1 rounded-s-md"
                  onChange={({ target }) => setSearchField(target.value)}
                />
                <button
                  className={`bg-primary text-secondary text-2xl px-4 font-terciary`}
                  type="submit"
                >
                  Buscar
                </button>
              </form>

              <h4
                className={`font-terciary font-bold text-white w-10/12 text-4xl mx-auto my-10`}
              >
                Filtrando resultados por:{' '}
              </h4>
              <nav className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto w-10/12 pt-20 pb-10 md:pt-0">
                <li
                  key={searchedProduct.id}
                  className="flex flex-col shadow-md pb-4 rounded-lg bg-white"
                >
                  <img
                    className="rounded-se-lg"
                    src={searchedProduct.imgSrc}
                    alt={searchedProduct.imgAlt}
                  />
                  <h2 className="font-secondary text-2xl mx-auto my-4">
                    {searchedProduct.name}
                  </h2>
                  <p className="mx-2">{searchedProduct.desc}</p>

                  <span className="flex items-center m-4 justify-between">
                    <button
                      onClick={() =>
                        searchedProduct.price != 0 ? add(searchedProduct) : ''
                      }
                      className="bg-primary px-2 py-1 text-lg rounded-xl font-terciary"
                    >
                      Adicionar ao Carrinho
                    </button>

                    <p className="font-bold me-4">
                      {' '}
                      R$ {searchedProduct.price}
                    </p>
                  </span>
                </li>
              </nav>

              <nav className={`bg-white py-4`}>
                <h3
                  className={`font-secondary text-secondary text-5xl my-10 w-10/12 mx-auto`}
                >
                  VER TODOS OS PRODUTOS
                </h3>
                <ul
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-10/12`}
                >
                  {products &&
                    products.map((product) => (
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
              </nav>
            </section>
          </>
        </section>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Initial;
