import React from "react";

const Templates: React.FC = () => {
  return (
    <section id="plantillas" className="w-full py-20 px-6 md:px-20 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explora nuestros templates
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Diseñados para ayudarte a iniciar rápidamente con interfaces modernas
          y funcionales.
        </p>

        {/* Grid de tarjetas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
            <img
              src="/src/assets/placeholder.svg"
              alt="Template 1"
              className="w-32 h-32 object-contain opacity-70"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Template 1
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Ideal para landing pages con enfoque en producto.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
            <img
              src="/src/assets/placeholder.svg"
              alt="Template 2"
              className="w-32 h-32 object-contain opacity-70"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Template 2
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Perfecto para startups y servicios digitales.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
            <img
              src="/src/assets/placeholder.svg"
              alt="Template 3"
              className="w-32 h-32 object-contain opacity-70"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Template 3
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Minimalista y versátil para cualquier proyecto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
