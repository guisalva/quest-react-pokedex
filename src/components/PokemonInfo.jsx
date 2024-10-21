import styled from 'styled-components';

export function PokemonInfo(props) {
  return (
    <Container>
      <h2>Lista de movimentos :</h2>
      <Section style={{ height: '35%' }}>
        <Moveset>
          {props.pokemon.moves.map((move, index) => (
            <li key={index}>
              {move.move.name}
              <p>{move.move.description}</p>
            </li>
          ))}
        </Moveset>
      </Section>

      <h2>Lista de habilidades :</h2>
      <Section>
        {props.pokemon.abilities.map((ability, index) => (
          <AbilityCard key={index}>
            <p>{ability.ability.name}</p>
            <p>{ability.ability.description}</p>
          </AbilityCard>
        ))}
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 50%;
  padding: 10px 20px;
  margin-left: 35px;
`;

const Section = styled.section`
  max-height: 50%;
  overflow-y: auto;
  border-radius: 5px;
`;

const Moveset = styled.ul`
  background-color: #fff;
  border-radius: 5px;
  padding: 0 10px;
  margin-right: 10px;

  li {
    border-bottom: 1px solid #dadada;
    text-transform: capitalize;

    &:last-child {
      border: none;
    }
  }
`;

const AbilityCard = styled.div`
  background-color: #fff;
  padding: 10 20px;
`;
