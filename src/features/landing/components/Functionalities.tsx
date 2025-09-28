import React, { useState } from "react";

interface Feature {
  id: number;
  title: string;
}

const Functionalities: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const features: Feature[] = [
    { id: 1, title: "Gestión de Tareas" },
    { id: 2, title: "Tableros Ágiles" },
    { id: 3, title: "Métricas" },
  ];

  return (
    <section id="funcionalidades" className="bg-[#F4F5F7] px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-sm font-semibold tracking-wider">
            — Funcionalidades
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#172B4D] text-left mb-16 leading-tight">
          Lo que distingue a "KUSKA"
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const isSelected = selected === feature.id;

            return (
              <div
                key={feature.id}
                onClick={() => setSelected(feature.id)}
                className={`rounded-2xl p-8 text-center cursor-pointer transition-all shadow-sm hover:shadow-lg ${
                  isSelected
                    ? "bg-[#4931A9] text-white shadow-lg lg:-translate-y-2"
                    : "bg-white text-[#172B4D]"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-2 ${
                    isSelected ? "text-white/70" : "text-[#7A869A]"
                  }`}
                >
                  0{feature.id}
                </div>

                <h3
                  className={`font-bold text-xl mb-8 ${
                    isSelected ? "text-white" : "text-[#172B4D]"
                  }`}
                >
                  {feature.title}
                </h3>

                <div
                  className={`h-48 rounded-xl mb-8 flex items-center justify-center ${
                    isSelected
                      ? "bg-white/10 border border-white/20"
                      : "bg-[#F4F5F7]"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isSelected ? "text-white/70" : "text-[#7A869A]"
                    }`}
                  >
                    Feature Demo
                  </span>
                </div>

                {isSelected ? (
                  <button className="bg-[#FFAB00] hover:bg-[#e59900] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-105">
                    Ver
                  </button>
                ) : (
                  <button className="text-[#4931A9] text-sm font-semibold hover:underline transition-all">
                    Ver
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Functionalities;
