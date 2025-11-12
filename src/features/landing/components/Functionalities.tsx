import React, { useState } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const Functionalities: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  const features: Feature[] = [
    {
      id: 1,
      title: "Gestión de Tareas",
      description: "Organiza y prioriza tu trabajo de manera eficiente. Crea, asigna y da seguimiento a tareas con estados personalizables. Establece fechas límite, añade etiquetas y gestiona dependencias entre tareas para mantener tu equipo alineado.",
      image:
        "https://media.licdn.com/dms/image/v2/C5612AQHgiN2tGa-WMA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1641942863741?e=2147483647&v=beta&t=GkKhiqDc71UyUZNYdHfEffyV4AfUa9whH2ptPpGD7H4",
      alt: "Gestión de tareas ilustración",
    },
    {
      id: 2,
      title: "Tableros Ágiles",
      description: "Visualiza el flujo de trabajo de tu equipo con tableros Kanban y Scrum intuitivos. Arrastra y suelta tareas entre columnas, gestiona sprints, y obtén una vista clara del progreso del proyecto en tiempo real.",
      image:
        "https://wac-cdn.atlassian.com/dam/jcr:fd5762d3-aa6d-4be9-a55b-8d1f1cf420fb/Screen_Unlimited%20Private%20Repos%20-%20Browser.png?cdnVersion=3002",
      alt: "Tablero ágil ilustración",
    },
    {
      id: 3,
      title: "Métricas",
      description: "Obtén insights valiosos sobre el rendimiento de tu equipo. Analiza la velocidad de entrega, tiempos de ciclo, y burndown charts. Toma decisiones basadas en datos para mejorar continuamente tus procesos.",
      image:
        "https://vilmanunez.com/wp-content/uploads/2014/03/analiticas-newsletter.png",
      alt: "Métricas ilustración",
    },
  ];

  return (
    <section id="funcionalidades" className="bg-[#F8F9FA] px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="text-left mb-4">
          <span className="text-[#FFAB00] text-lg font-bold tracking-wider">
            __ Funcionalidades
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-[#172B4D] text-left mb-16 leading-tight">
          Lo que distingue a "Kuska"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {features.map((feature) => {
            const isSelected = selected === feature.id;
            const isFlipped = flipped === feature.id;

            return (
              <div
                key={feature.id}
                onClick={() => setSelected(feature.id)}
                className="perspective-1000 h-[450px]"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Frente de la tarjeta */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col items-start ${
                      isSelected
                        ? "bg-[#4931A9] text-white shadow-xl scale-105"
                        : "bg-white text-[#172B4D] shadow-md hover:shadow-lg"
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div
                      className={`text-xs font-medium mb-3 tracking-wide ${
                        isSelected ? "text-white/60" : "text-[#7A869A]"
                      }`}
                    >
                      0{feature.id}
                    </div>

                    <h3
                      className={`font-bold text-lg mb-4 leading-snug ${
                        isSelected ? "text-white" : "text-[#172B4D]"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Imagen */}
                    <div className={`w-full h-48 rounded-2xl overflow-hidden mb-auto ${
                      isSelected ? "opacity-90" : "opacity-100"
                    }`}>
                      <img
                        src={feature.image}
                        alt={feature.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full mt-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipped(isFlipped ? null : feature.id);
                        }}
                        className={isSelected
                          ? "bg-[#FFAB00] hover:bg-[#e59900] text-white text-sm font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 w-full"
                          : "border-2 border-[#172B4D] text-[#172B4D] text-sm font-semibold px-8 py-3 rounded-full transition-all hover:bg-[#172B4D] hover:text-white w-full"
                        }
                      >
                        Ver
                      </button>
                    </div>
                  </div>

                  {/* Reverso de la tarjeta */}
                  <div
                    className="absolute w-full h-full backface-hidden rounded-3xl p-6 bg-[#4931A9] text-white shadow-xl flex flex-col"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="text-xs font-medium mb-3 tracking-wide text-white/60">
                      0{feature.id}
                    </div>

                    <h3 className="font-bold text-lg mb-4 leading-snug text-white">
                      {feature.title}
                    </h3>

                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {feature.description}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlipped(null);
                      }}
                      className="bg-[#FFAB00] hover:bg-[#e59900] text-white text-sm font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 w-full mt-6"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Functionalities;
