import React from 'react'

const Functionalities: React.FC = () => {
  const items = [
    'Gestión de plantillas',
    'Permisos por equipo',
    'Integraciones',
    'Historial y versiones',
  ]

  return (
    <section aria-labelledby="features-title" className="landing-features">
      <div className="container bg-amber-600">
        <h2 id="features-title">Funcionalidades</h2>
        <ul>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Functionalities
