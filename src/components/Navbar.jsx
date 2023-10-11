import React from 'react';

export const Navbar = ({ tiposDePokemon, filtroActivo, cambiarFiltro }) => {
  return (
    <div className="mb-4 flex justify-center">
      <ul className="flex space-x-4">
        <li
          className={`cursor-pointer ${filtroActivo === null ? 'font-bold' : ''} text-lg text-blue-500`}
          onClick={() => cambiarFiltro(null)}
        >
          Todos
        </li>
        {tiposDePokemon.map((tipo) => (
          <li
            key={tipo}
            className={`cursor-pointer ${filtroActivo === tipo ? 'font-bold' : ''} text-lg text-blue-500`}
            onClick={() => cambiarFiltro(tipo)}
          >
            {tipo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;

