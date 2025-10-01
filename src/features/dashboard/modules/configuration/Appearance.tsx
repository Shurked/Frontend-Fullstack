import React, { useState } from 'react';
import { Save, Sun, Moon, Globe, ChevronRight } from 'lucide-react';

const zones = ['America/Lima', 'America/Mexico_City', 'Europe/Madrid'];
const languages = ['Español (España)', 'English (US)', 'Français (France)'];
const homepages = ['Para ti', 'Proyectos', 'Calendario'];

const themeOptions = [
  { value: 'light', label: 'Claro', icon: <Sun className="inline mr-1" size={20} /> },
  { value: 'dark', label: 'Oscuro', icon: <Moon className="inline mr-1" size={20} /> },
  { value: 'system', label: 'Sistema', icon: <Globe className="inline mr-1" size={20} /> },
];

const Appearance: React.FC = () => {
  // General
  const [tz, setTz] = useState(zones[0]);
  const [tzOpen, setTzOpen] = useState(false);

  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);

  const [homepage, setHomepage] = useState(homepages[0]);
  const [homepageOpen, setHomepageOpen] = useState(false);

  // Theme
  const [theme, setTheme] = useState('light');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#17304d] mb-1">Configuración de Apariencia</h1>
      <p className="text-[#223A5F] mb-8">Gestiona tus preferencias y configuraciones de cuenta</p>

      {/* General Card */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-3xl p-8 mx-auto mb-8">
        <h2 className="text-lg font-semibold text-[#223A5F] mb-6">General</h2>
        <div className="space-y-6">
          {/* Timezone */}
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Tu zona horaria</label>
            <div className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setTzOpen((v) => !v)}
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 flex items-center justify-between text-[#223A5F] focus:outline-none"
              >
                {tz}
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${tzOpen ? 'rotate-90' : ''}`} />
              </button>
              {tzOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                  {zones.map(opt => (
                    <div
                      key={opt}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${opt === tz ? 'bg-gray-50 font-semibold' : ''}`}
                      onClick={() => { setTz(opt); setTzOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Language */}
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Idioma</label>
            <div className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 flex items-center justify-between text-[#223A5F] focus:outline-none"
              >
                {lang}
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${langOpen ? 'rotate-90' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                  {languages.map(opt => (
                    <div
                      key={opt}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${opt === lang ? 'bg-gray-50 font-semibold' : ''}`}
                      onClick={() => { setLang(opt); setLangOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Homepage */}
          <div>
            <label className="block text-[#223A5F] font-medium mb-1">Tu página de inicio de Jira</label>
            <div className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setHomepageOpen((v) => !v)}
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 flex items-center justify-between text-[#223A5F] focus:outline-none"
              >
                {homepage}
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${homepageOpen ? 'rotate-90' : ''}`} />
              </button>
              {homepageOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                  {homepages.map(opt => (
                    <div
                      key={opt}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${opt === homepage ? 'bg-gray-50 font-semibold' : ''}`}
                      onClick={() => { setHomepage(opt); setHomepageOpen(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Save */}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 bg-[#4931A9] text-white rounded-lg font-semibold shadow hover:bg-[#37278c] transition"
          >
            <Save size={20} className="mr-1" />
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Theme Card */}
      <div className="bg-white rounded-lg border border-gray-300 max-w-3xl p-8 mx-auto">
        <h2 className="text-lg font-semibold text-[#223A5F] mb-6">Tema</h2>
        <div>
          <label className="block text-[#223A5F] font-medium mb-2">Modo de color</label>
          <div className="flex gap-10 mb-8">
            {themeOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                className={`flex items-center border rounded-lg px-6 py-3 font-medium text-lg transition
                  ${theme === opt.value ? 'border-[#4931A9] bg-gray-100 text-[#4931A9]' : 'border-gray-300 bg-white text-[#223A5F]'}
                `}
                onClick={() => setTheme(opt.value)}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        {/* Save */}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 bg-[#4931A9] text-white rounded-lg font-semibold shadow hover:bg-[#37278c] transition"
          >
            <Save size={20} className="mr-1" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appearance;