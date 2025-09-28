import React from 'react'
import Hero from './components/Hero'
import HowWorks from './components/HowWorks'
import Functionalities from './components/Functionalities'
import Templates from './components/Templates'

const LandingPage: React.FC = () => {
  return (
    <main>
      <Hero />
      <HowWorks />
      <Functionalities />
      <Templates />
    </main>
  )
}

export default LandingPage
