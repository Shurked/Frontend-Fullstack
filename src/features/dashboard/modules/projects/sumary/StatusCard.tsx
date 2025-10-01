import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  sublabel: string;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  count,
  label,
  sublabel,
  color,
}) => {
  return (
    <div className="bg-white border border-[#DFE1E6] rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <span className="text-2xl font-bold text-[#172B4D]">{count}</span>
      </div>
      <h3 className="text-[#172B4D] font-semibold text-sm mb-1">{label}</h3>
      <p className="text-[#7A869A] text-xs">{sublabel}</p>
    </div>
  );
};

export default StatusCard;
