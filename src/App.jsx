import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [tiposDePokemon, setTiposDePokemon] = useState([]); // Define los tipos de Pokémon
  const { name } = useParams();
  const [filtroActivo, setFiltroActivo] = useState(null); // Agrega el estado para el filtro activo

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
        const pokemonList = response.data.results;

        const pokemonDataWithAbilities = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            const types = detailsResponse.data.types.map((typeInfo) => typeInfo.type.name);
            const abilities = detailsResponse.data.abilities.map((abilityInfo) => abilityInfo.ability.name);
            return {
              name: pokemon.name,
              imageUrl: detailsResponse.data.sprites.front_default,
              types: types,
              abilities: abilities,
            };
          })
        );

        setPokemonData(pokemonDataWithAbilities);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    }

    // Define los tipos de Pokémon
    setTiposDePokemon([
      "grass",
      "fire",
      "water",
      "bug",
      "normal",
      "poison",
      "electric",
      "ground",
      // Agrega más tipos de Pokémon según tus necesidades
    ]);

    fetchData();
  }, []);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Función para cambiar el filtro activo
  const cambiarFiltro = (tipo) => {
    setFiltroActivo(tipo);
  };

  // Filtra los Pokémon basados en el tipo seleccionado
  const pokemonFiltrado = filtroActivo
    ? pokemonData.filter((pokemon) => pokemon.types.includes(filtroActivo))
    : pokemonData;

  return (
    <div className="bg-gray-800 font-sans">
      <h1 className="text-2xl font-bold text-center text-blue-100">Pokémon List {name}</h1>
      <Navbar tiposDePokemon={tiposDePokemon} filtroActivo={filtroActivo} cambiarFiltro={cambiarFiltro} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonFiltrado.map((pokemon, index) => (
          <li
            key={index}
            className="p-4 border border-gray-300 rounded-lg transition-transform transform hover:scale-105 bg-blue-100"
            onClick={() => handlePokemonClick(pokemon)}
          >
            <Link to={`/pokemon/${pokemon.name}`}>
              <div className="text-center">
                <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32 mx-auto" />
                <p className="mt-2 bg-gray-900 text-white p-2 rounded">Name: {pokemon.name}</p>
                <p className="text-black-500">Type: {pokemon.types.join(', ')}</p>
                <p className="text-blue-500">Skills: {pokemon.abilities.join(', ')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center">{selectedPokemon.name} Details</h2>
          <div className="text-center">
            <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} className="w-64 h-64 mx-auto" />
          </div>
          <p className="text-center">Type: {selectedPokemon.types.join(', ')}</p>
          <p className="text-center">Skills: {selectedPokemon.abilities.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
