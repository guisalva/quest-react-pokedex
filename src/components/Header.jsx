import styled, { css } from 'styled-components';
import { ThemeToggleButton } from './ThemeToggleButton'

export function Header() {
  return (
    <HeaderContainer>
      <h1>Pokédex</h1>

      <label>
        Procure um pokemon :
        <input type="text" />
      </label>

      <label>
        Filtre por tipo :
        <select>
          <option value=""></option>
          <option value="">Fogo</option>
          <option value="">Agua</option>
          <option value="">Psiquico</option>
        </select>
      </label>

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
