import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';
import styled from 'styled-components';
import PokedexIcon from '../assets/Pokedex-logo.png';

export function Header() {
  const { theme } = useContext(ThemeContext)

  return (
    <HeaderContainer theme={theme}>
      <Logo src={PokedexIcon} alt="" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 80px;

  @media (max-width: 1024px) {
    height: 60px;
  }
`