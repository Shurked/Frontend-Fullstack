import React from 'react'

const Templates: React.FC = () => {
  const templates = [
    { id: 't1', title: 'Sprint Planning' },
    { id: 't2', title: 'Weekly Meeting' },
    { id: 't3', title: 'Project Onboarding' },
  ]

  return (
    <section aria-labelledby="templates-title" className="landing-templates">
      <div className="container bg-pink-800">
        <h2 id="templates-title">Plantillas</h2>
        <div className="templates-grid">
          {templates.map((tpl) => (
            <article key={tpl.id} className="template-card">
              <h3>{tpl.title}</h3>
              <p>Descripción breve de la plantilla.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Templates
