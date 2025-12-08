import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import api from '../../../../../auth/services/axios.config';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: (added: { id?: string; name?: string; email?: string; avatar?: string }[]) => void;
}

const AddPersonModal: React.FC<AddPersonModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [inviteInput, setInviteInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteInput.trim()) {
      (async () => {
        try {
          const resp = await api.post('/api/people/invite', { input: inviteInput });
          const processed = resp.data?.data?.processed || [];

          // For each processed entry that matches an existing user, try to create friendship
          const created: any[] = [];
          const alreadyFriends: any[] = [];
          for (const p of processed) {
            if (p.exists && p.userId) {
              try {
                const r = await api.post('/api/people/friends', { friendId: p.userId });
                const payload = r?.data?.data;
                if (payload?.created) {
                  const f = payload.friend;
                  created.push({ id: f.id, name: f.name, email: f.email, avatar: f.avatar });
                } else if (payload && payload.created === false) {
                  // already friends
                  alreadyFriends.push({ id: p.userId, display: p.display || p.input || p.email || p.name });
                }
              } catch (err) {
                // ignore individual failures
                console.warn('Could not add friend for', p, err);
              }
            }
          }

          if (onAdded && created.length) onAdded(created);

          // UX feedback
          if (created.length > 0) {
            toast.success(`Añadidos: ${created.map(c => c.name || c.email).join(', ')}`);
          }
          if (alreadyFriends.length > 0) {
            toast(`Ya son amigos: ${alreadyFriends.map(a => a.display).join(', ')}`);
          }
        } catch (err) {
          console.error('Invite failed', err);
        } finally {
          onClose();
          setInviteInput('');
        }
      })();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Añadir personas</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Campo de invitación */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres o email
            </label>
            <textarea
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              placeholder="e.g., Jorge, jorge@gmail.com"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!inviteInput.trim()}
              className="px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;