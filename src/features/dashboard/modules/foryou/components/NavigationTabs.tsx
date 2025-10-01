import React from 'react';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs?: Tab[];
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  tabs = [
    { id: 'En trabajo', label: 'En trabajo', count: 0 },
    { id: 'Asignado a mi', label: 'Asignado a mi', count: 0 },
    { id: 'Tableros', label: 'Tableros', count: 0 }
  ]
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 relative ${
              activeTab === tab.id
                ? 'text-[#4931A9] border-b-2 border-[#4931A9]'
                : 'text-[#7A869A] hover:text-[#172B4D]'
            } font-medium text-sm transition-colors`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id 
                  ? 'bg-[#4931A9] text-white' 
                  : 'bg-[#F4F5F7] text-[#7A869A]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;