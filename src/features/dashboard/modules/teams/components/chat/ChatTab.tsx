import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Users, 
  FileText, 
  ChevronDown,
  Download,
  MoreVertical,
  Trash2,
  Upload,
  Edit2,
  X,
  Phone
} from 'lucide-react';
import api from '../../../../../auth/services/axios.config';
import { toast } from 'react-hot-toast';
import CallRoom from '../call/CallRoom';

interface ChatMessage {
  id: string;
  sender: string;
  senderId: string;
  message: string;
  messageType: string;
  timestamp: string;
  avatar?: string;
  isEdited?: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
  type: 'group' | 'direct';
  teamId?: string;
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
  fileUrl?: string;
  uploadedById?: string;
}

type RightPanelView = 'members' | 'shared';

interface ActiveCallRoom {
  id: string;
  teamId: string;
  createdAt: string;
  participants: any[];
}

const ChatTab: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState('');
  const [messagesState, setMessagesState] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>('shared');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ messageId: string; x: number; y: number } | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [activeCallRoom, setActiveCallRoom] = useState<ActiveCallRoom | null>(null);
  const [showCallRoom, setShowCallRoom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Load user teams (channels)
  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        // Get user info
        const userResp = await api.get('/api/auth/me');
        const userData = userResp?.data?.data?.user;
        console.log('User data:', userData);
        setCurrentUser(userData);

        // Get user teams
        const teamsResp = await api.get('/api/teams');
        const teams = teamsResp?.data?.data?.teams || [];
        console.log('Teams found:', teams);

        // For each team, get its channel
        const chatPromises = teams.map(async (team: any) => {
          try {
            const channelsResp = await api.get(`/api/channels?teamId=${team.id}`);
            const channels = channelsResp?.data?.data?.channels || [];
            console.log(`Channels for team ${team.id}:`, channels);
            if (channels.length > 0) {
              const channel = channels[0];
              return {
                id: channel.id,
                name: team.name,
                lastMessage: channel.lastMessage || 'Ningún mensaje',
                timestamp: new Date(channel.lastMessageTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                type: 'group' as const,
                teamId: team.id
              };
            }
          } catch (err) {
            console.warn(`Failed to load channel for team ${team.id}`, err);
          }
          return null;
        });

        const chatsData = (await Promise.all(chatPromises)).filter(c => c !== null) as ChatRoom[];
        console.log('Final chats data:', chatsData);
        setChats(chatsData);

        // Select first chat if available
        if (chatsData.length > 0 && !selectedChat) {
          setSelectedChat(chatsData[0].id);
        }
      } catch (err) {
        console.error('Failed to load chats', err);
        toast.error('Error al cargar los chats');
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  // Load messages when chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const loadMessages = async () => {
      try {
        const resp = await api.get(`/api/messages/channels/${selectedChat}/messages`);
        const msgs = resp?.data?.data?.messages || [];
        const mapped: ChatMessage[] = msgs.map((m: any) => ({
          id: m.id,
          sender: m.userName,
          senderId: m.userId,
          message: m.content,
          messageType: m.messageType,
          timestamp: new Date(m.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          avatar: m.userAvatar,
          isEdited: m.isEdited
        }));
        setMessagesState(mapped);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    loadMessages();
    
    // Poll every 5 seconds for new messages (simple approach)
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  // Load shared files
  useEffect(() => {
    if (!selectedChat) return;

    const loadFiles = async () => {
      try {
        const resp = await api.get(`/api/messages/channels/${selectedChat}/files`);
        const files = resp?.data?.data?.files || [];
        const mapped: SharedFile[] = files.map((f: any) => ({
          id: f.id,
          name: f.fileName,
          type: f.fileType.split('/')[1] || 'file',
          size: `${(f.fileSize / 1024 / 1024).toFixed(2)} MB`,
          sharedBy: f.uploadedBy,
          timestamp: new Date(f.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          fileUrl: f.fileUrl,
          uploadedById: f.uploadedById
        }));
        setSharedFiles(mapped);
      } catch (err) {
        console.error('Failed to load files', err);
      }
    };

    loadFiles();
  }, [selectedChat]);

  // Load team members and their presence
  useEffect(() => {
    if (!selectedChat) return;

    const loadTeamMembers = async () => {
      try {
        const currentChat = chats.find(c => c.id === selectedChat);
        if (!currentChat?.teamId) return;

        // Get team details with members
        const resp = await api.get(`/api/teams/${currentChat.teamId}`);
        const team = resp?.data?.data?.team;
        
        console.log('Team members with presence:', team?.members);
        
        if (team?.members) {
          const mapped: TeamMember[] = team.members.map((m: any) => ({
            id: m.id,
            name: m.name || 'Usuario',
            role: m.role || 'Miembro',
            status: m.status === 'conectado' ? 'online' : 
                   m.status === 'ausente' ? 'away' : 
                   m.status === 'ocupado' ? 'busy' : 'offline',
            avatar: m.avatar
          }));
          setTeamMembers(mapped);
        }
      } catch (err) {
        console.error('Failed to load team members', err);
      }
    };

    loadTeamMembers();
    
    // Refresh members every 30 seconds for presence updates
    const interval = setInterval(loadTeamMembers, 30000);
    return () => clearInterval(interval);
  }, [selectedChat, chats]);

  // Check for active call when chat changes
  useEffect(() => {
    if (!selectedChat) return;
    checkActiveCall();
    
    // Refresh call status every 10 seconds
    const interval = setInterval(checkActiveCall, 10000);
    return () => clearInterval(interval);
  }, [selectedChat, chats]);

  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };

    if (contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [contextMenu]);

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-green-500',
      busy: 'bg-red-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    try {
      const payload = { content: message.trim() };
      await api.post(`/api/messages/channels/${selectedChat}/messages`, payload);
      
      // Reload messages
      const resp = await api.get(`/api/messages/channels/${selectedChat}/messages`);
      const msgs = resp?.data?.data?.messages || [];
      const mapped: ChatMessage[] = msgs.map((m: any) => ({
        id: m.id,
        sender: m.userName,
        message: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        avatar: m.userAvatar
      }));
      setMessagesState(mapped);
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
      toast.error('Error al enviar mensaje');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChat) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      await api.post(`/api/messages/channels/${selectedChat}/files`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Archivo subido correctamente');

      // Reload files
      const resp = await api.get(`/api/messages/channels/${selectedChat}/files`);
      const files = resp?.data?.data?.files || [];
      const mapped: SharedFile[] = files.map((f: any) => ({
        id: f.id,
        name: f.fileName,
        type: f.fileType.split('/')[1] || 'file',
        size: `${(f.fileSize / 1024 / 1024).toFixed(2)} MB`,
        sharedBy: f.uploadedBy,
        timestamp: new Date(f.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        fileUrl: f.fileUrl,
        uploadedById: f.uploadedById
      }));
      setSharedFiles(mapped);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Failed to upload file', err);
      toast.error(err?.response?.data?.message || 'Error al subir archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string, deleteForEveryone: boolean) => {
    try {
      await api.delete(`/api/messages/messages/${messageId}`, {
        data: { deleteForEveryone }
      });

      toast.success(deleteForEveryone ? 'Mensaje eliminado para todos' : 'Mensaje eliminado');
      setContextMenu(null);

      // Reload messages
      const resp = await api.get(`/api/messages/channels/${selectedChat}/messages`);
      const msgs = resp?.data?.data?.messages || [];
      const mapped: ChatMessage[] = msgs.map((m: any) => ({
        id: m.id,
        sender: m.userName,
        senderId: m.userId,
        message: m.content,
        messageType: m.messageType,
        timestamp: new Date(m.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        avatar: m.userAvatar,
        isEdited: m.isEdited
      }));
      setMessagesState(mapped);
    } catch (err: any) {
      console.error('Failed to delete message', err);
      toast.error(err?.response?.data?.message || 'Error al eliminar mensaje');
    }
  };

  const handleEditMessage = (messageId: string, currentContent: string) => {
    setEditingMessageId(messageId);
    setEditingContent(currentContent);
    setContextMenu(null);
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!editingContent.trim()) return;

    try {
      await api.put(`/api/messages/messages/${messageId}`, {
        content: editingContent.trim()
      });

      toast.success('Mensaje editado');
      setEditingMessageId(null);
      setEditingContent('');

      // Reload messages
      const resp = await api.get(`/api/messages/channels/${selectedChat}/messages`);
      const msgs = resp?.data?.data?.messages || [];
      const mapped: ChatMessage[] = msgs.map((m: any) => ({
        id: m.id,
        sender: m.userName,
        senderId: m.userId,
        message: m.content,
        messageType: m.messageType,
        timestamp: new Date(m.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        avatar: m.userAvatar,
        isEdited: m.isEdited
      }));
      setMessagesState(mapped);
    } catch (err: any) {
      console.error('Failed to edit message', err);
      toast.error(err?.response?.data?.message || 'Error al editar mensaje');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  // Call functions
  const createCallRoom = async () => {
    const currentTeamId = chats.find(c => c.id === selectedChat)?.teamId;
    if (!currentTeamId) {
      toast.error('No se pudo identificar el equipo');
      return;
    }

    try {
      const response = await api.post('/api/calls/rooms', { teamId: currentTeamId });
      const newRoom = response?.data?.data?.room;
      setActiveCallRoom(newRoom);
      toast.success('Sala de llamada creada');
    } catch (err: any) {
      console.error('Failed to create call room', err);
      toast.error(err?.response?.data?.message || 'Error al crear sala de llamada');
    }
  };

  const checkActiveCall = async () => {
    const currentTeamId = chats.find(c => c.id === selectedChat)?.teamId;
    if (!currentTeamId) return;

    try {
      const response = await api.get(`/api/calls/rooms/team/${currentTeamId}`);
      const room = response?.data?.data?.room;
      setActiveCallRoom(room || null);
    } catch (err: any) {
      // No active call is okay
      if (err?.response?.status !== 404) {
        console.error('Failed to check active call', err);
      }
    }
  };

  const joinCall = async () => {
    if (!activeCallRoom) return;

    try {
      setShowCallRoom(true);
    } catch (err: any) {
      console.error('Failed to join call', err);
      toast.error(err?.response?.data?.message || 'Error al unirse a la llamada');
    }
  };

  const handleCloseCall = () => {
    setShowCallRoom(false);
    checkActiveCall(); // Refresh call status
  };

  const handleDeleteFile = async (fileId: string, uploadedById: string, deleteForEveryone: boolean) => {
    if (!currentUser || uploadedById !== currentUser.id) {
      toast.error('Solo puedes eliminar tus propios archivos');
      return;
    }

    try {
      await api.delete(`/api/messages/files/${fileId}`, {
        data: { deleteForEveryone }
      });

      toast.success(deleteForEveryone ? 'Archivo eliminado para todos' : 'Archivo eliminado');

      // Reload files
      const resp = await api.get(`/api/messages/channels/${selectedChat}/files`);
      const files = resp?.data?.data?.files || [];
      const mapped: SharedFile[] = files.map((f: any) => ({
        id: f.id,
        name: f.fileName,
        type: f.fileType.split('/')[1] || 'file',
        size: `${(f.fileSize / 1024 / 1024).toFixed(2)} MB`,
        sharedBy: f.uploadedBy,
        timestamp: new Date(f.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        fileUrl: f.fileUrl,
        uploadedById: f.uploadedById
      }));
      setSharedFiles(mapped);
    } catch (err) {
      console.error('Failed to delete file', err);
      toast.error('Error al eliminar archivo');
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4931A9] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando chats...</p>
          </div>
        </div>
      ) : (
        <>
      {/* Left Panel - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* User Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {currentUser?.completeName?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{currentUser?.completeName || currentUser?.email || 'Usuario'}</h3>
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
            <button
              onClick={createCallRoom}
              className="p-2 text-[#4931A9] hover:bg-[#4931A9]/10 rounded-lg transition-colors"
              title="Iniciar llamada"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Call Banner */}
        {activeCallRoom && (
          <div className="px-4 py-3 bg-green-50 border-b border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Llamada en curso
                </span>
                <span className="text-xs text-green-600">
                  {activeCallRoom.participants?.length || 0} participante(s)
                </span>
              </div>
              <button
                onClick={joinCall}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Entrar a la llamada
              </button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {messagesState.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No hay mensajes aún</p>
                <p className="text-sm">Comienza la conversación</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messagesState.map((msg) => {
                const isMyMessage = currentUser && msg.senderId === currentUser.id;
                
                // Parse file data if message type is file
                let fileData = null;
                if (msg.messageType === 'archivo') {
                  try {
                    fileData = JSON.parse(msg.message);
                  } catch (e) {
                    console.error('Failed to parse file data', e);
                  }
                }

                return (
                  <div 
                    key={msg.id} 
                    className="flex items-start space-x-3 group"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        {msg.sender.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        {msg.isEdited && <span className="text-xs text-gray-400 italic">(editado)</span>}
                      </div>
                      
                      {editingMessageId === msg.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(msg.id);
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                          />
                          <button
                            onClick={() => handleSaveEdit(msg.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : fileData ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-md">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#4931A9] rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {fileData.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(fileData.fileSize / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <a
                              href={`http://localhost:3000${fileData.fileUrl}`}
                              download={fileData.fileName}
                              className="p-2 text-[#4931A9] hover:bg-[#4931A9]/10 rounded-lg transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700">{msg.message}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Context Menu */}
          {contextMenu && (
            <div
              ref={contextMenuRef}
              className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              style={{ left: contextMenu.x, top: contextMenu.y }}
            >
              <button
                onClick={() => {
                  const msg = messagesState.find(m => m.id === contextMenu.messageId);
                  if (msg && msg.messageType !== 'archivo') {
                    handleEditMessage(contextMenu.messageId, msg.message);
                  } else {
                    toast.error('No se pueden editar archivos');
                    setContextMenu(null);
                  }
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDeleteMessage(contextMenu.messageId, false)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar para mí</span>
              </button>
              <button
                onClick={() => handleDeleteMessage(contextMenu.messageId, true)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar para todos</span>
              </button>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              {uploading ? <Upload className="w-5 h-5 animate-pulse" /> : <Paperclip className="w-5 h-5" />}
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
              disabled={!message.trim()}
              className="p-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                {sharedFiles.length > 0 ? sharedFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">Compartido por {file.sharedBy}</p>
                      <p className="text-xs text-gray-400">{file.size}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <a
                        href={`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'}${(file as any).fileUrl}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      {currentUser && (file as any).uploadedById === currentUser.id && (
                        <button
                          onClick={() => {
                            const deleteForAll = window.confirm('¿Eliminar para todos? (Cancelar = solo para mí)');
                            handleDeleteFile(file.id, (file as any).uploadedById, deleteForAll);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm">No hay archivos compartidos</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-[#4931A9] hover:text-[#3f2890] text-sm font-medium"
                    >
                      Subir el primero
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </>
      )}

      {/* Call Room Modal */}
      {showCallRoom && activeCallRoom && (
        <CallRoom
          roomId={activeCallRoom.id}
          teamId={activeCallRoom.teamId}
          onClose={handleCloseCall}
        />
      )}
    </div>
  );
};

export default ChatTab;