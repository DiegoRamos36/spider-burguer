import React from 'react';
import logo from '../assets/logo2.png';

const Loading = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100; // Garante que atinge 100% ao final
        }
        return prev + 10; // Ajuste a incrementação conforme necessário
      });
    }, 100); // 2000ms / 20 (para 20 incrementos de 5%)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 bg-black bg-opacity-50 w-full min-h-screen flex flex-col gap-10 items-center justify-center z-50 ">
      <img src={logo} alt="Logo Spider Burguer" width={250} />

      <div className="w-1/4 bg-gray-200 rounded-lg h-4">
        <div
          className="bg-blue-500 h-full rounded-lg transition-all duration-1000"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
