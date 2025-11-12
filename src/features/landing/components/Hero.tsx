import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#4931A9] overflow-hidden min-h-screen flex justify-center">
      {/* Main Container with max-width */}
      <div className="relative w-full max-w-[1280px]">
        {/* Right Image Container - 35% of max-width */}
        <div className="hidden lg:block absolute top-0 right-0 w-[35%] h-[80vh] z-10 overflow-hidden rounded-bl-[60px]">
          <img
            src="/trabajo-equipo.jpg"
            alt="Ilustración principal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container - Full width to allow form to extend over image */}
        <div className="w-full px-8 lg:px-16 py-20 relative z-20">
          <div className="flex items-center min-h-[calc(100vh-10rem)]">
            {/* Left Content - constrained to 65% but form can extend beyond */}
            <div className="text-white" style={{ maxWidth: '65%' }}>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Conecte equipos,<br />
                proyectos y tareas con<br />
                Kuska.
              </h1>

              <p className="text-xl text-white/90 mb-10">
                Regístrate para disfrutar de "" completamente
              </p>

              <form
                className="flex items-center w-[135%] relative z-30"
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
                  className="flex-1 px-6 py-4 rounded-full bg-white text-[#172B4D] placeholder-gray-400 outline-none text-base border-none shadow-lg pr-24"
                />
                <button
                  type="submit"
                  className="absolute right-0 bg-[#FFAB00] hover:bg-[#FF9900] transition-colors w-25 h-14 rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
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
