import React from 'react';
import { Camera, Save } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#17304d] mb-1">Configurción del Perfil</h1>
      <p className="text-[#223A5F] mb-8">Gestiona tus preferencias y configuraciones de cuenta</p>

      {/* Card */}
      <div className="bg-white rounded-lg shadow border border-gray-300 max-w-3xl p-8 mx-auto">
        <h2 className="text-lg font-semibold text-[#223A5F] mb-6">Información del perfil</h2>
        <form className="space-y-6">
          {/* Avatar + Cam Icon */}
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-[#FF7B51] flex items-center justify-center text-3xl font-bold text-black select-none">
                JC
              </div>
              {/* Camera Icon */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-1.5 border border-gray-200">
                <Camera size={22} className="text-gray-700" />
              </span>
            </div>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#223A5F] font-medium mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block text-[#223A5F] font-medium mb-1">Apellido</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Phone"
            />
          </div>
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Cargo</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Cargo"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#4931A9] text-white rounded-lg font-semibold shadow hover:bg-[#37278c] transition"
            >
              <Save size={20} className="mr-1" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;