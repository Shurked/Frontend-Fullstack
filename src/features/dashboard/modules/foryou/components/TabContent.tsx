import React from 'react';
import EmptyStateIllustration from '../components/EmptyStateIllustration';
import TodayActivities from './TodayActivities';
import BoardsTable from './BoardsTable';

interface TabContentProps {
  activeTab: string;
  todayActivities?: any[];
  boards?: any[];
}

const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  todayActivities = [],
  boards = []
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'En trabajo':
        return todayActivities.length > 0 ? (
          <TodayActivities activities={todayActivities} />
        ) : <EmptyStateIllustration />;

      case 'Asignado a mi':
        return <EmptyStateIllustration />;

      case 'Tableros':
        return <BoardsTable boards={boards} />;

      default:
        return <EmptyStateIllustration />;
    }
  };

  return renderTabContent();
};

export default TabContent;