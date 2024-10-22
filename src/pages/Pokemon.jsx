import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PokemonOverview } from '../components/PokemonOverview';
import { PokemonInfo } from '../components/PokemonInfo';
import { ThemeContext } from '../contexts/theme-context';

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
  const { theme } = useContext(ThemeContext);

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
    <Main theme={theme}>
      <Link to="/">
        <ReturnButton theme={theme}>Return</ReturnButton>
      </Link>

      <BackgroundArt theme={theme}>
        <div></div>
      </BackgroundArt>

      <PokemonOverview pokemon={pokemon} />
      <PokemonInfo pokemon={pokemon} />
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  transition: background 0.3s ease;
  z-index: 1;
`;

const BackgroundArt = styled.div`
  position: absolute;
  top: 0;
  left: 48%;
  width: 100vw;
  height: 105vh;
  background-color: ${(props) => props.theme.secondary};
  transform: rotate(2deg);
  transform-origin: center;
  z-index: -1;

  div {
    position: absolute;
    top: 0;
    left: 3%;
    width: 100vw;
    height: 105vh;
    background-color: ${(props) => props.theme.primary};
    z-index: -2;
  }
`;

const ReturnButton = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  margin: 5px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 20px;
  z-index: 10;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.colorOnPrimary};
    transform: scale(1.1);
  }
`;
