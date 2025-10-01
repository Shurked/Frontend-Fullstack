import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#4931A9] overflow-hidden min-h-screen">
      {/* Imagen de la derecha - Oculta en móviles (lg:block) */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/4 h-[90vh] z-40">
        <div className="bg-[#F4F5F7] w-full h-full rounded-bl-3xl shadow-lg overflow-hidden">
          <img
            src="/trabajo-equipo.jpg"
            alt="Ilustración principal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
        <div className="flex items-center min-h-[calc(100vh-200px)] lg:pr-[26%]">

          {/* Left Content */}
          <div className="text-white max-w-2xl w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
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

            <p className="text-lg sm:text-xl lg:text-xl text-white/90 mb-8 max-w-lg leading-relaxed">
              Regístrate para disfrutar de "KUSKA" completamente
            </p>

            <form
              className="flex w-full max-w-md mb-10"
              onSubmit={e => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value;
                if (email && email.endsWith('@gmail.com')) {
                  window.location.href = `auth/login?email=${encodeURIComponent(email)}`;
                } else {
                  window.location.href = 'auth/login';
                }
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu email..."
                className="flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-l-full bg-white text-[#172B4D] placeholder-[#7A869A] outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-[#FFAB00] hover:bg-[#FF9900] transition-colors px-4 sm:px-6 rounded-r-full flex items-center justify-center"
              >
                <svg width="18" height="18" className="sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24">
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
        </div>
      </div>

      {/* Bottom Wave: increased height and deeper curve for a more pronounced look */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          className="w-full h-40 md:h-56"
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
        M0 100
        C 420 220, 1080 -100, 1440 100
        V180
        H0
        Z"
            fill="white"
          />
        </svg>
      </div>

    </section>
  );
};

export default Hero;
