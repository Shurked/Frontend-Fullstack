import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

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

const Notification: React.FC = () => {
  // State for toggles
  const [emailIssue, setEmailIssue] = useState(true);
  const [emailMention, setEmailMention] = useState(true);
  const [emailProject, setEmailProject] = useState(true);
  const [emailSprint, setEmailSprint] = useState(true);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [frequency, setFrequency] = useState('Instantáneas');
  const [frequencyOpen, setFrequencyOpen] = useState(false);

  const frequencyOptions = ['Instantáneas', 'Cada Hora', 'Diarias', 'Semanal'];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#17304d] mb-1">Configuración de Notificaciones</h1>
      <p className="text-[#223A5F] mb-8">Gestiona tus preferencias y configuraciones de cuenta</p>

      {/* Email Notification Card */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-2xl p-8 mx-auto mb-8">
        <h2 className="text-lg font-semibold text-[#223A5F]">Notificaciones por email</h2>
        <p className="text-[#6B7A90] mb-6 -mt-1">Configura qué notificaciones quieres recibir por correo electrónico</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#223A5F]">Issues asignados por mi</div>
              <div className="text-xs text-[#6B7A90]">Recibe notificaciones cuando te asignen un nuevo issue</div>
            </div>
            <Toggle enabled={emailIssue} setEnabled={setEmailIssue} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#223A5F]">Menciones</div>
              <div className="text-xs text-[#6B7A90]">Cuando alguien te mencione</div>
            </div>
            <Toggle enabled={emailMention} setEnabled={setEmailMention} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#223A5F]">Actualizaciones de proyecto</div>
              <div className="text-xs text-[#6B7A90]">Cambios importantes en proyectos que sigues</div>
            </div>
            <Toggle enabled={emailProject} setEnabled={setEmailProject} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#223A5F]">Reporte de sprint</div>
              <div className="text-xs text-[#6B7A90]">Resumen semanal del progreso del sprint</div>
            </div>
            <Toggle enabled={emailSprint} setEnabled={setEmailSprint} />
          </div>
        </div>
      </div>

      {/* Push Notification Card */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-2xl p-8 mx-auto">
        <h2 className="text-lg font-semibold text-[#223A5F]">Notificaciones push</h2>
        <p className="text-[#6B7A90] mb-6 -mt-1">Configura las notificaciones en tiempo real</p>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-medium text-[#223A5F]">habilitar notificaciones push</div>
            <div className="text-xs text-[#6B7A90]">Recibe notificaciones instantáneas en tu navegador</div>
          </div>
          <Toggle enabled={pushEnabled} setEnabled={setPushEnabled} />
        </div>
        <div>
          <div className="font-medium text-[#223A5F]">Frecuencia de notificaciones</div>
          <div className="text-xs text-[#6B7A90] mb-2">Cuando alguien te mencione</div>
          {/* Custom select */}
          <div className="relative w-full max-w-xs">
            <button
              type="button"
              className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 flex items-center justify-between text-[#223A5F] focus:outline-none"
              onClick={() => setFrequencyOpen(!frequencyOpen)}
            >
              {frequency}
              <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${frequencyOpen ? 'rotate-90' : ''}`} />
            </button>
            {frequencyOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                {frequencyOptions.map(opt => (
                  <div
                    key={opt}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${opt === frequency ? 'bg-gray-50 font-semibold' : ''}`}
                    onClick={() => { setFrequency(opt); setFrequencyOpen(false); }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;