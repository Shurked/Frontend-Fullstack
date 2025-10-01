import React from 'react';

interface Board {
  id: number;
  name: string;
  project: string;
  favorite: boolean;
}

interface BoardsTableProps {
  boards: Board[];
}

const BoardsTable: React.FC<BoardsTableProps> = ({ boards }) => {
  return (
    <div className="py-6">
      <div className="bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-0 text-sm font-medium text-[#7A869A]">Nombre</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#7A869A]">Proyecto</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr key={board.id} className="border-b border-gray-100 hover:bg-[#F4F5F7] transition-colors">
                <td className="py-4 px-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {board.favorite && (
                        <span className="text-[#FFAB00] text-lg">❤️</span>
                      )}
                    </div>
                    <span className="text-[#172B4D] font-medium">{board.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#7A869A]">{board.project}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardsTable;