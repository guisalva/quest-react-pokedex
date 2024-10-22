import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme-context';

export function PokemonCard(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Card theme={theme}>
      <CardShadow className={props.pokemon.types[0]}></CardShadow>

      <CardHeader>
        <h4>{props.pokemon.id}</h4>
        <h4>{props.pokemon.name}</h4>
      </CardHeader>

      <div>
        <PokemonImg src={props.pokemon.sprite} alt="" />
      </div>

      <CardFooter>
        {props.pokemon.types.map((type) => (
          <PokemonTypeLabel key={type} className={`${type}`}>
            {type}
          </PokemonTypeLabel>
        ))}
      </CardFooter>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.surface};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  position: relative;
  z-index: -1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-transform: capitalize;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PokemonImg = styled.img`
  max-width: 140px;
  max-height: 130px;
`;

const PokemonTypeLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  padding: 2px 10px;
`;

const CardShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  border-radius: 10px 10px 50% 50%;
  z-index: -1;
`;
