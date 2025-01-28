import { BrowserRouter, Routes, Route } from "react-router";
import { PokemonProvider } from "./contexts/PokemonContext";
import Pokedex from "./pages/Pokedex";
import Details from "./pages/Details";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Pokedex />} />
          <Route path="/pokemon">
            <Route path=":pid" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
