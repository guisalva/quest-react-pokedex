import styled from 'styled-components';
import { Header } from '../components/Header';
import { PokemonGrid } from '../components/PokemonGrid';

export function Home() {

  return (
    <Main>
      <Header />
      <PokemonGrid />
    </Main>
  );
};

const Main = styled.main`
  height: 100%;
`