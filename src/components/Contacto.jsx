// src/components/Contacto.jsx
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Contacto = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section id="contacto" className="  bg-[#0d1027] text-white flex flex-col justify-between">
      <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-400">Contáctanos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
            <div className="flex items-center gap-4">
              <Phone className="text-pink-400 mt-1" />
              <div>
                <h4 className="font-semibold text-pink-400">Teléfono</h4>
                <p className="text-gray-300">+51 965 710 504</p>
              </div>
            </div>

           

             
       
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            © 2024 Pastelería Jazmin. Todos los derechos reservados.
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
