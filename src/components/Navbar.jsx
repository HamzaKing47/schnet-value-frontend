import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-out
        ${scrolled
                    ? "bg-white/95 backdrop-blur-sm shadow-md"
                    : "bg-white border-b border-gray-100"}
      `}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <img src={logo} alt="Immobilienbewertung" className="h-10" />
                </a>

                {/* Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    <li><a href="#testen" className="font-medium text-primary hover:text-primaryDark transition">Jetzt testen</a></li>
                    <li><a href="#funktionen" className="text-textDark hover:text-primary transition">Funktionen</a></li>
                    <li><a href="#screenshots" className="text-textDark hover:text-primary transition">Screenshots</a></li>
                    <li><a href="#preise" className="text-textDark hover:text-primary transition">Preise</a></li>
                    <li><a href="#leads" className="text-textDark hover:text-primary transition">Leads</a></li>
                </ul>

                {/* Login */}
                <a
                    href="/login"
                    className="bg-primary text-white px-6 py-2.5 rounded-md font-medium
  hover:bg-primaryDark transition-all duration-200 shadow-sm hover:shadow"
                >
                    Login
                </a>

            </div>
        </nav>
    );
};

export default Navbar;