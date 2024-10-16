import { Item } from '@/Cardapio';
import { useNotification } from '../hooks/useNotification';
import React, { createContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import { useLoad } from '../hooks/useLoad';

interface CartContextType extends CartActions {
  cart: Item[];
  pay: (cart: Item[], userId: string, coupon: string | null) => void;
  total: () => number | undefined;
}

interface CartActions {
  add: (product: Item) => void;
  remove: (id: number) => void;
  removeAll: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<Item[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { load, loaded } = useLoad();

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const { success, fail } = useNotification();

  const stripePromise = loadStripe(
    'pk_test_51PUr9d08aOJQRyzVMjKo97S0EcCoqhDqIB0VnWGLLR5MWtnrZl7DUGSDMhPteA7u2q5QGTKQYuMFb4PRMYW8h2Y000DotsSKj5',
  );

  async function pay(cart: Item[], userId: string, coupon: string | null) {
    load();
    const stripe = await stripePromise;

    const body = {
      products: cart,
      userId,
      coupon,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      'http://localhost:8081/create-checkout-session',
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      fail('Erro ao criar a sessão de checkout.');
      return;
    }

    const session = await response.json();
    setCart([]);
    loaded();

    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (result && result.error) {
      console.error(result.error);
    } else if (!result) {
      fail('Erro ao redirecionar para o checkout. Result é indefinido.');
    }
  }

  function total() {
    let total = 0;
    if (cart) {
      for (let index = 0; index < cart.length; index++) {
        total += cart[index].price;
      }
      return Math.round(total);
    }
  }

  function add(product: Item) {
    setCart([...cart, product]);
    success('Item adicionado ao carrinho!');
  }

  function remove(id: number) {
    if (cart) {
      const indexToRemove = cart.findIndex((item) => item.id === id);
      if (indexToRemove !== -1) {
        const removedItem = cart.splice(indexToRemove, 1)[0];
        success(`Item: ${removedItem.name} removido com sucesso`);
        setCart([...cart]);
      }
    }
  }

  function removeAll() {
    setCart([]);
    success('Todos os itens removidos com sucesso!');
  }

  return (
    <CartContext.Provider value={{ cart, pay, total, add, remove, removeAll }}>
      {children}
    </CartContext.Provider>
  );
};
