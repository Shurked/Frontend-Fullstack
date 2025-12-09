import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000/webrtc';

interface UseWebRTCSocketProps {
  roomId?: string;
  onUserJoined?: (userId: string) => void;
  onUserLeft?: (userId: string) => void;
  onOffer?: (data: { signal: any; userId: string }) => void;
  onAnswer?: (data: { signal: any; userId: string }) => void;
  onIceCandidate?: (data: { signal: any; userId: string }) => void;
  onRoomParticipants?: (participants: string[]) => void;
}

export const useWebRTCSocket = ({
  roomId,
  onUserJoined,
  onUserLeft,
  onOffer,
  onAnswer,
  onIceCandidate,
  onRoomParticipants
}: UseWebRTCSocketProps = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    // Connect to Socket.IO
    const socket = io(SOCKET_URL, {
      auth: { token }
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[WebRTC] Connected to signaling server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('[WebRTC] Disconnected from signaling server');
      setIsConnected(false);
    });

    // Join room if provided
    if (roomId) {
      socket.emit('join-room', { roomId });
    }

    // Event listeners
    if (onUserJoined) {
      socket.on('user-joined', ({ userId }) => onUserJoined(userId));
    }

    if (onUserLeft) {
      socket.on('user-left', ({ userId }) => onUserLeft(userId));
    }

    if (onOffer) {
      socket.on('offer', onOffer);
    }

    if (onAnswer) {
      socket.on('answer', onAnswer);
    }

    if (onIceCandidate) {
      socket.on('ice-candidate', onIceCandidate);
    }

    if (onRoomParticipants) {
      socket.on('room-participants', ({ participants }) => onRoomParticipants(participants));
    }

    return () => {
      if (roomId) {
        socket.emit('leave-room', { roomId });
      }
      socket.disconnect();
    };
  }, [roomId, onUserJoined, onUserLeft, onOffer, onAnswer, onIceCandidate, onRoomParticipants]);

  const sendOffer = (signal: any, targetUserId: string) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit('offer', { roomId, signal, targetUserId });
    }
  };

  const sendAnswer = (signal: any, targetUserId: string) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit('answer', { roomId, signal, targetUserId });
    }
  };

  const sendIceCandidate = (signal: any, targetUserId: string) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit('ice-candidate', { roomId, signal, targetUserId });
    }
  };

  const toggleAudio = (isMuted: boolean) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit('toggle-audio', { roomId, isMuted });
    }
  };

  const toggleVideo = (isVideoOff: boolean) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit('toggle-video', { roomId, isVideoOff });
    }
  };

  return {
    isConnected,
    sendOffer,
    sendAnswer,
    sendIceCandidate,
    toggleAudio,
    toggleVideo
  };
};
