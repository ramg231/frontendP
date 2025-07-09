// src/components/Contacto.jsx
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export const Contacto = () => {
  return (
    <section id="contacto" className="  bg-[#0d1027] text-white flex flex-col justify-between">
      <div className="flex-grow py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-400">Contáctanos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-start gap-4">
              <Phone className="text-pink-400 mt-1" />
              <div>
                <h4 className="font-semibold text-pink-400">Teléfono</h4>
                <p className="text-gray-300">+51 987 654 321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-pink-400 mt-1" />
              <div>
                <h4 className="font-semibold text-pink-400">Correo</h4>
                <p className="text-gray-300">contacto@dulceencanto.pe</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-pink-400 mt-1" />
              <div>
                <h4 className="font-semibold text-pink-400">Dirección</h4>
                <p className="text-gray-300">Av. Principal 123, Lima, Perú</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            © 2024 Dulce Encanto. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};
