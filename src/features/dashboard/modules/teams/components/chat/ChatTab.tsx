import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Users, 
  FileText, 
  ChevronDown,
  Download,
  MoreVertical
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
  type: 'group' | 'direct';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  avatar?: string;
}

interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  sharedBy: string;
  timestamp: string;
}

type UserStatus = 'online' | 'busy' | 'away';
type RightPanelView = 'members' | 'shared';

const ChatTab: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [userStatus, setUserStatus] = useState<UserStatus>('online');
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>('shared');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Datos de ejemplo
  const chats: ChatRoom[] = [
    {
      id: '1',
      name: 'Proyecto de desarrollo',
      lastMessage: 'Ningún mensaje',
      timestamp: '11:13',
      type: 'group'
    }
  ];

  const messages: ChatMessage[] = [
    // Chat inicialmente vacío como en la imagen
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Jorge C. Bardales',
      role: 'Administrador',
      status: 'online'
    }
  ];

  const sharedFiles: SharedFile[] = [
    {
      id: '1',
      name: 'Organización del proyecto.pdf',
      type: 'pdf',
      size: '2.5 MB',
      sharedBy: 'Jorge C. Bardales',
      timestamp: 'Hace 2 horas'
    }
  ];

  const statusOptions = [
    { value: 'online', label: 'Disponible', color: 'bg-green-500' },
    { value: 'busy', label: 'Ocupado', color: 'bg-red-500' },
    { value: 'away', label: 'Ausente', color: 'bg-yellow-500' }
  ];

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'bg-gray-400';
  };

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : 'Desconectado';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Aquí enviarías el mensaje
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* User Status Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JC</span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(userStatus)} rounded-full border-2 border-white`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Jorge C. Bardales</h3>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <span>{getStatusLabel(userStatus)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute top-6 left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setUserStatus(option.value as UserStatus);
                          setShowStatusDropdown(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className={`w-3 h-3 ${option.color} rounded-full`} />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Header */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Mensajes</h4>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer mb-2 ${
                  selectedChat === chat.id 
                    ? 'bg-[#4931A9] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#4931A9] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">PD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium truncate ${
                        selectedChat === chat.id ? 'text-white' : 'text-gray-900'
                      }`}>
                        {chat.name}
                      </h4>
                      <span className={`text-xs ${
                        selectedChat === chat.id ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      selectedChat === chat.id ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel - Chat Messages */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full -ml-2"></div>
                <span className="text-sm text-gray-600 ml-2">Chat de grupo</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setRightPanelView('shared')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    rightPanelView === 'shared'
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Compartidos
                </button>
                <button
                  onClick={() => setRightPanelView('members')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    rightPanelView === 'members'
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Integrantes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No hay mensajes aún</p>
                <p className="text-sm">Comienza la conversación</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">
                      {msg.sender.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
            />
            <button
              type="submit"
              className="p-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel - Members or Shared Files */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            {rightPanelView === 'members' ? 'Integrantes' : 'Compartidos'}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {rightPanelView === 'members' ? (
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#4931A9] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">PD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Proyecto de desarrollo</p>
                    <p className="text-sm text-gray-500">Todos los archivos</p>
                  </div>
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900">1</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Archivos Compartidos</h4>
                {sharedFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">Compartido por {file.sharedBy}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatTab;