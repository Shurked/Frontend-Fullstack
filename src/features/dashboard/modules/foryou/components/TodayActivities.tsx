import React from 'react';

interface Activity {
  id: number;
  title: string;
  project: string;
  createdBy: string;
}

interface TodayActivitiesProps {
  activities: Activity[];
}

const TodayActivities: React.FC<TodayActivitiesProps> = ({ activities }) => {
  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold text-[#172B4D] mb-4">Hoy</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#4931A9] rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">📄</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#172B4D]">{activity.title}</h4>
              <p className="text-sm text-[#7A869A]">{activity.project}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#7A869A]">{activity.createdBy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayActivities;