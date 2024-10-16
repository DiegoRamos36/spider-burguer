import React from 'react';

type PatchNotes = {
  data: string;
  desc: string;
};

const Info = () => {
  const notes: PatchNotes[] = [
    {
      data: '02 de Outubro de 2024',
      desc: 'Adicionei essa área de informações pro usuário ficar sempre atualizado com as novidades da Equipe Spider Burguer.',
    },
    {
      data: '01 de Outubro de 2024',
      desc: 'Área de pedidos em andamento, API modificada para incluir todo o sistema de pedidos.',
    },
    {
      data: '24 de Setembro de 2024',
      desc: 'Área de cupons finalizada.',
    },
    {
      data: '23 de Setembro de 2024',
      desc: 'Nova API de cupom.',
    },
    {
      data: '1-16 de outubro de 2024',
      desc: 'Área de pagamentos reformulada, sistema de cupons na carteira removido. Cupons promocionais adicionados e interface modificada.',
    },
  ];
  return (
    <ul className="flex flex-col gap-4  w-10/12 mx-auto my-10">
      {notes.map((note, index) => (
        <li key={index} className="mx-2">
          <h2 className="font-bold text-xl">{note.data}</h2>
          <p>{note.desc}</p>
        </li>
      ))}
    </ul>
  );
};

export default Info;
