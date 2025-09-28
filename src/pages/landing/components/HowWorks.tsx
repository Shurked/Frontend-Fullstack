const HowWorks = () => {
  return (
    <section id="como-funciona" className="bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-sm font-semibold tracking-wider">
            — Cómo funciona
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#172B4D] text-left mb-16 leading-tight">
          Cómo funciona "KUSKA"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Paso 1 */}
          <div className="p-6 bg-[#F4F5F7] rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#172B4D] mb-4">
              Paso 1
            </h3>
            <p className="text-[#7A869A] text-sm leading-relaxed">
              Regístrate y crea tu espacio de trabajo.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-6 bg-[#F4F5F7] rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#172B4D] mb-4">
              Paso 2
            </h3>
            <p className="text-[#7A869A] text-sm leading-relaxed">
              Organiza tus proyectos y tareas en tableros.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-6 bg-[#F4F5F7] rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#172B4D] mb-4">
              Paso 3
            </h3>
            <p className="text-[#7A869A] text-sm leading-relaxed">
              Colabora en equipo y mide tu progreso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
