import React from "react";

const Templates: React.FC = () => {
  return (
    <section id="plantillas" className="bg-white px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-lg font-bold tracking-wider">
            Plantillas
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#172B4D] text-left mb-16 leading-tight">
          Plantillas para el desarrollo de software ágil y colaborativo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Tarjeta 1: Scrum */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D] hover:border-2 hover:border-[#941a8e]">
            <h3 className="font-semibold text-xl mb-4 leading-snug text-[#172B4D]">Scrum</h3>
              <div className="h-40 w-full rounded-xl mb-4 overflow-hidden bg-white">
                <img
                  src="scrum.webp"
                  alt="Scrum"
                  className="w-full h-full object-cover "
                  loading="lazy"
                />
              </div>
            <span className="text-sm text-[#7A869A]">Organiza tu equipo en sprints, gestiona el backlog y mejora la colaboración para alcanzar objetivos ágiles.</span>
          </div>

          {/* Tarjeta 2: Bug Tracking */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D] hover:border-2 hover:border-[#941a8e]">
            <h3 className="font-semibold text-xl mb-4 leading-snug text-[#172B4D]">Bug Tracking</h3>
              <div className="h-40 w-full rounded-xl mb-4 overflow-hidden bg-white">
                <img
                  src="https://b5digital.dk/wp-content/uploads/2022/06/bug-tracking-tools.jpg"
                  alt="Bug tracking template"
                  className="w-full h-full object-cover "
                  loading="lazy"
                />
              </div>
            <span className="text-sm text-[#7A869A]">Detecta, reporta y da seguimiento a errores en tiempo real, asegurando la calidad y estabilidad de tu software.</span>
          </div>

          {/* Tarjeta 3: Planning */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D] hover:border-2 hover:border-[#941a8e]">
            <h3 className="font-semibold text-xl mb-4 leading-snug text-[#172B4D]">Planning</h3>
              <div className="h-40 w-full rounded-xl mb-4 overflow-hidden bg-white">
                <img
                  src="https://stafiz.com/wp-content/uploads/2025/05/planning-projet.png"
                  alt="Planning"
                  className="w-full h-full object-cover "
                  loading="lazy"
                />
              </div>
            <span className="text-sm text-[#7A869A]">Planifica hitos, asigna tareas y visualiza el progreso de tu proyecto para una gestión eficiente y colaborativa.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
