// src/components/home/Footer.jsx - REDESIGNED
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-textDark text-white py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold mb-4">Immobilienbewertung</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Professionelle Software für Immobilienbewertung nach ImmoWertV.
            Seit 2009 entwickeln wir Lösungen für Makler, Sachverständige
            und Immobilienprofis.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Produkt</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-primary transition">Startseite</Link></li>
            <li><Link to="/preise" className="hover:text-primary transition">Preise</Link></li>
            <li><Link to="/bewertung" className="hover:text-primary transition">Bewertung starten</Link></li>
            <li><Link to="/funktionen" className="hover:text-primary transition">Funktionen</Link></li>
            <li><Link to="/screenshots" className="hover:text-primary transition">Screenshots</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Unternehmen</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/ueber-uns" className="hover:text-primary transition">Über uns</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary transition">Kontakt</Link></li>
          </ul>
        </div>

        {/* Account & Legal */}
        <div>
          <h4 className="font-semibold text-white mb-4">Konto & Rechtliches</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/login" className="hover:text-primary transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary transition">Registrieren</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
            <li><Link to="/agb" className="hover:text-primary transition">AGB</Link></li>
            <li><Link to="/datenschutz" className="hover:text-primary transition">Datenschutz</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
        <p>© 2009–{new Date().getFullYear()} ImmoInvent GmbH • Alle Rechte vorbehalten</p>
      </div>
    </div>
  </footer>
);

export default Footer;