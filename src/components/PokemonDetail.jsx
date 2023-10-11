import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Importa el componente Link

export const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonData(response.data);
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        }

        fetchData();
    }, [name]);

    if (!pokemonData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <div className="bg-blue-200 p-4 rounded-md text-center">
                    Cargando...
                </div>
            </div>
        );
    }

    const types = pokemonData.types.map((typeObj) => typeObj.type.name).join(', ');
    const stats = pokemonData.stats.map((stat) => (
        <div key={stat.stat.name}>
            <p>{stat.stat.name}: {stat.base_stat}</p>
        </div>
    ));
    const moves = pokemonData.moves.slice(0, 4).map((move, index) => (
        <div key={index}>
            <p>{move.move.name}</p>
        </div>
    ));
    const abilities = pokemonData.abilities.map((ability, index) => (
        <div key={index}>
            <p>{ability.ability.name}</p>
        </div>
    ));

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-blue-200 p-4 rounded-md text-center">
                {/* Botón de "Atrás" que redirige a la lista de Pokémon */}
                <Link to="/" className="text-3xl text-blue-500 hover:underline absolute top-4 left-4">&larr; Ver Todo</Link>

                <h1 className="text-3xl font-bold mb-4 bg-gray-800 text-white p-2 rounded">{name}</h1>
                <div className="bg-white p-6 rounded-md">
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-48 h-48 mx-auto mb-4" />
                </div>
                <p className="text-black-500 text-lg mb-4 text-black-100">Tipo: {types}</p>
                <h2 className="text-xl font-bold mb-2 bg-gray-800 text-blue-100">Stats:</h2>
                {stats}
                <h2 className="text-xl font-bold mb-2 bg-gray-800 text-blue-100">Movimientos:</h2>
                {moves}
                <h2 className="text-xl font-bold mb-2 bg-gray-800 text-blue-100">Habilidades:</h2>
                {abilities}
            </div>
        </div>
    );
};
