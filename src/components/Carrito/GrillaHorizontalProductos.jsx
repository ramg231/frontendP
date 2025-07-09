// src/components/Carrito/GrillaHorizontalProductos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pastelApi from "../../api/pastelApi";
import { ShoppingCart } from "lucide-react";

export const GrillaHorizontalProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await pastelApi.get("/publica/aleatorios");
        setProductos(data.productos);
      } catch (error) {
        console.error("Error al obtener productos aleatorios:", error);
      }
    };
    fetchProductos();
  }, []);

  if (productos.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-pink-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Te puede interesar</h2>
        <p className="text-lg text-gray-600">
          Explora otros productos deliciosos que podrían encantarte
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="w-full h-60 object-cover"
              />
             
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {producto.nombre}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {producto.descripcion || "Producto de pastelería delicioso."}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-pink-600">S/.{producto.precio}</span>
                <Link
                  to={`/producto/${producto.id}`}
                  className="bg-pink-500 text-white px-3 py-2 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2 text-sm"
                >
                  <ShoppingCart size={16} />
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
