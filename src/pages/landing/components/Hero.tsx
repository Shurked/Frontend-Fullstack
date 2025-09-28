import { useState } from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#4931A9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-7 py-4 bg-white rounded-b-xl shadow-md max-w-[700px] mt-6 ml-6">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/placeholder.svg"
              alt="Logo"
              className="w-8 h-8 rounded-md"
            />
          </div>
          <ul className="flex gap-8">
            <li>
              <a href="#como-funciona" className="text-[#172B4D] font-medium text-base hover:underline">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#funcionalidades" className="text-[#172B4D] font-medium text-base hover:underline">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#plantillas" className="text-[#172B4D] font-medium text-base hover:underline">
                Plantillas
              </a>
            </li>
          </ul>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E7EB] text-[#172B4D]">
              <span className="sr-only">Modo claro/oscuro</span>
              <svg width="18" height="18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#7A869A" strokeWidth="2" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E7EB] text-[#172B4D]">
              <span className="sr-only">Idioma</span>
              <svg width="18" height="18" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="12"
                  height="12"
                  rx="2"
                  stroke="#7A869A"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Conecta equipos,<br />
              proyectos y tareas con
              <span className="relative inline-block">
                "KUSKA"
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2"
                  viewBox="0 0 100 8"
                  fill="none"
                >
                  <path
                    d="M0 4 Q25 0 50 4 T100 4"
                    stroke="#FFAB00"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-lg leading-relaxed">
              Regístrate para disfrutar de "KUSKA" completamente
            </p>

            <form className="flex w-full max-w-md mb-10">
              <input
                type="email"
                placeholder="Ingresa tu email..."
                className="flex-1 px-5 py-3 rounded-l-full bg-white text-[#172B4D] placeholder-[#7A869A] outline-none"
              />
              <button
                type="submit"
                className="bg-[#FFAB00] hover:bg-[#FF9900] transition-colors px-6 rounded-r-full flex items-center justify-center"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex justify-center items-center w-full mt-0 md:mt-0">
            <div className="bg-[#F4F5F7] w-[340px] h-[420px] rounded-bl-3xl rounded-tr-3xl shadow-lg flex items-center justify-center">
              <img
                src="/src/assets/placeholder.svg"
                alt="Ilustración principal"
                className="w-48 h-48 object-contain opacity-60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-24 md:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120C240 40 480 40 720 80C960 120 1200 80 1440 40V120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
