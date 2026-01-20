// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bewertung from "./pages/Bewertung";
import Features from "./pages/Features";
import Screenshots from "./pages/Screenshots";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound"; // Create this too

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bewertung" element={<Bewertung />} />
        <Route path="/funktionen" element={<Features />} />
        <Route path="/screenshots" element={<Screenshots />} />
        <Route path="/preise" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="/ueber-uns" element={<UeberUns />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
