import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import GoogleTranslateWithSearch from "./GoogleTranslateWithSearch";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMobileMenuOpen]);

  const navClass = ({ isActive }) =>
    `font-medium transition ${isActive ? "text-primary" : "text-textDark hover:text-primary"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out
        ${scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md translate-y-[5px]"
            : "bg-white border-b border-gray-100"
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Immobilienbewertung" className="h-8 sm:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <NavLink to="/bewertung" className={navClass}>
                Bewertung starten
              </NavLink>
            </li>
            <li>
              <NavLink to="/funktionen" className={navClass}>
                Funktionen
              </NavLink>
            </li>
            <li>
              <NavLink to="/screenshots" className={navClass}>
                Screenshots
              </NavLink>
            </li>
            <li>
              <NavLink to="/preise" className={navClass}>
                Preise
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block">
              <GoogleTranslateWithSearch />
            </div>

            <NavLink
              to="/login"
              className="hidden sm:inline-block bg-primary text-white px-4 sm:px-6 py-2 rounded-md font-medium hover:bg-primaryDark transition shadow-sm"
            >
              Login
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6 text-textDark" />
              ) : (
                <FiMenu className="w-6 h-6 text-textDark" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-1">
              <GoogleTranslateWithSearch />

              <NavLink
                to="/bewertung"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
              >
                Bewertung starten
              </NavLink>

              <NavLink
                to="/funktionen"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
              >
                Funktionen
              </NavLink>

              <NavLink
                to="/screenshots"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
              >
                Screenshots
              </NavLink>

              <NavLink
                to="/preise"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
              >
                Preise
              </NavLink>
              
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 bg-primary text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-primaryDark transition"
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
