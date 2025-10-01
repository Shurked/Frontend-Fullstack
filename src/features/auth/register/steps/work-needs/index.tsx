import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const workNeedsOptions = [
  "Feature",
  "Task",
  "Bug Fix"
];

const WorkNeedsStep: React.FC = () => {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev =>
      prev.includes(need)
        ? prev.filter(n => n !== need)
        : [...prev, need]
    );
  };

  const handleNext = () => {
    navigate("/auth/work-tracking");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple decorative background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4931A9] relative overflow-hidden">
        {/* Decorative circles igual que register/project-name */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5940BA] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5940BA] rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Right side - WorkNeeds form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 bg-white relative min-h-screen">
        {/* Decorativos SVG arriba izquierda */}
        <svg className="absolute top-0 left-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="45" fill="#4931A9" />
          <circle cx="25" cy="25" r="15" fill="#fff" stroke="#4931A9" strokeWidth="6" />
        </svg>
        {/* Decorativos SVG abajo derecha */}
        <svg className="absolute bottom-0 right-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="70" cy="70" r="45" fill="#4931A9" />
          <circle cx="95" cy="95" r="15" fill="#fff" stroke="#4931A9" strokeWidth="6" />
        </svg>

        <div className="w-full max-w-sm relative z-10 flex flex-col justify-center h-full mx-auto">
          {/* Logo + KUSKA SVG */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="/kuska-logov2.png"
              alt="Kuska Logo"
              className="w-16 h-16 mb-2"
            />
            <span className="relative inline-block font-bold text-[#172B4D] text-2xl md:text-3xl mb-2">
              KUSKA
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
          </div>

          {/* Título y subtítulo */}
          <h1 className="text-xl md:text-2xl font-bold text-[#172B4D] mb-2 text-center">
            ¿Qué tipo de trabajo necesitas?
          </h1>
          <p className="text-[#7A869A] text-sm text-center mb-6">
            Estos son los componentes básicos de tus proyectos
          </p>

          {/* Opciones de selección */}
          <div className="flex flex-col gap-4 mb-6">
            {workNeedsOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => toggleNeed(option)}
                className={`w-full px-4 py-3 border rounded-lg font-semibold text-[#172B4D] transition-colors
                  ${selectedNeeds.includes(option)
                    ? 'bg-[#4931A9] text-white border-[#4931A9]'
                    : 'bg-white border-[#DFE1E6] hover:bg-[#F4F5F7]'}
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            type="button"
            className={`w-full font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-2 text-white
              ${selectedNeeds.length === 0
                ? 'bg-[#A5A5A5] cursor-not-allowed'
                : 'bg-[#4931A9] hover:bg-[#3d2889]'}
            `}
            disabled={selectedNeeds.length === 0}
            onClick={handleNext}
          >
            Siguiente
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Link saltar */}
          <button
            type="button"
            className="w-full text-[#7A869A] text-sm mt-1 hover:underline"
            onClick={handleNext}
          >
            Saltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkNeedsStep;
