import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthdate: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic will be implemented here
    console.log("Register attempt:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple decorative background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4931A9] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5940BA] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5940BA] rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Right side - Register form */}
  <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 bg-white relative min-h-screen">
        {/* Small decorative circles for mobile */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4931A9] rounded-full translate-x-1/2 -translate-y-1/2 lg:hidden"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4931A9] rounded-full -translate-x-1/2 translate-y-1/2 lg:hidden"></div>

  <div className="w-full max-w-sm relative z-10 flex flex-col justify-center h-full">
          {/* Logo + KUSKA SVG */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="/kuska-logov2.png"
              alt="Kuska Logo"
              className="w-16 h-16 mb-2"
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
          <h1 className="text-xl md:text-2xl font-bold text-[#172B4D] mb-4">
            Regístrate
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[#172B4D] font-medium mb-2">
                Nombre Completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ingresa tu nombre..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#172B4D] font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="birthdate" className="block text-[#172B4D] font-medium mb-2">
                Nacimiento
              </label>
              <input
                id="birthdate"
                name="birthdate"
                type="text"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="MM / DD / YY"
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-[#172B4D] font-medium mb-2">
                Celular
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+51 000 / 000 / 000"
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[#172B4D] font-medium mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresar..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[#172B4D] font-medium mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ingresar..."
                className="w-full px-4 py-3 border border-[#DFE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#4931A9] hover:bg-[#3d2889] text-white font-semibold py-3 rounded-lg transition-colors mt-6"
            >
              Registrarse
            </button>

            {/* Login link */}
            <p className="text-center text-[#7A869A] text-sm pt-2">
              Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-[#4931A9] hover:underline font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
