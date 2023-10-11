import React from 'react';
import { Routes, Route, BrowserRouter,  } from 'react-router-dom';
import App from '../App';
import { PokemonDetail } from '../components/PokemonDetail';

const Router = () => {
  return (
    <div>
     <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>} />
        {/* Define la ruta dinámica para los detalles del Pokémon */}
        <Route path="/pokemon/:name" element={<PokemonDetail/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
};

export default Router;


