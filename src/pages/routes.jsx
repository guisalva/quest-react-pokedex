import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { Pokemon } from './Pokemon';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};