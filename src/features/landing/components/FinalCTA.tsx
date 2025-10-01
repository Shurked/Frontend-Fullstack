import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const FinalCTA: React.FC = () => (
  <section className="relative bg-[#4931A9] overflow-hidden flex flex-col items-center justify-center">
    {/* Geometric Shapes */}
    <div className="absolute inset-0">
      <svg className="absolute top-0 right-0 w-64 h-64 opacity-10" viewBox="0 0 200 200" fill="none">
        <path d="M50 0 L200 0 L200 150 L0 200 Z" fill="white" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-96 h-32 opacity-10" viewBox="0 0 400 120" fill="none">
        <path d="M0 120 L400 60 L400 120 Z" fill="white" />
      </svg>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-8 leading-tight">
        Descubre el poder del<br />
        trabajo en equipo
      </h2>

      <Link
        to="auth/register"
        className="px-10 py-3 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-[#4931A9] transition-colors"
      >
        Regístrate gratis
      </Link>
    </div>

    {/* Footer integrado */}
    <div className="relative z-10 w-full">
      <Footer />
    </div>
  </section>
);

export default FinalCTA;
