import { AppRoutes } from './pages/routes';
import { ThemeProvider, ThemeContext } from './contexts/theme-context';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
