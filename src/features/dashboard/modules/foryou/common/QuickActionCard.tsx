import React from 'react';

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  color: string;
}

interface QuickActionCardProps {
  action: QuickAction;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ action, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all hover:scale-105 text-center"
  >
    <div className="text-2xl mb-2">{action.icon}</div>
    <p className="text-sm font-medium text-[#172B4D]">{action.title}</p>
  </button>
);

export default QuickActionCard;