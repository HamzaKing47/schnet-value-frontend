const Footer = () => (
  <footer className="py-8 sm:py-12 bg-textDark text-white">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Immobilienbewertung</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Professionelle Software für Immobilienbewertung seit 2009.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Produkt</h4>
          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li><a href="#funktionen" className="hover:text-primary transition">Funktionen</a></li>
            <li><a href="#preise" className="hover:text-primary transition">Preise</a></li>
            <li><a href="#demo" className="hover:text-primary transition">Demo</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Unternehmen</h4>
          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li><a href="/ueber-uns" className="hover:text-primary transition">Über uns</a></li>
            <li><a href="/kontakt" className="hover:text-primary transition">Kontakt</a></li>
            <li><a href="/blog" className="hover:text-primary transition">Blog</a></li>
          </ul>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Rechtliches</h4>
          <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
            <li><a href="/impressum" className="hover:text-primary transition">Impressum</a></li>
            <li><a href="/datenschutz" className="hover:text-primary transition">Datenschutz</a></li>
            <li><a href="/agb" className="hover:text-primary transition">AGB</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
        <p>© 2009–2025 ImmoInvent GmbH • Alle Rechte vorbehalten</p>
        <div className="mt-3 sm:mt-4 flex justify-center space-x-4 sm:space-x-6">
          <a href="#" className="text-gray-400 hover:text-primary transition text-sm">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-primary transition text-sm">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-primary transition text-sm">Facebook</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;