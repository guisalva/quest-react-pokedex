import styled from 'styled-components';
import { ThemeToggleButton } from './ThemeToggleButton'

export function Header() {
  return (
    <HeaderContainer>
      <h1>Pokédex</h1>

      <ThemeToggleButton />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ff0000;
  color: #fff;
  padding: 20px;
`;