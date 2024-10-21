import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PokemonCard } from './PokemonCard';
import { Link } from 'react-router-dom';

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

export function PokemonGrid() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

      console.log(pokemonByTypeMinorDetails);
      setPokemons(pokemonByTypeMinorDetails);

      setIsLoading(false);
    };

    if (selectedType !== '') {

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

  return (
    <Main>
      <label>
        Filtre por tipo :
        <select value={selectedType} onChange={handleTypeChange}>
          <option value=""></option>
          <option value="1">Fogo</option>
          <option value="2">Agua</option>
          <option value="3">Psiquico</option>
        </select>
      </label>

      <Container>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            </Link>
          ))
        ) : (
          <p>sem pokémons!</p>
        )}
      </Container>

      {pokemons.length > 0 && (
        <button onClick={loadMorePokemons} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Carregar mais'}
        </button>
      )}
    </Main>
  );
}
const Main = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
`;

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
`;
