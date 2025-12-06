import React, { useState, useMemo } from 'react';
import { useCalendarTasks } from './calendar.service';
import type { CalendarFilter, CalendarTaskItem } from './types';

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

// Mapeo de colores para prioridades con mejor contraste visual
const priorityColors: Record<string, string> = {
  baja: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900 shadow-sm',
  media: 'bg-amber-50 border-l-4 border-amber-500 text-amber-900 shadow-sm',
  alta: 'bg-orange-50 border-l-4 border-orange-500 text-orange-900 shadow-sm',
  critica: 'bg-red-50 border-l-4 border-red-500 text-red-900 shadow-sm font-semibold',
};

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<CalendarFilter>('all');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const matrix = getCalendarMatrix(year, month);

  // Calcular inicio y fin del mes actual
  const startDate = useMemo(() => {
    const start = new Date(year, month, 1);
    return start.toISOString();
  }, [year, month]);

  const endDate = useMemo(() => {
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
    return end.toISOString();
  }, [year, month]);

  // Obtener tareas del calendario con el filtro seleccionado
  const { data, isLoading, error } = useCalendarTasks({
    startDate,
    endDate,
    filter: selectedFilter,
  });

  // Agrupar tareas por día
  const tasksByDay = useMemo(() => {
    if (!data?.data?.tasks) return {};
    
    const grouped: Record<number, CalendarTaskItem[]> = {};
    
    data.data.tasks.forEach((item) => {
      const dueDate = new Date(item.task.dueDate);
      const day = dueDate.getDate();
      const taskMonth = dueDate.getMonth();
      const taskYear = dueDate.getFullYear();
      
      // Solo incluir tareas del mes/año actual
      if (taskMonth === month && taskYear === year) {
        if (!grouped[day]) {
          grouped[day] = [];
        }
        grouped[day].push(item);
      }
    });
    
    return grouped;
  }, [data, month, year]);

  // Navegación de meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date().getDate());
  };

  // Formatear fecha seleccionada
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const monthShort = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const formattedDate = selectedDay
    ? `${selectedDay} de ${monthNames[month]} de ${year}`
    : `${monthNames[month]} de ${year}`;

  const displayMonth = monthShort[month];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendario de Tareas</h1>
        <p className="text-gray-600">Organiza y visualiza tus tareas por fecha de vencimiento</p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex items-center mb-6 gap-3">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-5 py-2.5 rounded-lg font-semibold border transition-all duration-200 ${
            selectedFilter === 'all'
              ? 'text-white border-[#4931a9] shadow-md scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }`}
          style={selectedFilter === 'all' ? { backgroundColor: '#4931a9' } : {}}
        >
          Todos los eventos
        </button>
        <button
          onClick={() => setSelectedFilter('creado')}
          className={`px-5 py-2.5 rounded-lg font-semibold border transition-all duration-200 ${
            selectedFilter === 'creado'
              ? 'text-white border-[#4931a9] shadow-md scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }`}
          style={selectedFilter === 'creado' ? { backgroundColor: '#4931a9' } : {}}
        >
          Creado
        </button>
        <button
          onClick={() => setSelectedFilter('asignado')}
          className={`px-5 py-2.5 rounded-lg font-semibold border transition-all duration-200 ${
            selectedFilter === 'asignado'
              ? 'text-white border-[#4931a9] shadow-md scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }`}
          style={selectedFilter === 'asignado' ? { backgroundColor: '#4931a9' } : {}}
        >
          Asignados
        </button>
      </div>

      {/* Priority Legend */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">Prioridades:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Baja</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-600">Media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-600">Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600 font-semibold">Crítica</span>
          </div>
          <div className="border-l border-gray-300 pl-6 ml-2 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Estados:</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Backlog</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="text-sm">Por Hacer</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm">En Progreso</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Completado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 font-medium">Cargando tareas del calendario...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 rounded-xl shadow-md p-5 border-l-4 border-red-500 mb-6 flex items-center gap-3">
          <span className="text-2xl">❌</span>
          <div>
            <p className="text-red-800 font-semibold">Error al cargar las tareas</p>
            <p className="text-red-600 text-sm">Por favor, intenta nuevamente más tarde</p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            {/* Date selector */}
            <div className="flex flex-col items-center justify-center px-5 py-3 rounded-xl shadow-lg w-20" style={{ background: 'linear-gradient(to bottom right, #4931a9, #6b46c1)' }}>
              <span className="text-sm font-semibold text-gray-100 uppercase">{displayMonth}</span>
              <span className="text-3xl font-bold text-white">
                {selectedDay || new Date().getDate()}
              </span>
            </div>
            
            {/* Month/Year label */}
            <div className="flex-1 min-w-[200px]">
              <div className="text-xl font-bold text-gray-800">
                {formattedDate}
              </div>
              {data && (
                <div className="text-sm text-gray-500 mt-1">
                  {data.data.meta.count} {data.data.meta.count === 1 ? 'tarea' : 'tareas'}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousMonth}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white transition-all duration-200 font-semibold shadow-sm hover:shadow"
                title="Mes anterior"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4931a911'; e.currentTarget.style.borderColor = '#4931a9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#d1d5db'; }}
              >
                ← Anterior
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 rounded-lg text-white transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#4931a9' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d2689'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4931a9'}
              >
                Hoy
              </button>
              <button
                onClick={goToNextMonth}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white transition-all duration-200 font-semibold shadow-sm hover:shadow"
                title="Mes siguiente"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4931a911'; e.currentTarget.style.borderColor = '#4931a9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#d1d5db'; }}
              >
                Siguiente →
              </button>
            </div>
          </div>

          
          {/* Calendar Table */}
          <div className="border-2 border-gray-200 rounded-xl mt-4 overflow-hidden shadow-inner">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr>
                  {weekDays.map((day, idx) => (
                    <th
                      key={day}
                      className={`border-b-2 border-gray-300 px-3 py-3 text-center font-bold text-sm uppercase tracking-wide ${
                        idx === 0 || idx === 6
                          ? 'text-gray-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      style={idx === 0 || idx === 6 ? { backgroundColor: '#4931a922' } : {}}
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
                        const prevOrNext = i === 0
                          ? new Date(year, month, 1 - (weekDays.length - j))
                          : new Date(year, month + 1, j + 1 - week.filter(x => x !== null).length);
                        return (
                          <td key={j} className="border border-gray-200 text-gray-400 align-top h-28 min-w-[120px] px-3 py-2 text-sm bg-gray-50">
                            <div className="font-medium opacity-50">{prevOrNext.getDate()}</div>
                          </td>
                        );
                      }
                      
                      // Main days
                      const dayTasks = tasksByDay[day] || [];
                      const isToday = 
                        day === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear();
                      const isWeekend = j === 0 || j === 6;
                      const isSelected = selectedDay === day;
                      
                      return (
                        <td
                          key={j}
                          className={`border border-gray-200 align-top h-28 min-w-[120px] px-3 py-2 text-sm relative cursor-pointer transition-all duration-200 ${
                            isToday 
                              ? 'border-[#4931a9] ring-2 ring-inset' 
                              : isSelected
                              ? 'border-[#4931a9]'
                              : isWeekend
                              ? 'bg-gray-50 hover:bg-gray-100'
                              : 'bg-white hover:border-gray-300'
                          } hover:shadow-md`}
                          style={isToday ? { background: 'linear-gradient(to bottom right, #4931a911, #4931a922)' } : isSelected ? { backgroundColor: '#4931a911' } : {}}
                          onClick={() => setSelectedDay(day)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className={`font-bold text-base ${
                              isToday 
                                ? 'text-gray-800' 
                                : isWeekend 
                                ? 'text-gray-500'
                                : 'text-gray-800'
                            }`}
                            style={isToday ? { color: '#4931a9' } : {}}
                            >
                              {day}
                            </div>
                            {dayTasks.length > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ backgroundColor: '#4931a9' }}>
                                {dayTasks.length}
                              </span>
                            )}
                          </div>
                          
                          {/* Display tasks for this day */}
                          <div className="space-y-1.5 overflow-hidden">
                            {dayTasks.slice(0, 2).map((item) => {
                              const statusColors: Record<string, string> = {
                                backlog: 'bg-gray-400',
                                todo: 'bg-gray-500',
                                in_progress: 'bg-yellow-500',
                                done: 'bg-green-500',
                              };
                              return (
                              <div
                                key={item.task.id}
                                className={`text-xs rounded-md px-2 py-1.5 truncate transition-transform hover:scale-105 cursor-pointer ${
                                  priorityColors[item.task.priority] || 'bg-gray-100 border-l-4 border-gray-400 text-gray-800'
                                }`}
                                title={`${item.task.title}\nProyecto: ${item.project.name}\nEstado: ${item.task.status}\nPrioridad: ${item.task.priority}`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[item.task.status] || 'bg-gray-400'}`}></div>
                                  <span className="font-medium truncate">{item.task.title}</span>
                                </div>
                              </div>
                            )})}
                            {dayTasks.length > 2 && (
                              <div className="text-xs font-semibold text-white rounded-md px-2 py-1 text-center" style={{ backgroundColor: '#4931a9' }}>
                                +{dayTasks.length - 2} más
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;