import styled from 'styled-components';
import { Header } from '../components/Header';
import { PokemonGrid } from '../components/PokemonGrid';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

export function Home() {
  const { theme } = useContext(ThemeContext)

  return (
    <Main theme={theme}>
      <Header />
      <PokemonGrid />
    </Main>
  );
};

const Main = styled.main`
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  transition: background 0.3s ease;
`