import { useContext } from 'react';
import { ThemeContext, themes } from '../contexts/theme-context';
import styled, { css } from 'styled-components';

import SunIcon from '../assets/sun.png';
import MoonIcon from '../assets/moon.png';

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ToggleThemeButton theme={theme} onClick={toggleTheme}>
      <div className="thumb">
        <img
          className="theme-icon"
          src={theme === themes.light ? SunIcon : MoonIcon}
          alt="Theme Icon"
        />
      </div>
    </ToggleThemeButton>
  );
};

const ToggleThemeButton = styled.button`
  position: relative;
  background-color: ${(props) => props.theme.background };
  border: 2px solid ${(props) =>  props.theme.colorOnBackground };
  border-radius: 20px;
  height: 40px;
  width: 60px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  .thumb {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 0;
    right: 0;
    transform: translate(10%, -50%)
      ${(props) => (props.theme === themes.dark ? 'translateX(65%)' : 'translateX(0)')};
    background-color: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

    ${(props) => props.theme === themes.light && css`
      border: 2px solid ${props.theme.colorOnBackground};
    `}
  }

  .theme-icon {
    max-width: 22px;
  }
`;
