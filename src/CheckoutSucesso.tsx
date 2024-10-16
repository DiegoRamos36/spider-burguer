import React from 'react';
import deliveryman from './assets/entregador.png';

const CheckoutSucesso = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [deliveryman, deliveryman, deliveryman, deliveryman];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="w-10/12 mx-auto my-10">
      <h1 className="text-5xl font-secondary">Seu pedido está a caminho...</h1>
      <div className="flex gap-2 my-10">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Homem aranha entregador ${index + 1}`}
            width={350}
            className={`transition-opacity duration-1000 -scale-x-100 ease-in-out  ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <h2 className="text-5xl font-secondary text-center mt-10">
        Obrigado por sua confiança !!!
      </h2>
    </div>
  );
};

export default CheckoutSucesso;
