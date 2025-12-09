import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, X } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import api from '../../../../../auth/services/axios.config';
import { toast } from 'react-hot-toast';

interface CallRoomProps {
  roomId: string;
  teamId: string;
  onClose: () => void;
}

interface Participant {
  userId: string;
  userName: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
}

const SOCKET_URL = 'http://localhost:3000/webrtc';

const CallRoom: React.FC<CallRoomProps> = ({ roomId, teamId, onClose }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosRef = useRef<{ [key: string]: HTMLVideoElement }>({});
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localStreamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Get current user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const resp = await api.get('/api/auth/me');
        setCurrentUser(resp?.data?.data?.user);
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };
    loadUser();
  }, []);

  // Create peer connection
  const createPeerConnection = (userId: string, isInitiator: boolean): RTCPeerConnection => {
    if (peerConnectionsRef.current[userId]) {
      return peerConnectionsRef.current[userId];
    }

    const configuration: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };

    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionsRef.current[userId] = peerConnection;

    // Add local stream tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          to: userId,
          candidate: event.candidate
        });
      }
    };

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      console.log('Received remote track from:', userId);
      const remoteVideo = remoteVideosRef.current[userId];
      if (remoteVideo && event.streams[0]) {
        remoteVideo.srcObject = event.streams[0];
      }
    };

    // Create and send offer if initiator
    if (isInitiator && socketRef.current) {
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
          if (peerConnection.localDescription && socketRef.current) {
            socketRef.current.emit('offer', {
              to: userId,
              offer: peerConnection.localDescription
            });
          }
        })
        .catch(err => console.error('Error creating offer:', err));
    }

    return peerConnection;
  };

  // Initialize Socket.IO connection
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('No autorizado');
      onClose();
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
      socket.emit('join-room', { roomId });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('reconnecting', (attemptNumber) => {
      console.log('Reconnecting attempt:', attemptNumber);
    });

    socket.on('reconnect', () => {
      console.log('Reconnected successfully');
      setIsConnected(true);
      socket.emit('join-room', { roomId });
    });

    socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect');
      toast.error('No se pudo reconectar al servidor');
      onClose();
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      console.error('Error message:', error.message);
      if (error.message.includes('Authentication')) {
        toast.error('Error de autenticación. Por favor, inicia sesión nuevamente.');
        onClose();
      } else {
        toast.error('Error de conexión con el servidor');
      }
    });

    socket.on('user-joined', (data: { userId: string; userName: string }) => {
      console.log('User joined:', data);
      createPeerConnection(data.userId, true);
    });

    socket.on('user-left', (data: { userId: string }) => {
      console.log('User left:', data);
      if (peerConnectionsRef.current[data.userId]) {
        peerConnectionsRef.current[data.userId].close();
        delete peerConnectionsRef.current[data.userId];
      }
      setParticipants(prev => prev.filter(p => p.userId !== data.userId));
    });

    socket.on('offer', async (data: { offer: RTCSessionDescriptionInit; from: string }) => {
      console.log('Received offer from:', data.from);
      const peerConnection = createPeerConnection(data.from, false);
      
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        
        socket.emit('answer', {
          to: data.from,
          answer: answer
        });
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    });

    socket.on('answer', async (data: { answer: RTCSessionDescriptionInit; from: string }) => {
      console.log('Received answer from:', data.from);
      const peerConnection = peerConnectionsRef.current[data.from];
      if (peerConnection) {
        try {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        } catch (err) {
          console.error('Error handling answer:', err);
        }
      }
    });

    socket.on('ice-candidate', async (data: { candidate: RTCIceCandidateInit; from: string }) => {
      console.log('Received ICE candidate from:', data.from);
      const peerConnection = peerConnectionsRef.current[data.from];
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error('Error adding ICE candidate:', err);
        }
      }
    });

    socket.on('room-participants', (data: { participants: Participant[] }) => {
      console.log('Room participants:', data.participants);
      if (currentUser) {
        setParticipants(data.participants.filter(p => p.userId !== currentUser.id));
      }
    });

    return () => {
      socket.emit('leave-room', { roomId });
      socket.disconnect();
    };
  }, [roomId, onClose, currentUser]);

  // Initialize media stream
  useEffect(() => {
    const initMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Join the call room
        await api.post(`/api/calls/rooms/${roomId}/join`);
        toast.success('Conectado a la llamada');
      } catch (err: any) {
        console.error('Failed to get media devices', err);
        
        let errorMessage = 'No se pudo acceder a la cámara o micrófono';
        
        if (err.name === 'NotReadableError') {
          errorMessage = 'Cámara/micrófono en uso. Cierra otras pestañas o aplicaciones que estén usando la cámara.';
        } else if (err.name === 'NotAllowedError') {
          errorMessage = 'Permiso denegado. Por favor, permite el acceso a cámara/micrófono.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'No se encontró cámara o micrófono conectado.';
        }
        
        setMediaError(errorMessage);
        toast.error(errorMessage);
        
        // Close the call if media failed
        setTimeout(() => onClose(), 3000);
      }
    };

    initMediaStream();

    // Cleanup on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Close all peer connections
      Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    };
  }, [roomId]);

  // Toggle audio
  const handleToggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        if (socketRef.current) {
          socketRef.current.emit('toggle-audio', { roomId });
        }
      }
    }
  };

  // Toggle video
  const handleToggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        if (socketRef.current) {
          socketRef.current.emit('toggle-video', { roomId });
        }
      }
    }
  };

  // End call
  const handleEndCall = async () => {
    try {
      // Stop all media tracks first
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Close all peer connections
      Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
      
      // Leave the room via API
      await api.post(`/api/calls/rooms/${roomId}/leave`);
    } catch (err) {
      console.error('Failed to leave call', err);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Llamada en curso</h2>
          <p className="text-sm text-gray-400">
            {participants.length + 1} participante{participants.length !== 0 ? 's' : ''}
            {isConnected ? ' • Conectado' : ' • Desconectado'}
          </p>
        </div>
        <button
          onClick={handleEndCall}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Media Error Message */}
      {mediaError && (
        <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error de Medios</h3>
            <p className="text-gray-300 mb-6 max-w-md">{mediaError}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Cerrar Llamada
            </button>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className={`grid gap-4 h-full ${
          participants.length === 0 ? 'grid-cols-1' :
          participants.length === 1 ? 'grid-cols-2' :
          participants.length <= 4 ? 'grid-cols-2 grid-rows-2' :
          'grid-cols-3'
        }`}>
          {/* Local video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">
                Tú {!isVideoEnabled && '(sin video)'}
              </span>
            </div>
          </div>

          {/* Remote videos */}
          {participants.map((participant) => (
            <div
              key={participant.userId}
              className="relative bg-gray-800 rounded-lg overflow-hidden"
            >
              <video
                ref={(el) => {
                  if (el) remoteVideosRef.current[participant.userId] = el;
                }}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full flex items-center space-x-2">
                <span className="text-white text-sm font-medium">
                  {participant.userName}
                </span>
                {participant.isMuted && (
                  <MicOff className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 px-6 py-6 flex items-center justify-center space-x-4">
        <button
          onClick={handleToggleAudio}
          className={`p-4 rounded-full transition-colors ${
            isAudioEnabled
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isAudioEnabled ? 'Silenciar' : 'Activar audio'}
        >
          {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>

        <button
          onClick={handleToggleVideo}
          className={`p-4 rounded-full transition-colors ${
            isVideoEnabled
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isVideoEnabled ? 'Desactivar video' : 'Activar video'}
        >
          {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
        </button>

        <button
          onClick={handleEndCall}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
          title="Colgar"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CallRoom;
