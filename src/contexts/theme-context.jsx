import { createContext, useState } from 'react';

export const themes = {
  light: {
    background: '#ffffff',
    surface: '#f7f7f7',
    primary: '#ff0000',
    secondary: '#cc0000',
    colorOnBackground: '#202020',
    colorOnPrimary: '#ffffff'
  },
  dark: {
    background: '#121212',
    surface: '#222222',
    primary: '#cc0000',
    secondary: '#ff0000',
    colorOnBackground: '#ffffff',
    colorOnPrimary: '#000000'
  }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

  const [ theme, setTheme ] = useState(themes.light)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}