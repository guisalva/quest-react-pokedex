import styled from 'styled-components';
import pokeballImg from '../assets/pokeball.png';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

export function Loading(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <LoadingContainer theme={theme} isOverlay={props.isOverlay}>
      <Pokeball src={pokeballImg} alt="Pokeball" />
      <LoadingText>LOADING</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  height: 100%;
  background-color: ${(props) => (props.isOverlay ? 'rgba(0, 0, 0, 0.7)' : props.theme.background)};
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
  animation: spin 1s linear infinite;

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
