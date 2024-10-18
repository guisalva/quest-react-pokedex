import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
      sprite: sprites.other.dream_world.front_default,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do pokémon:', error);
    return null;
  }
};

export function PokemonGrid() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInitialPokemons = async () => {
      setIsLoading(true);

      const initialPokemons = await fetchPokemons();
      const pokemonMinorDetails = await Promise.all(
        initialPokemons.map(pokemon => fetchPokemonMinorDetails(pokemon.url))
      )
      setPokemons(pokemonMinorDetails);

      console.log(pokemons)

      setIsLoading(false);
    };
    loadInitialPokemons();
  }, []);

  const loadMorePokemons = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const newPokemons = await fetchPokemons(10, page * 10);
    const pokemonMinorDetails = await Promise.all(
      newPokemons.map(pokemon => fetchPokemonMinorDetails(pokemon.url))
    );
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonMinorDetails]);
    setPage((prevPage) => prevPage + 1);

    setIsLoading(false);
  };

  return (
    <Main>
      <Container>
        {pokemons.length > 0 ? (
          pokemons.map(pokemon => (
            <Item key={pokemon.id}>
              <h5>{pokemon.id}</h5>
              <h3>{pokemon.name}</h3>
              <img style={{ maxWidth: '100px', maxHeight: '110px'}} src={pokemon.sprite} alt="" />

              {pokemon.types.map(type => (
                <p key={type}
                  className={`${type}`}
                >{type}</p>
              )
              )}
            </Item>)
          )
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
`;

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  padding: 20px;
`;

const Item = styled.div`
  background-color: #ececec;
  color: #000;
  width: 100%;
  height: 200px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
`;
