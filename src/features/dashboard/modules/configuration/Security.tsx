import React, { useState } from 'react';
import { Save } from 'lucide-react';

function Toggle({ enabled, setEnabled }: { enabled: boolean; setEnabled: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-[#6B53C6]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-6 h-6 transform rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

const Security: React.FC = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#17304d] mb-1">Configuración de Notificaciones</h1>
      <p className="text-[#223A5F] mb-8">Gestiona tus preferencias y configuraciones de cuenta</p>

      {/* Cambiar contraseña */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-2xl p-8 mx-auto mb-8">
        <h2 className="text-lg font-semibold text-[#223A5F] mb-1">Cambiar contraseña</h2>
        <p className="text-[#6B7A90] mb-4 -mt-1">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Nueva Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Nueva Contraseña"
            />
          </div>
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4931A9] bg-gray-50"
              placeholder="Confirmar nueva contraseña"
            />
          </div>
          <div className="flex justify-start mt-8">
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

      {/* 2FA */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-2xl p-8 mx-auto">
        <h2 className="text-lg font-semibold text-[#223A5F] mb-1">Autenticación de dos factores</h2>
        <p className="text-[#6B7A90] mb-4 -mt-1">
          Añade una capa extra de seguridad a tu cuenta
        </p>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-medium text-[#223A5F]">habilita 2FA</div>
            <div className="text-xs text-[#6B7A90]">Usa una aplicación de autenticación para generar códigos</div>
          </div>
          <Toggle enabled={twoFAEnabled} setEnabled={setTwoFAEnabled} />
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="font-medium text-[#223A5F] mb-2">Configurar aplicación de autenticación</div>
          <div className="text-xs text-[#6B7A90] mb-4">
            Escanea el código QR con Google Authenticator, Authy o similar
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-[#4931A9] text-white rounded-lg font-semibold shadow hover:bg-[#37278c] transition"
            >
              Mostrar Codigo QR
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-[#4931A9] text-white rounded-lg font-semibold shadow hover:bg-[#37278c] transition"
            >
              Copia Clave Secreta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;