import React from 'react';

const EmptyStateIllustration: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative mb-8">
      <svg width="200" height="150" viewBox="0 0 200 150" className="text-[#4931A9]">
        {/* Mantener todo el SVG original */}
        <ellipse cx="100" cy="120" rx="60" ry="15" fill="#E8E4F8" opacity="0.5" />
        <ellipse cx="85" cy="90" rx="25" ry="35" fill="#4931A9" opacity="0.8" />
        <ellipse cx="65" cy="75" rx="12" ry="20" fill="#4931A9" opacity="0.9" transform="rotate(-30 65 75)" />
        <ellipse cx="95" cy="110" rx="8" ry="15" fill="#4931A9" opacity="0.7" transform="rotate(15 95 110)" />
        <ellipse cx="105" cy="115" rx="8" ry="18" fill="#4931A9" opacity="0.7" transform="rotate(-10 105 115)" />
        <circle cx="75" cy="55" r="18" fill="#F4C2A1" />
        <path d="M 60 45 Q 75 35 90 45 Q 85 50 75 55 Q 65 50 60 45" fill="#8B4513" />
        <circle cx="70" cy="50" r="2" fill="#333" />
        <circle cx="80" cy="50" r="2" fill="#333" />
        <path d="M 70 58 Q 75 62 80 58" stroke="#333" strokeWidth="1" fill="none" />
        <ellipse cx="50" cy="65" rx="20" ry="12" fill="#E8E4F8" />
        <rect x="90" y="70" width="35" height="25" rx="3" fill="#333" />
        <rect x="92" y="72" width="31" height="18" fill="#F4F5F7" />
        <rect x="105" y="95" width="3" height="8" fill="#666" />
        <circle cx="140" cy="40" r="3" fill="#FFAB00" opacity="0.6" />
        <circle cx="160" cy="60" r="2" fill="#36B37E" opacity="0.6" />
        <circle cx="30" cy="35" r="2" fill="#FF7452" opacity="0.6" />
        <text x="120" y="35" fill="#4931A9" fontSize="12" opacity="0.7">z</text>
        <text x="125" y="30" fill="#4931A9" fontSize="14" opacity="0.5">z</text>
        <text x="130" y="25" fill="#4931A9" fontSize="16" opacity="0.3">z</text>
      </svg>
    </div>
    <p className="text-[#172B4D] text-lg font-medium">
      Aún no hay nada por hacer !!!
    </p>
  </div>
);

export default EmptyStateIllustration;