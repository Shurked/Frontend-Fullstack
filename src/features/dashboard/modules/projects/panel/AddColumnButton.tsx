import React from 'react';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  return (
    <button
      onClick={onAddColumn}
      className="bg-white/50 hover:bg-white border-2 border-dashed border-[#DFE1E6] rounded-lg p-4 min-w-[280px] max-w-[320px] flex-shrink-0 transition-all"
    >
      <div className="flex items-center justify-center gap-2 text-[#7A869A] hover:text-[#4931A9]">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-medium">Agregar columna</span>
      </div>
    </button>
  );
};

export default AddColumnButton;
