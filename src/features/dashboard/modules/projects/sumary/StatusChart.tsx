import React from 'react';

interface StatusChartProps {
  inProgress: number;
  inReview: number;
  toDo: number;
}

const StatusChart: React.FC<StatusChartProps> = ({
  inProgress,
  inReview,
  toDo,
}) => {
  const total = inProgress + inReview + toDo;
  
  // Calcular porcentajes para el gráfico circular
  const getPercentage = (value: number) => (value / total) * 100;
  
  const progressPercent = getPercentage(inProgress);
  const reviewPercent = getPercentage(inReview);
  const todoPercent = getPercentage(toDo);

  return (
    <div className="bg-white border border-[#DFE1E6] rounded-lg p-6">
      <h3 className="text-[#172B4D] font-semibold mb-4">Resumen de estado</h3>
      <p className="text-[#7A869A] text-sm mb-6">
        Obtenga una instantánea del estado de sus elementos de trabajo.
      </p>

      {/* Gráfico circular SVG */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Círculo de fondo */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#F4F5F7"
              strokeWidth="40"
            />
            
            {/* Segmento En Progreso */}
            {inProgress > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#4931A9"
                strokeWidth="40"
                strokeDasharray={`${progressPercent * 5.03} 502`}
                strokeDashoffset="0"
              />
            )}
            
            {/* Segmento En Revisión */}
            {inReview > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#FFAB00"
                strokeWidth="40"
                strokeDasharray={`${reviewPercent * 5.03} 502`}
                strokeDashoffset={`-${progressPercent * 5.03}`}
              />
            )}
            
            {/* Segmento Por Hacer */}
            {toDo > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#DFE1E6"
                strokeWidth="40"
                strokeDasharray={`${todoPercent * 5.03} 502`}
                strokeDashoffset={`-${(progressPercent + reviewPercent) * 5.03}`}
              />
            )}
          </svg>
          
          {/* Texto central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#172B4D]">{total}</div>
              <div className="text-xs text-[#7A869A]">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4931A9]"></div>
            <span className="text-[#172B4D] text-sm">en progreso</span>
          </div>
          <span className="text-[#7A869A] text-sm font-medium">{inProgress}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFAB00]"></div>
            <span className="text-[#172B4D] text-sm">en revisión</span>
          </div>
          <span className="text-[#7A869A] text-sm font-medium">{inReview}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#DFE1E6]"></div>
            <span className="text-[#172B4D] text-sm">por hacer</span>
          </div>
          <span className="text-[#7A869A] text-sm font-medium">{toDo}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
