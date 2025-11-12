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

        // Calcular el centro exacto de cada círculo
        const startX = startRect.left - containerRect.left + startRect.width / 2;
        const startY = startRect.top - containerRect.top + startRect.height / 2;
        const endX = endRect.left - containerRect.left + endRect.width / 2;
        const endY = endRect.top - containerRect.top + endRect.height / 2;

        // Puntos de control para curva suave que sigue el desnivel
        const midX = (startX + endX) / 2;
        const controlY = (startY + endY) / 2;

        newLines.push(`M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`);
      }
      setLines(newLines);
    }

    // Ejecutar después de que el DOM esté listo
    const timer = setTimeout(() => {
      drawLines();
    }, 200);

    drawLines();
    window.addEventListener('resize', drawLines);

    return () => {
      window.removeEventListener('resize', drawLines);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="como-funciona" className="bg-white px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-lg font-bold tracking-wider">
            __ Cómo Funciona ""
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-[#172B4D] text-left mb-16 leading-tight max-w-2xl">
          4 Pasos sencillos de cómo funciona Kuska
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Conexiones SVG - Solo visible en desktop */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            {lines.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="#000000"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,6"
                opacity={0.3}
              />
            ))}
          </svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-6">
            {/* Paso 1 */}
            <div className="flex flex-col items-start lg:items-center lg:text-center">
              <div ref={iconRefs[0]} className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <FolderPlus className="w-12 h-12 text-[#172B4D]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#172B4D] mb-2">
                Creación del proyecto
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Define el equipo, los permisos y la configuración inicial.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-start lg:items-center lg:text-center lg:mt-20">
              <div ref={iconRefs[1]} className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <FileText className="w-12 h-12 text-[#172B4D]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#172B4D] mb-2">
                Creación de tareas y asignación
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Crea tareas, bugs, historias de usuario, épicas, etc.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-start lg:items-center lg:text-center">
              <div ref={iconRefs[2]} className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <Layout className="w-12 h-12 text-[#172B4D]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#172B4D] mb-2">
                Visualización del trabajo
              </h3>
              <p className="text-[#7A869A] text-sm leading-relaxed">
                Usa el tablero Kanban o Scrum para ver el estado de cada tarea.
              </p>
            </div>

            {/* Paso 4 */}
            <div className="flex flex-col items-start lg:items-center lg:text-center lg:mt-20">
              <div ref={iconRefs[3]} className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <TrendingUp className="w-12 h-12 text-[#172B4D]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#172B4D] mb-2">
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
