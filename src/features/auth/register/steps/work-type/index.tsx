import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const workTypes = [
  "Desarrollo de software",
  "Desarrollo de software",
  "Desarrollo de software",
  "Desarrollo de software",
  "Desarrollo de software",
  "Desarrollo de software",
];

const WorkTypeStep: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/auth/project-name");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple decorative background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4931A9] relative overflow-hidden">
        {/* Decorative circles igual que register */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5940BA] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5940BA] rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Right side - WorkType form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 bg-white relative min-h-screen">
        {/* Small decorative circles for mobile */}
        {/* Mobile decorativo: SVG dos círculos en esquina superior izquierda */}
        <svg className="absolute top-0 left-0 lg:hidden" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="50" cy="50" r="30" fill="#4931A9" />
          <circle cx="18" cy="18" r="10" fill="#fff" stroke="#4931A9" strokeWidth="4" />
        </svg>
        {/* Mobile decorativo: SVG dos círculos en esquina inferior derecha */}
        <svg className="absolute bottom-0 right-0 lg:hidden" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="50" cy="50" r="30" fill="#4931A9" />
          <circle cx="18" cy="18" r="10" fill="#fff" stroke="#4931A9" strokeWidth="4" />
        </svg>

        <div className="w-full max-w-sm relative z-10 flex flex-col justify-center h-full">
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

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-[#172B4D] mb-2 text-center">
          ¿Qué tipo de trabajo realizas?
        </h1>
        <p className="text-[#7A869A] text-sm text-center mb-6">
          Esto nos ayuda a recomendar plantillas de trabajo.
        </p>

        {/* Opciones */}
        <div className="flex flex-col gap-3 mb-6">
          {workTypes.map((type, idx) => {
            const isSelected = selected.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelected(isSelected
                    ? selected.filter(i => i !== idx)
                    : [...selected, idx]
                  );
                }}
                className={`w-full px-4 py-2 border rounded-lg text-[#172B4D] font-medium transition-all text-base
                  ${isSelected ? "border-[#4931A9] bg-[#F4F5F7]" : "border-[#DFE1E6] bg-white"}`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Botón siguiente */}
        <button
          type="button"
          className={`w-full font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-2 text-white
            ${selected.length === 0
              ? 'bg-[#A5A5A5] cursor-not-allowed'
              : 'bg-[#4931A9] hover:bg-[#3d2889]'}
          `}
          disabled={selected.length === 0}
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

export default WorkTypeStep;
