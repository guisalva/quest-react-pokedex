import styled from "styled-components";

export function PokemonCard(props) {
  return (
    <Card>
      <CardShadow></CardShadow>

      <CardHeader>
        <h5>{props.pokemon.id}</h5>
        <h5>{props.pokemon.name}</h5>
      </CardHeader>

      <div>
        <img style={{ maxWidth: "100px", maxHeight: "110px" }} src={props.pokemon.sprite} alt="" />
      </div>

      <div>
        {props.pokemon.types.map((type) => (
          <p key={type} className={`${type}`}>
            {type}
          </p>
        ))}
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ececec;
  color: #000;
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
  color: #fff
`;

const CardShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 100%;
  height: 70%;
  border-radius: 10px;
  z-index: -1;
`;
