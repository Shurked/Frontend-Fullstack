import React from 'react';

interface EmptyStateProps {
  onCreateProject?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateProject }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 mb-6 relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="#F4F5F7" />
          <rect x="60" y="70" width="80" height="60" rx="8" fill="#DFE1E6" />
          <rect x="70" y="80" width="60" height="6" rx="3" fill="#A5ADBA" />
          <rect x="70" y="95" width="45" height="6" rx="3" fill="#A5ADBA" />
          <rect x="70" y="110" width="50" height="6" rx="3" fill="#A5ADBA" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#172B4D] mb-2">
        No tienes proyectos aún
      </h3>
      <p className="text-[#7A869A] text-center mb-6 max-w-md">
        Los proyectos ayudan a tu equipo a organizar y realizar un seguimiento del trabajo.
        Crea tu primer proyecto para comenzar.
      </p>
      {onCreateProject && (
        <button
          onClick={onCreateProject}
          className="px-6 py-3 bg-[#4931A9] text-white font-semibold rounded-lg hover:bg-[#3d2889] transition-colors flex items-center gap-2"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Crear proyecto
        </button>
      )}
    </div>
  );
};

export default EmptyState;
