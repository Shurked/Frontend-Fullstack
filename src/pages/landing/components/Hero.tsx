import React from 'react'

const Hero: React.FC = () => {
  return (
    <section aria-labelledby="hero-title" className="landing-hero">
      <div className="container bg-blue-900">
        <h1 id="hero-title">Bienvenido a Kuska</h1>
        <p>Construye, organiza y comparte plantillas con facilidad.</p>
        <div>
          <a href="#how-it-works" className="btn-primary">Cómo funciona</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
