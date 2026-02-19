import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import GoogleTranslateWithSearch from "./GoogleTranslateWithSearch";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBewertungClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/bewertung');
  };

  const navClass = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-primary" : "text-textDark hover:text-primary"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md translate-y-[5px]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Immobilienbewertung" className="h-8 sm:h-10" />
          </Link>

          {/* Desktop Navigation - Updated order */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <NavLink to="/" className={navClass} end>Startseite</NavLink>
            </li>
            <li>
              <Link
                to="/bewertung"
                onClick={handleBewertungClick}
                className={navClass({ isActive: location.pathname === '/bewertung' })}
              >
                Bewertung starten
              </Link>
            </li>
            <li>
              <NavLink to="/ueber-uns" className={navClass}>Über uns</NavLink>
            </li>
            <li>
              <NavLink to="/preise" className={navClass}>Preise</NavLink>
            </li>
            <li>
              <NavLink to="/kontakt" className={navClass}>Kontakt</NavLink>
            </li>
            {/* Admin link removed from desktop navbar - now only in dropdown */}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block">
              <GoogleTranslateWithSearch />
            </div>

            {!user ? (
              <NavLink
                to="/login"
                className="hidden sm:inline-block bg-primary text-white px-4 sm:px-6 py-2 rounded-md font-medium hover:bg-primaryDark transition shadow-sm"
              >
                Login
              </NavLink>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-textDark hover:text-primary focus:outline-none"
                >
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profil
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

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

        {/* Mobile Menu - Updated order */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-1">
              <GoogleTranslateWithSearch />

              {user ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg mb-2">
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-textMuted">{user.email}</p>
                  </div>
                  <NavLink
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Startseite
                  </NavLink>
                  <Link
                    to="/bewertung"
                    onClick={(e) => {
                      if (!user) {
                        e.preventDefault();
                        setShowLoginModal(true);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Bewertung starten
                  </Link>
                  <NavLink
                    to="/ueber-uns"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Über uns
                  </NavLink>
                  <NavLink
                    to="/preise"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Preise
                  </NavLink>
                  <NavLink
                    to="/kontakt"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Kontakt
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Profil
                  </NavLink>
                  {user.role === "admin" && (
                    <NavLink
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                    >
                      Admin
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Startseite
                  </NavLink>
                  <Link
                    to="/bewertung"
                    onClick={handleBewertungClick}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Bewertung starten
                  </Link>
                  <NavLink
                    to="/ueber-uns"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Über uns
                  </NavLink>
                  <NavLink
                    to="/preise"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Preise
                  </NavLink>
                  <NavLink
                    to="/kontakt"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-textDark hover:text-primary hover:bg-gray-50 rounded-lg transition"
                  >
                    Kontakt
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-primary font-medium hover:bg-gray-50 rounded-lg transition"
                  >
                    Login
                  </NavLink>
                </>
              )}
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

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;