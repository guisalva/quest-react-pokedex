import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../contexts/theme-context';

const { theme } = useContext(ThemeContext);

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    color: ${theme.color};
    background-color: ${theme.background};
  }
`;