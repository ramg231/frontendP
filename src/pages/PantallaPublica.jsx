// src/paginas/PantallaPublica.jsx
import { Contacto } from "../components/Contacto";
import { GrillaHorizontalProductos } from "../components/Carrito/GrillaHorizontalProductos";
import { SliderDelDia } from "../components/SliderDelDia";
import { VideoBienvenida } from "../components/VideoBienvenida";

export const PantallaPublica = () => (
  <div className="min-h-screen bg-pink-50">
    <section id="inicio">{/* Hero aquí */}</section>

    <VideoBienvenida />
    <GrillaHorizontalProductos />
    <SliderDelDia />
    
    {/* Importante que tenga el ID para hacer scroll */}
    <section id="contacto">
      <Contacto />
    </section>
  </div>
);
