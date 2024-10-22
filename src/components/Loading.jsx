import styled from 'styled-components';
import pokeballImg from '../assets/pokeball.png'; // Certifique-se de ajustar o caminho para a imagem da Pokébola

export function Loading() {
  return (
    <LoadingContainer>
      <Pokeball src={pokeballImg} alt="Pokébola" />
      <LoadingText>CARREGANDO</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Fundo semi-transparente */
  color: white;
  text-align: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Pokeball = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  animation: spin 1s linear infinite; /* Adiciona animação de rotação */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
