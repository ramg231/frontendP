// src/componentes/productos/ProductosRelacionados.jsx

import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export const ProductosRelacionados = ({ productos }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg border overflow-hidden"
          >
            <div className="relative aspect-square">
              <img src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} className="object-cover w-full h-full" />
              <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded-full shadow">{producto.categoria}</div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{producto.nombre}</h3>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(producto.puntuacion) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">({producto.puntuacion})</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">${producto.precio}</span>
              </div>

              <Link to={`/producto/${producto.id}`}>
                <button className="w-full py-2 text-sm bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white rounded-md">
                  Ver Producto
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
