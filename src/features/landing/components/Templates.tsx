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
          {/* Tarjeta 1 */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D]">
            <div className="h-40 w-full rounded-xl mb-6 flex items-center justify-center bg-white">
              <img
                src="/src/assets/placeholder.svg"
                alt="Template 1"
                className="w-24 h-24 object-contain opacity-70"
              />
            </div>
            <h3 className="font-semibold text-xl mb-6 leading-snug text-[#172B4D]">
              Template 1
            </h3>
            <span className="text-sm text-[#7A869A]">Ideal para landing pages con enfoque en producto.</span>
          </div>

          {/* Tarjeta 2 */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D]">
            <div className="h-40 w-full rounded-xl mb-6 flex items-center justify-center bg-white">
              <img
                src="/src/assets/placeholder.svg"
                alt="Template 2"
                className="w-24 h-24 object-contain opacity-70"
              />
            </div>
            <h3 className="font-semibold text-xl mb-6 leading-snug text-[#172B4D]">
              Template 2
            </h3>
            <span className="text-sm text-[#7A869A]">Perfecto para startups y servicios digitales.</span>
          </div>

          {/* Tarjeta 3 */}
          <div className="rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg flex flex-col items-start bg-[#F4F5F7] text-[#172B4D]">
            <div className="h-40 w-full rounded-xl mb-6 flex items-center justify-center bg-white">
              <img
                src="/src/assets/placeholder.svg"
                alt="Template 3"
                className="w-24 h-24 object-contain opacity-70"
              />
            </div>
            <h3 className="font-semibold text-xl mb-6 leading-snug text-[#172B4D]">
              Template 3
            </h3>
            <span className="text-sm text-[#7A869A]">Minimalista y versátil para cualquier proyecto.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
