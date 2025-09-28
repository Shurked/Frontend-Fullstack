import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white py-8 px-8 mt-auto min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/placeholder.svg"
              alt="Logo"
              className="w-7 h-7 rounded-md"
            />
            <span className="text-[#7A869A] text-sm">Copyright © 2025 Grupo ?</span>
          </div>
          <nav className="flex gap-8">
            <a href="#como-funciona" className="text-[#7A869A] hover:text-[#4931A9] text-sm transition-colors">Cómo funciona</a>
            <a href="#funcionalidades" className="text-[#7A869A] hover:text-[#4931A9] text-sm transition-colors">Funcionalidades</a>
            <a href="#plantillas" className="text-[#7A869A] hover:text-[#4931A9] text-sm transition-colors">Plantillas</a>
          </nav>
          <div className="text-[#7A869A] text-sm">Idioma</div>
        </div>
      </footer>
  );
};

export default Footer;
