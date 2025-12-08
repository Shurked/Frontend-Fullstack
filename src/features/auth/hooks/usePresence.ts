import { useEffect, useCallback } from 'react';
import api from '../services/axios.config';

const HEARTBEAT_INTERVAL = 2 * 60 * 1000; // 2 minutos

export const usePresence = () => {
  const updatePresence = useCallback(async (status: 'conectado' | 'ausente' | 'desconectado') => {
    try {
      await api.post('/api/presence/update', { status });
    } catch (err) {
      console.warn('Failed to update presence', err);
    }
  }, []);

  const sendHeartbeat = useCallback(async () => {
    try {
      await api.post('/api/presence/heartbeat');
    } catch (err) {
      console.warn('Failed to send heartbeat', err);
    }
  }, []);

  useEffect(() => {
    // Set status to online when component mounts
    updatePresence('conectado');

    // Send heartbeat every 2 minutes
    const intervalId = setInterval(() => {
      sendHeartbeat();
    }, HEARTBEAT_INTERVAL);

    // Set status to offline when user leaves or closes tab
    const handleBeforeUnload = () => {
      // Use synchronous request for reliability on page unload
      updatePresence('desconectado');
    };

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updatePresence('ausente');
      } else {
        updatePresence('conectado');
        sendHeartbeat();
      }
    };

    // Handle page focus/blur
    const handleFocus = () => {
      updatePresence('conectado');
      sendHeartbeat();
    };

    const handleBlur = () => {
      updatePresence('ausente');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      updatePresence('desconectado');
      clearInterval(intervalId);
    };
  }, [updatePresence, sendHeartbeat]);

  return { updatePresence };
};
