import React from 'react'

const HowWorks: React.FC = () => {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="landing-how">
      <div className="container bg-red-500">
        <h2 id="how-title">Cómo funciona</h2>
        <ol>
          <li>Crear o seleccionar una plantilla</li>
          <li>Personalizar contenido y permisos</li>
          <li>Compartir con tu equipo</li>
        </ol>
      </div>
    </section>
  )
}

export default HowWorks
