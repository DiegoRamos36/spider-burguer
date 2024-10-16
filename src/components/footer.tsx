import spiderLogo from '../assets/logo-spider.png';

const Footer = () => {
  return (
    <footer className={`bg-primary py-4`}>
      <div className="w-10/12 mx-auto grid grid-cols-2 lg:flex lg:gap-10">
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">
            Spider Burguer
          </h2>
          <p className="font-sans text-stone-600 leading-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi
            harum ab rem neque quaerat qui repellendus ullam a provident.
          </p>
        </div>
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">
            Aqui é o seu lar
          </h2>
          <p className="font-sans text-stone-600 leading-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
            mollitia id in aspernatur deleniti voluptatem voluptas magnam nemo
            ab cum?
          </p>
        </div>
        <div>
          <h2 className="text-stone-950 text-2xl font-terciary">Registre-se</h2>
          <p className="font-sans text-stone-600 leading-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
            tenetur id ipsum autem. At earum consequuntur optio eveniet ullam
            illum!
          </p>
        </div>
      </div>
      <p className="w-10/12 mx-auto mt-10 h-0.5 bg-stone-900"></p>
      <div className="w-10/12 mx-auto flex items-center justify-between">
        <img src={spiderLogo} alt="Logo Spider" width={100} />
        <div>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/login'}
          >
            Logar
          </a>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/register'}
          >
            Registrar
          </a>
          <a
            className=" font-terciary text-2xl text-stone-950 inline-block mx-10 underline transition ease-in duration-100 hover:text-slate-600  "
            href={'/carrinho'}
          >
            Carrinho
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
