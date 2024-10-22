import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PokemonCard } from './PokemonCard';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/theme-context';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Loading } from './Loading';

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
  const [selectedType, setSelectedType] = useState('');

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

    if (selectedType != 0) {
      loadPokemonsByType();
    } else {
      loadInitialPokemons();
    }
  }, [selectedType]);

  const loadMorePokemons = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const newPokemons = await fetchPokemons(10, page * 10);
    const pokemonMinorDetails = await Promise.all(
      newPokemons.map((pokemon) => fetchPokemonMinorDetails(pokemon.url))
    );
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonMinorDetails]);
    setPage((prevPage) => prevPage + 1);

    setIsLoading(false);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Main theme={theme}>
      <Container>
        <Buttons theme={theme}>
          <label>
            Filter by type :
            <TypeSelect theme={theme} value={selectedType} onChange={handleTypeChange}>
              {pokemonsTypeArray.map((type, index) => (
                <option key={index} value={index}>
                  {type}
                </option>
              ))}
            </TypeSelect>
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
            <p>sem pokémons!</p>
          )}
        </Grid>

        {pokemons.length > 0 && (
          <LoadButton theme={theme} onClick={loadMorePokemons} disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Carregar mais'}
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
  align-items: start;

  label {
    font-size: 14px;
    color: ${(props) => props.theme.colorOnBackground};
    transition: color 0.3s ease;
  }
`;

const TypeSelect = styled.select`
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.colorOnBackground};
  margin-left: 10px;
  padding: 2px 5px;
  border-radius: 4px;

  &:focus-visible {
    outline: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  z-index: 1;

  & a {
    transition: transform 0.3s ease;
  }

  & a:hover {
    transform: scale(1.07);
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
