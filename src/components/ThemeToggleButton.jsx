import { useContext } from 'react';
import { ThemeContext, themes } from '../contexts/theme-context';

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <button
        onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}
      >
        Trocar tema
      </button>
    </>
  );
};
