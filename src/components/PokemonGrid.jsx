import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PokemonCard } from './PokemonCard';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/theme-context';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Loading } from './Loading';
import { CustomSelect } from './CustomSelect';
import noPokemons from '../assets/error404-no-bg.png';

const fetchPokemons = async (limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
      params: { limit, offset },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar pokémons:', error);
    return [];
  }
};

const fetchPokemonMinorDetails = async (url) => {
  try {
    const response = await axios.get(url);
    const { id, name, types, sprites } = response.data;

    return {
      id,
      name,
      types: types.map((typeInfo) => typeInfo.type.name),
      sprite: sprites.other['official-artwork'].front_default,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do pokémon:', error);
    return null;
  }
};

const fetchPokemonsByType = async (type) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    return response.data.pokemon;
  } catch (error) {
    console.error('Erro ao buscar os pokémons por tipo:', error);
    return null;
  }
};

const pokemonsTypeArray = [
  'none',
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'unknown',
];

export function PokemonGrid() {
  const { theme } = useContext(ThemeContext);

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(pokemonsTypeArray[0]);

  useEffect(() => {
    const loadInitialPokemons = async () => {
      setIsLoading(true);

      const initialPokemons = await fetchPokemons();
      const pokemonMinorDetails = await Promise.all(
        initialPokemons.map((pokemon) => fetchPokemonMinorDetails(pokemon.url))
      );
      setPokemons(pokemonMinorDetails);

      setIsLoading(false);
    };

    const loadPokemonsByType = async () => {
      setIsLoading(true);

      const pokemonsByType = await fetchPokemonsByType(selectedType);
      const pokemonByTypeMinorDetails = await Promise.all(
        pokemonsByType.map((pokemon) => fetchPokemonMinorDetails(pokemon.pokemon.url))
      );

      setPokemons(pokemonByTypeMinorDetails);
      setIsLoading(false);
    };

    if (selectedType !== 'none') {
      loadPokemonsByType();
    } else {
      loadInitialPokemons();
    }
  }, [selectedType]);

  const loadMorePokemons = async () => {
    if (isLoading) return;

    const currentScrollY = window.scrollY;
    setIsLoading(true);

    const newPokemons = await fetchPokemons(10, page * 10);
    const pokemonMinorDetails = await Promise.all(
      newPokemons.map((pokemon) => fetchPokemonMinorDetails(pokemon.url))
    );

    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonMinorDetails]);
    setPage((prevPage) => prevPage + 1);

    setIsLoading(false);
    window.scrollTo(0, currentScrollY);
  };

  const handleTypeChange = (selectedType) => {
    setSelectedType(selectedType);
  };

  return (
    <Main theme={theme}>
      {isLoading && <Loading isOverlay={true} />}

      <Container>
        <Buttons theme={theme}>
          <label>
            Filter by type :
            <CustomSelect options={pokemonsTypeArray} onSelect={handleTypeChange} />
          </label>
          <ThemeToggleButton />
        </Buttons>

        <Grid>
          {pokemons.length > 0 ? (
            pokemons.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              </Link>
            ))
          ) : (
            <PokemonError theme={theme}>
              <h3>No Pokemons!</h3>
              <img src={noPokemons} />
            </PokemonError>
          )}
        </Grid>

        {pokemons.length > 0 && (
          <LoadButton theme={theme} onClick={loadMorePokemons} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </LoadButton>
        )}
      </Container>
    </Main>
  );
}

const Main = styled.main`
  background-color: ${(props) => props.theme.background};
  transition: background 0.3s ease;
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    font-size: 14px;
    color: ${(props) => props.theme.colorOnBackground};
    transition: color 0.3s ease;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: auto;
  z-index: 1;

  & a {
    transition: transform 0.3s ease;
  }

  & a:hover {
    transform: scale(1.07);
  }

  @media (min-width: 401px) and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 641px) and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 801px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const LoadButton = styled.button`
  align-self: center;
  padding: 5px 15px;
  margin-top: 10px;
  color: ${(props) => props.theme.primary};
  border: 2px solid ${(props) => props.theme.primary};
  background-color: transparent;
  border-radius: 20px;
  font-weight: 600;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colorOnPrimary};
    background-color: ${(props) => props.theme.primary};
    transform: scale(1.1);
  }
`;

const PokemonError = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  color: ${(props) => props.theme.colorOnBackground};
`;
