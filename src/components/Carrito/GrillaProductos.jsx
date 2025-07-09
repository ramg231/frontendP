// src/componentes/productos/GrillaProductos.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

export const GrillaProductos = ({ productos, paginaActual, totalPaginas, setPaginaActual }) => {
  const alternarFavorito = (id) => {
 
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-gray-600">
        Mostrando {productos.length} productos
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="group relative bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden border">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <button
                onClick={() => alternarFavorito(producto.id)}
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full"
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>

              <div className="absolute top-3 left-3 text-xs bg-white px-2 py-1 rounded-full shadow">
                {producto.categoria}
              </div>

              {producto.destacado && (
                <div className="absolute bottom-3 left-3 text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                  Hoy
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600">
                {producto.nombre}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-300" />
                ))}
                <span className="text-sm text-gray-600 ml-1">(5.0)</span>
              </div>

              <div className="flex items-center justify-between mt-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  S/ {parseFloat(producto.precio).toFixed(2)}
                </span>
              </div>

              <Link to={`/producto/${producto.id}`} className="block mt-2">
                <button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white py-2 rounded-lg">
                  Ver Detalles
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {productos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧁</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">Intenta ajustar los filtros para ver más opciones</p>
        </div>
      )}

      {/* Paginador */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 bg-pink-100 rounded hover:bg-pink-200 disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="px-3 py-1 text-gray-700">Página {paginaActual} de {totalPaginas}</span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="px-3 py-1 bg-pink-100 rounded hover:bg-pink-200 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
