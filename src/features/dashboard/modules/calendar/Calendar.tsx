import React from 'react';

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

// Helper to get the days for the current calendar view
function getCalendarMatrix(year: number, month: number) {
  const matrix: (number | null)[][] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let day = 1 - firstDay.getDay();

  for (let row = 0; row < 6; row++) {
    const week: (number | null)[] = [];
    for (let col = 0; col < 7; col++) {
      const date = new Date(year, month, day);
      if (
        (row === 0 && day <= 0) ||
        (row >= 4 && day > lastDay.getDate())
      ) {
        // Previous month or next month
        week.push(date.getMonth() === month ? day : null);
      } else {
        week.push(day > 0 && day <= lastDay.getDate() ? day : null);
      }
      day++;
    }
    matrix.push(week);
    // Stop after 5th week if next is all null
    if (row === 4 && matrix[5]?.every((d) => d === null)) break;
  }
  return matrix;
}

const Calendar: React.FC = () => {
  // For demo, use September 2025
  const year = 2025;
  const month = 8; // September (0-indexed)
  const matrix = getCalendarMatrix(year, month);

  // Example for selected day and event
  const selectedDay = 28;
  const eventDay = 30;
  const eventTitle = 'Entrega: Creación del inicio de s...';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendario</h1>
      {/* Filter Tabs */}
      <div className="flex items-center mb-4 gap-2">
        <button className="px-4 py-1 rounded bg-gray-100 text-gray-900 font-medium border border-gray-200 shadow-sm">
          Todos los eventos
        </button>
        <button className="px-4 py-1 rounded bg-gray-100 text-gray-400 font-medium border border-gray-100">
          Creado
        </button>
        <button className="px-4 py-1 rounded bg-gray-100 text-gray-400 font-medium border border-gray-100">
          Asignados
        </button>
      </div>
      {/* Calendar box */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200 max-w-[950px]">
        <div className="flex items-center mb-2">
          {/* Date selector */}
          <div className="flex flex-col items-center justify-center px-4 py-2 border border-gray-200 rounded-md mr-4 w-16">
            <span className="text-lg font-bold text-gray-700">Sep</span>
            <span className="text-2xl font-bold text-gray-900">{selectedDay}</span>
          </div>
          {/* Month/Year label */}
          <div className="flex-1">
            <div className="text-lg font-medium text-gray-700">
              28 de Septiembre de 2025
            </div>
          </div>
          {/* View selector */}
          <button className="flex items-center px-3 py-1 rounded border border-gray-200 text-gray-700 bg-gray-50 text-sm font-medium hover:bg-gray-100">
            Vista Mes
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        {/* Calendar Table */}
        <div className="border border-gray-200 rounded mt-2 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                {weekDays.map((day) => (
                  <th
                    key={day}
                    className="border-b border-gray-200 px-2 py-2 text-center font-medium text-gray-600 bg-gray-50"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => {
                    // Previous/next month days
                    if (day === null) {
                      // Find the correct day (either before or after this month)
                      const prevOrNext = i === 0
                        ? new Date(year, month, 1 - (weekDays.length - j))
                        : new Date(year, month + 1, j + 1 - week.filter(x => x !== null).length);
                      return (
                        <td key={j} className="border border-gray-200 text-gray-300 align-top h-24 w-32 px-2 py-1 text-sm">
                          {prevOrNext.getDate()}
                        </td>
                      );
                    }
                    // Main days
                    return (
                      <td
                        key={j}
                        className={`border border-gray-200 align-top h-24 w-32 px-2 py-1 text-sm relative`}
                      >
                        <div className="text-gray-700 font-medium">{day}</div>
                        {/* Event example on 30 */}
                        {day === eventDay && (
                          <div className="mt-1 bg-gray-100 border border-gray-300 text-xs rounded px-1 py-0.5 truncate w-full max-w-[120px]">
                            {eventTitle}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;