// src/components/Navbar.jsx
import logoPasteleria from "../assets/logo.png"; // ajusta el path según tu estructura

import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center">
           <NavLink
            to="/">
          <img
            src={logoPasteleria}
            alt="Logo Dulce Encanto"
            className="w-32 h-32 object-contain"
          />
          </NavLink>
        </div>

        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-pink-600 font-semibold"
                : "text-gray-700 hover:text-pink-600"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive
                ? "text-pink-600 font-semibold"
                : "text-gray-700 hover:text-pink-600"
            }
          >
            Productos
          </NavLink>

          {/* Link directo con ancla hacia el componente */}
          <a
            href="#contacto"
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            Contacto
          </a>
        </div>
      </div>
    </div>
  </nav>
);
