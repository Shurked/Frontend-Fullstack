import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowWorks from './components/HowWorks'
import Functionalities from './components/Functionalities'
import Templates from './components/Templates'
import Footer from './components/Footer'
import FinalCTA from './components/FinalCTA'

const LandingPage: React.FC = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Limpiar timeout anterior
      clearTimeout(scrollTimeout);

      // Si está haciendo scroll (arriba o abajo), ocultar navbar
      if (currentScrollY > 50) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }

      // Cuando el scroll se detiene (300ms sin scroll), mostrar navbar
      scrollTimeout = setTimeout(() => {
        setIsNavbarHidden(false);
      }, 300);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="landing-page-container min-h-screen bg-white">
      <Navbar isHidden={isNavbarHidden} />
      <Hero />

      {/* How it Works Section */}
      <HowWorks />

      {/* Features Section */}
      <Functionalities />

      {/* Templates Section */}
      <Templates />

      {/* Final CTA Section */}
      <FinalCTA />

  {/* Footer está integrado en FinalCTA */}
    </div>
  );
}

export default LandingPage
