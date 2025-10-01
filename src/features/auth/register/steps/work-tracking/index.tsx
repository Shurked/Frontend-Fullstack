import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialStates = [
  { label: "Idea", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFAB00" /><path d="M12 8v4l3 2" stroke="#172B4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ) },
  { label: "To Do", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="#4931A9" /><path d="M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ) },
  { label: "In Progress", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#5940BA" /><path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ) },
  { label: "Done", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00C853" /><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ) }
];

const WorkTrackingStep: React.FC = () => {
  const [states, setStates] = useState(initialStates);
  const navigate = useNavigate();

  const removeState = (idx: number) => {
    setStates(prev => prev.filter((_, i) => i !== idx));
  };

  const addState = () => {
    setStates(prev => [...prev, { label: "Nuevo estado", icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#7A869A" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">+</text></svg>
    ) }]);
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple decorative background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4931A9] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5940BA] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5940BA] rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Right side - WorkTracking form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 bg-white relative min-h-screen">
        <svg className="absolute top-0 left-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="45" fill="#4931A9" />
          <circle cx="25" cy="25" r="15" fill="#fff" stroke="#4931A9" strokeWidth="6" />
        </svg>
        <svg className="absolute bottom-0 right-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="70" cy="70" r="45" fill="#4931A9" />
          <circle cx="95" cy="95" r="15" fill="#fff" stroke="#4931A9" strokeWidth="6" />
        </svg>

        <div className="w-full max-w-sm relative z-10 flex flex-col justify-center h-full mx-auto">
          {/* Logo + nombre proyecto */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="/kuska-logov2.png"
              alt="Kuska Logo"
              className="w-16 h-16 mb-2"
            />
            <span className="relative inline-block font-bold text-[#172B4D] text-2xl md:text-3xl mb-2">
              nombrexd
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
            ¿Cómo hace el seguimiento del trabajo?
          </h1>
          <p className="text-[#7A869A] text-sm text-center mb-6">
            El proyecto pasa por los siguientes estados
          </p>

          {/* Estados con iconos y eliminar */}
          <div className="flex flex-col gap-4 mb-6">
            {states.map((state, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white border border-[#DFE1E6] rounded-lg px-4 py-3">
                <span>{state.icon}</span>
                <input
                  type="text"
                  value={state.label}
                  onChange={e => {
                    const newStates = [...states];
                    newStates[idx].label = e.target.value;
                    setStates(newStates);
                  }}
                  className="flex-1 bg-transparent outline-none text-[#172B4D] font-semibold"
                />
                <button type="button" onClick={() => removeState(idx)} className="text-[#A5A5A5] hover:text-[#4931A9]">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Agregar estado */}
          <div className="flex items-center justify-center mb-6">
            <button type="button" onClick={addState} className="flex items-center gap-2 text-[#4931A9] font-semibold hover:underline">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4931A9" /><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              Agregar estado
            </button>
          </div>

          {/* Línea y icono de progreso */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 h-px bg-[#DFE1E6]"></div>
            <span className="mx-2 text-[#A5A5A5]">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#A5A5A5" strokeWidth="2" /><path d="M12 8v4l3 2" stroke="#A5A5A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div className="flex-1 h-px bg-[#DFE1E6]"></div>
          </div>

          {/* Botón finalizar */}
          <button
            type="button"
            className={`w-full font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-2 text-white bg-[#4931A9] hover:bg-[#3d2889]`}
            onClick={handleFinish}
          >
            Finalizar
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
            onClick={handleFinish}
          >
            Saltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkTrackingStep;
