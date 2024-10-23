import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme-context';
import { PokemonOverview } from '../components/PokemonOverview';
import { PokemonInfo } from '../components/PokemonInfo';
import { Loading } from '../components/Loading';
import { NotFound } from '../components/NotFound';

const fetchPokemonDetails = async (id) => {
  try {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = response.data;

    response = await Promise.all(
      pokemon.abilities.map(async (abilityObj) => {
        const abilityURL = abilityObj.ability.url;
        const abilityResponse = await axios.get(abilityURL);

        const abilities = abilityResponse.data;
        // Tentar obter o "effect_entries" primeiro
        let abilityDescription = abilities.effect_entries.find(
          (entry) => entry.language.name === 'en'
        )?.effect;

        // Se não encontrar no "effect_entries", tentar o "flavor_text_entries"
        if (!abilityDescription) {
          abilityDescription = abilities.flavor_text_entries.find(
            (entry) => entry.language.name === 'en'
          )?.flavor_text;
        }

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

  const [pokemon, setPokemon] = useState(null);
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

  if (isLoading) return <Loading isOverlay={false} />;

  if (!pokemon) return <NotFound />;

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

  @media (max-width: 1023px) {
    flex-direction: column;
    height: auto;
    padding: 20px 10px;
  }
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

  @media (max-width: 1023px) {
    top: 95vh;
    left: 0;
    transform: rotate(0);
    height: 100%;

    div {
      height: 100%;
    }
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
