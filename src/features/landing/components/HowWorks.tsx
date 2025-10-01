import React, { useRef, useEffect, useState } from "react";
import { FolderPlus, FileText, Layout, TrendingUp } from 'lucide-react';

const HowWorks: React.FC = () => {
  const iconRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    function drawLines() {
      if (!containerRef.current) return;
      const icons = iconRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[];
      if (icons.length !== 4) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines: string[] = [];
      for (let i = 0; i < 3; i++) {
        const startRect = icons[i].getBoundingClientRect();
        const endRect = icons[i + 1].getBoundingClientRect();
        const startX = startRect.left - containerRect.left + startRect.width / 2;
        const startY = startRect.top - containerRect.top + startRect.height / 2;
        const endX = endRect.left - containerRect.left + endRect.width / 2;
        const endY = endRect.top - containerRect.top + endRect.height / 2;
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        newLines.push(`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`);
      }
      setLines(newLines);
    }
    drawLines();
    window.addEventListener('resize', drawLines);
    return () => window.removeEventListener('resize', drawLines);
  }, []);

  return (
    <section id="como-funciona" className="bg-white px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-lg font-bold tracking-wider">
            ¿Cómo funciona?
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#172B4D] text-left mb-16 leading-tight">
          4 pasos sencillo de como funciona Kuska
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Conexiones SVG - Solo visible en desktop */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            {lines.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="#E0E7FF"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                opacity={0.7}
              />
            ))}
          </svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Paso 1 - Arriba */}
            <div className="flex flex-col items-start lg:mt-0">
              <div ref={iconRefs[0]} className="w-16 h-16 rounded-full bg-[#4931A9] flex items-center justify-center shadow-lg mb-6">
                <FolderPlus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#172B4D] mb-3">
                Creación del proyecto
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Define el equipo, los permisos y la configuración inicial.
              </p>
            </div>

            {/* Paso 2 - Abajo */}
            <div className="flex flex-col items-start lg:mt-20">
              <div ref={iconRefs[1]} className="w-16 h-16 rounded-full bg-[#4931A9] flex items-center justify-center shadow-lg mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#172B4D] mb-3">
                Creación de tareas y asignación
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Crea tareas, bugs, historias de usuario, épicas, etc.
              </p>
            </div>

            {/* Paso 3 - Arriba */}
            <div className="flex flex-col items-start lg:mt-0">
              <div ref={iconRefs[2]} className="w-16 h-16 rounded-full bg-[#4931A9] flex items-center justify-center shadow-lg mb-6">
                <Layout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#172B4D] mb-3">
                Visualización del trabajo
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Usa el tablero Kanban o Scrum para ver el estado de cada tarea.
              </p>
            </div>

            {/* Paso 4 - Abajo */}
            <div className="flex flex-col items-start lg:mt-20">
              <div ref={iconRefs[3]} className="w-16 h-16 rounded-full bg-[#4931A9] flex items-center justify-center shadow-lg mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#172B4D] mb-3">
                Seguimiento y mejora continua
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Revisa el progreso y ajusta el plan según los resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowWorks;
