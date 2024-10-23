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

      <div className="pokemon-types">
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

  @media (max-width: 320px) {
    img {
      max-height: 300px;
    }
  }

  @media (min-width: 321px) and (max-width: 424px) {
    margin: 0 auto;

    img {
      max-height: 300px;
    }
  }

  @media (min-width: 425px) and (max-width: 767px) {
    gap: 10px;

    img {
      max-height: 320px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    height: 90vh;
    margin: 0 auto;

    img {
      max-height: 350px;
    }
  }

  @media (max-width: 1023px) {
    margin: 0 auto;
    height: 95vh;

    .pokemon-types {
      padding-bottom: 20px;
    }
  }
`;
