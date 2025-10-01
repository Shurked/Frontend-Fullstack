import React, { useState } from 'react';
import { Users, Users2, MessageSquare } from 'lucide-react';
import PersonasTab from './components/personas/PersonasTab';
import EquiposTab from './components/equipos/EquiposTab';
import ChatTab from './components/chat/ChatTab';

type TabType = 'personas' | 'equipos' | 'chat';

const Teams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personas');

  const tabs = [
    { id: 'personas' as TabType, label: 'Personas', icon: Users },
    { id: 'equipos' as TabType, label: 'Equipos', icon: Users2 },
    { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personas':
        return <PersonasTab />;
      case 'equipos':
        return <EquiposTab />;
      case 'chat':
        return <ChatTab />;
      default:
        return <PersonasTab />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header con pestañas */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Equipos</h1>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#4931A9] text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Teams;