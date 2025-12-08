import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AddPersonModal } from '../modals';
import api from '../../../../../auth/services/axios.config';

interface Person {
  id: string;
  name: string;
  trabajo?: string;
  ubicacion?: string;
  organizacion?: string;
  cargo?: string;
  avatar?: string;
  initials: string;
  color: string;
}

const PersonasTab: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [personas, setPersonas] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email?: string; avatar?: string } | null>(null);
    const [friends, setFriends] = useState<Person[]>([]);
  // Load people from API
  useEffect(() => {
    // load people list
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const resp = await api.get('/api/people', { params: { search: searchTerm, limit: 50 } });
        const items = resp.data?.data?.items || [];
        const mapped: Person[] = items.map((u: any) => ({
          id: u.id,
          name: u.name,
          trabajo: undefined,
          ubicacion: undefined,
          organizacion: undefined,
          cargo: undefined,
          avatar: u.avatar || undefined,
          initials: (u.name || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(),
          color: 'bg-gray-400'
        }));
        setPersonas(mapped);
      } catch (e) {
        console.error('Failed to load people', e);
      } finally {
        setLoading(false);
      }
    };
    load();

    // load current user and friends
    (async () => {
      try {
        const [me, friendsResp] = await Promise.all([
          api.get('/api/auth/me'),
          api.get('/api/people/friends'),
        ]);

        if (me?.data?.data) {
          setCurrentUser({ id: me.data.data.id, name: me.data.data.completeName || me.data.data.email, email: me.data.data.email, avatar: me.data.data.avatar });
        }

        const remoteFriends = friendsResp?.data?.data?.items || [];
        const mappedFriends: Person[] = remoteFriends.map((f: any) => ({ id: f.id, name: f.name, avatar: f.avatar || undefined, initials: (f.name || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(), color: 'bg-gray-400' }));
        setFriends(mappedFriends);

        // fallback: only use localStorage if remote returned empty
        if (mappedFriends.length === 0) {
          try {
            const raw = localStorage.getItem('kuska_friends');
            if (raw) setFriends(JSON.parse(raw as string) as Person[]);
          } catch (err) {
            console.warn('Failed to load friends from localStorage', err);
          }
        }
      } catch (err) {
        console.warn('Could not fetch current user or friends', err);
        // remote failed: fallback to localStorage
        try {
          const raw = localStorage.getItem('kuska_friends');
          if (raw) setFriends(JSON.parse(raw as string) as Person[]);
        } catch (err2) {
          console.warn('Failed to load friends from localStorage after remote error', err2);
        }
      }
    })();

    return () => { mounted = false };
  }, [searchTerm]);

  const filters = [
    { key: 'trabajo', label: 'Trabajo' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'organizacion', label: 'Organización' },
    { key: 'cargo', label: 'Cargo' }
  ];

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const filteredPersonas = personas.filter(persona =>
    persona.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonClick = (personaId: string) => {
    navigate(`/dashboard/profile/${personaId}`);
  };
  const isFriend = (personaId: string) => friends.some(f => f.id === personaId);
  const addFriend = async (personaId: string, personaName?: string) => {
    try {
      const r = await api.post('/api/people/friends', { friendId: personaId });
      const payload = r?.data?.data;
      if (payload?.created) {
        const f = payload.friend;
        const newFriend: Person = { id: f.id, name: f.name || f.email, avatar: f.avatar || undefined, initials: (f.name || f.email || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(), color: 'bg-gray-400' };
        const newFriends = [...friends, newFriend];
        setFriends(newFriends);
        try { localStorage.setItem('kuska_friends', JSON.stringify(newFriends)); } catch {}
        toast.success(`Añadido: ${newFriend.name}`);
      } else if (payload && payload.created === false) {
        toast(`${personaName || 'Esta persona'} ya es tu amiga.`);
        // Refresh friends from server to ensure UI is in sync
        try {
          const friendsResp = await api.get('/api/people/friends');
          const remoteFriends = friendsResp?.data?.data?.items || [];
          const mappedFriends: Person[] = remoteFriends.map((f: any) => ({ id: f.id, name: f.name, avatar: f.avatar || undefined, initials: (f.name || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(), color: 'bg-gray-400' }));
          setFriends(mappedFriends);
          try { localStorage.setItem('kuska_friends', JSON.stringify(mappedFriends)); } catch {}
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      console.warn('Could not add friend', err);
      toast.error('No se pudo agregar. Intenta de nuevo.');
    }
  };
  const handleAdded = (added: { id?: string; name?: string; email?: string; avatar?: string }[]) => {
    // Add to friends list in state and persist to localStorage
    const newFriends = [...friends];
    added.forEach(a => {
      const exists = newFriends.find(f => f.id === (a.id || a.email));
      if (!exists) {
        newFriends.push({ id: a.id || a.email || String(Date.now()), name: a.name || a.email || 'Sin nombre', avatar: a.avatar || undefined, initials: (a.name || a.email || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase(), color: 'bg-gray-400' });
      }
    });
    setFriends(newFriends);
    try {
      localStorage.setItem('kuska_friends', JSON.stringify(newFriends));
    } catch (err) {
      console.warn('Could not save friends', err);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header con título y botón agregar */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-700">Personas con las que trabajas</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#4931A9] text-white rounded-lg hover:bg-[#3f2890] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir</span>
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar personas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => toggleFilter(filter.key)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                activeFilters.includes(filter.key)
                  ? 'bg-[#4931A9] text-white border-[#4931A9]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de personas */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Mostrar sólo el usuario actual en el apartado de equipo */}
          {currentUser ? (
            <div
              onClick={() => handlePersonClick(currentUser.id)}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-[#4931A9] transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 bg-[#4931A9] rounded-full flex items-center justify-center text-white font-semibold`}>
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{currentUser.name}</h3>
                {currentUser.email && <p className="text-xs text-gray-400">{currentUser.email}</p>}
              </div>
              <div className="text-right">
                {/* placeholder for extra info */}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Cargando usuario...</div>
          )}

          {/* Lista de amigos (cliente) */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Mis amigos</h4>
            <div className="space-y-3">
              {friends.length === 0 && (
                <div className="text-sm text-gray-500">No tienes amigos aún. Usa "Añadir" para agregarlos.</div>
              )}
              {friends.map((f) => (
                <div key={f.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm cursor-pointer" onClick={() => handlePersonClick(f.id)}>
                  <div className={`w-10 h-10 ${f.color} rounded-full flex items-center justify-center text-white font-medium`}>{f.initials}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{f.name}</div>
                    {f.avatar && <div className="text-xs text-gray-400">{f.avatar}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar persona */}
      <AddPersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdded={handleAdded}
      />
    </div>
  );
};

export default PersonasTab;