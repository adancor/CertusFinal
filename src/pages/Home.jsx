// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ pokemonList }) => {
  return (
    <div>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
