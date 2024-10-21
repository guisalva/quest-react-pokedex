import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PokemonOverview } from '../components/PokemonOverview';
import { PokemonInfo } from '../components/PokemonInfo';

const fetchPokemonDetails = async (id) => {
  try {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = response.data;

    response = await Promise.all(
      pokemon.abilities.map(async (abilityObj) => {
        const abilityURL = abilityObj.ability.url;
        const abilityResponse = await axios.get(abilityURL);

        const abilities = abilityResponse.data;
        const abilityDescription = abilities.effect_entries.find(
          (entry) => entry.language.name === 'en'
        )?.effect;

        return {
          ...abilityObj,
          ability: {
            ...abilityObj.ability,
            description: abilityDescription || 'No description available',
          },
        };
      })
    );
    const abilitiesWithDesc = response;

    return {
      ...pokemon,
      abilities: abilitiesWithDesc,
    };
  } catch (error) {
    console.error('Erro ao buscar os detalhes do pokémon:', error);
    return null;
  }
};

export function Pokemon() {
  const [pokemon, setPokemon] = useState(null); // Alterado para null inicialmente
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);

      const pokemonData = await fetchPokemonDetails(id);
      console.log(pokemonData);
      setPokemon(pokemonData);
      setIsLoading(false);
    };
    getPokemon();
  }, [id]);

  if (isLoading) return <p>Carregando...</p>;

  if (!pokemon) return <p>Nenhum pokémon encontrado!</p>;

  return (
    <Main>
      <BackgroundArt>
        <div></div>
      </BackgroundArt>

      <PokemonOverview pokemon={pokemon} />
      <PokemonInfo pokemon={pokemon} />
    </Main>
  );
}

const Main = styled.main`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const BackgroundArt = styled.div`
  position: absolute;
  top: 0;
  left: 48%;
  width: 100vw;
  height: 105vh;
  background-color: #ff0000;
  transform: rotate(2deg);
  transform-origin: center;
  z-index: -100;

  div {
    position: absolute;
    top: 0;
    left: 3%;
    width: 100vw;
    height: 105vh;
    background-color: #cc0000;
    z-index: -99;
  }
`;
