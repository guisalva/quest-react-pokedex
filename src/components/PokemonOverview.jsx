import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext, themes } from '../contexts/theme-context';

export function PokemonOverview(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Container theme={theme}>
      <h1>{props.pokemon.name}</h1>

      <img
        src={props.pokemon.sprites.other['official-artwork'].front_default}
        alt={props.pokemon.name}
      />

      <div>
        {props.pokemon.types.map((typeInfo, index) => (
          <p key={index} className={`${typeInfo.type.name}`}>
            {typeInfo.type.name}
          </p>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;

  h1 {
    text-transform: capitalize;
    font-size: 32px;
    color: ${(props) => props.theme.colorOnBackground};
  }

  p {
    padding: 5px 15px;
    border-radius: 20px;
  }

  div {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    gap: 20px;
  }
`;
