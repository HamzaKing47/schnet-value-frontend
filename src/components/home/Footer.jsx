const Footer = () => (
  <footer className="py-12 bg-textDark text-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Immobilienbewertung</h3>
          <p className="text-gray-400">
            Professionelle Software für Immobilienbewertung seit 2009.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Produkt</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#funktionen" className="hover:text-primary transition">Funktionen</a></li>
            <li><a href="#preise" className="hover:text-primary transition">Preise</a></li>
            <li><a href="#demo" className="hover:text-primary transition">Demo</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Unternehmen</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-primary transition">Über uns</a></li>
            <li><a href="/contact" className="hover:text-primary transition">Kontakt</a></li>
            <li><a href="/blog" className="hover:text-primary transition">Blog</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Rechtliches</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/impressum" className="hover:text-primary transition">Impressum</a></li>
            <li><a href="/datenschutz" className="hover:text-primary transition">Datenschutz</a></li>
            <li><a href="/agb" className="hover:text-primary transition">AGB</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2009–2025 ImmoInvent GmbH • Alle Rechte vorbehalten</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-primary transition">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-primary transition">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-primary transition">Facebook</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;