import styled from 'styled-components';
import error404Img from '../assets/error404-no-bg.png';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';
import { Link } from 'react-router-dom';

export function NotFound() {
  const { theme } = useContext(ThemeContext);

  return (
    <NotFoundContainer theme={theme}>
      <ErrorText>Pokemon not found!</ErrorText>
      <NotFoundImg src={error404Img} alt="Pokeball not found" />

      <Link to="/">
        <ReturnButton theme={theme}>Return</ReturnButton>
      </Link>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.background}; 
  text-align: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ErrorText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colorOnBackground};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NotFoundImg = styled.img`
  margin-top: 20px;
`;

const ReturnButton = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  margin: 5px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 20px;
  z-index: 10;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.colorOnPrimary};
    transform: scale(1.1);
  }
`;
