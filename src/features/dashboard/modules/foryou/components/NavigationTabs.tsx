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
    <div className="flex space-x-2 border-b-2 border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-semibold transition-all duration-200 relative rounded-t-lg ${
            activeTab === tab.id
              ? 'text-white -mb-0.5 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          style={activeTab === tab.id ? { backgroundColor: '#4931A9' } : {}}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count > 0 && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;