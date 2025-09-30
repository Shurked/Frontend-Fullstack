import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    name: string;
    initials: string;
    color: string;
  };
  content: string;
  timestamp: Date;
  type: 'text' | 'file';
}

const ChatTab: React.FC = () => {
  const [message, setMessage] = useState('');
  
  // Datos de ejemplo basados en el diseño
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        name: 'Jorge C. Santholo',
        initials: 'JC',
        color: 'bg-orange-500'
      },
      content: 'Hola',
      timestamp: new Date('2024-01-15T10:30:00'),
      type: 'text'
    },
    {
      id: '2',
      sender: {
        name: 'Alejandro De González',
        initials: 'PG',
        color: 'bg-purple-500'
      },
      content: 'Chat de prueba',
      timestamp: new Date('2024-01-15T10:32:00'),
      type: 'text'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat del equipo</h2>
        <p className="text-sm text-gray-500">2 miembros activos</p>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex space-x-3">
            {/* Avatar del remitente */}
            <div className={`w-8 h-8 ${msg.sender.color} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
              {msg.sender.initials}
            </div>

            {/* Contenido del mensaje */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">{msg.sender.name}</span>
                <span className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-900">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay mensajes aún</p>
            <p className="text-sm text-gray-400 mt-1">Sé el primero en enviar un mensaje</p>
          </div>
        )}
      </div>

      {/* Input para escribir mensajes */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-3">
          {/* Campo de texto */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            
            {/* Botones dentro del input */}
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                <Smile className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Botón enviar */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="flex items-center justify-center w-10 h-10 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;