import styled from 'styled-components';

export function PokemonOverview(props) {
  return (
    <Container>
      <h1>{props.pokemon.name}</h1>
      <img
        src={props.pokemon.sprites.other['official-artwork'].front_default}
        alt={props.pokemon.name}
      />
      {props.pokemon.types.map((typeInfo, index) => (
        <p key={index}>{typeInfo.type.name}</p>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
