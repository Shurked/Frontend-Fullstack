import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple decorative background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4931A9] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5940BA] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5940BA] rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white relative">
        {/* Small decorative circles for mobile */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4931A9] rounded-full translate-x-1/2 -translate-y-1/2 lg:hidden"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4931A9] rounded-full -translate-x-1/2 translate-y-1/2 lg:hidden"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo + KUSKA SVG */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/kuska-logov2.png"
              alt="Kuska Logo"
              className="w-20 h-20 mb-2"
            />
            <span className="relative inline-block font-bold text-[#172B4D] text-2xl md:text-3xl mb-2">
              KUSKA
              <svg
                className="absolute -bottom-2 left-0 w-full h-2"
                viewBox="0 0 100 8"
                fill="none"
              >
                <path
                  d="M0 4 Q25 0 50 4 T100 4"
                  stroke="#FFAB00"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#172B4D] text-center mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-[#7A869A] text-sm text-center mb-8">
            Encantado de verte de nuevo<br />Inicie Sesión
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-[#172B4D] font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-[#172B4D] font-medium mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#4931A9] hover:bg-[#3d2889] text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Ingresar
            </button>

            {/* Register link */}
            <p className="text-center text-[#7A869A] text-sm">
              No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-[#4931A9] hover:underline font-medium"
              >
                Regístrate gratis
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
