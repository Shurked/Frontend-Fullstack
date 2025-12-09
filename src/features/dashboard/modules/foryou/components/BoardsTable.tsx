import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Star, ListTodo, Clock, Folder } from 'lucide-react';
import type { FavoriteBoard } from '../types';

interface BoardsTableProps {
  boards: FavoriteBoard[];
}

const BoardsTable: React.FC<BoardsTableProps> = ({ boards }) => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableros Favoritos</h2>
      <div className="grid grid-cols-1 gap-4">
        {boards.map((board) => (
          <div 
            key={board.id} 
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4931A911' }}>
                  <Folder className="w-5 h-5" style={{ color: '#4931A9' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{board.name}</h3>
                    {board.isFavorite && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span>{board.projectName}</span>
                    <span className="text-gray-400">•</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                      {board.projectCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <ListTodo className="w-4 h-4" />
                      <span className="font-medium text-gray-900">{board.taskCount}</span>
                      <span>tareas</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{formatDistanceToNow(new Date(board.lastAccessed), { addSuffix: true, locale: es })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {boards.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No tienes tableros favoritos aún</p>
            <p className="text-sm text-gray-500 mt-1">Marca proyectos como favoritos para verlos aquí</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardsTable;