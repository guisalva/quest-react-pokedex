import styled from 'styled-components';

export function PokemonInfo(props) {
  return (
    <Container>
      <h2>Moveset :</h2>
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

      <h2>Abilities :</h2>
      <Section style={{ overflowY: 'auto'}}>
        {props.pokemon.abilities.map((ability, index) => (
          <AbilityCard key={index}>
            <h4>{ability.ability.name}</h4>
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
  height: 100%;
  width: 50%;
  padding: 20px;
  margin-left: 35px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  h2 {
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Section = styled.section`
  border-radius: 5px;
  margin-bottom: 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Moveset = styled.ul`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  li {
    border-bottom: 1px solid #dadada;
    text-transform: capitalize;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #444;

    &:last-child {
      border: none;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const AbilityCard = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-right: 20px;

  h4 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;
