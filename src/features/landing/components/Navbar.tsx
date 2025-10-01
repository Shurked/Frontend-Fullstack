import React from "react";

interface NavbarProps {
  isHidden?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isHidden = false }) => {
  return (
    <nav className={`landing-navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src="/src/assets/placeholder.svg"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md"
        />
      </div>

      <ul className="flex flex-1 justify-center gap-3 sm:gap-6 lg:gap-12">
        <li>
          <a href="#como-funciona" className="text-[#172B4D] font-medium text-xs sm:text-sm lg:text-base hover:underline whitespace-nowrap">
            Cómo funciona
          </a>
        </li>
        <li>
          <a href="#funcionalidades" className="text-[#172B4D] font-medium text-xs sm:text-sm lg:text-base hover:underline whitespace-nowrap">
            Funcionalidades
          </a>
        </li>
        <li>
          <a href="#plantillas" className="text-[#172B4D] font-medium text-xs sm:text-sm lg:text-base hover:underline whitespace-nowrap">
            Plantillas
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
