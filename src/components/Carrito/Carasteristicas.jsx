import React, { useEffect, useState } from "react";
import pastelApi from "../../api/PastelApi";

export const Caracteristicas = ({ productoId }) => {
  const [tamanos, setTamanos] = useState([]);
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await pastelApi.get(`/publica/tamanos-sabores/${productoId}`);
        setTamanos(data.tamanos || []);
        setSabores(data.sabores || []);
      } catch (error) {
        setTamanos([]);
        setSabores([]);
      }
    };
    if (productoId) fetchData();
  }, [productoId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-4">Caracteristicas del Producto</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Tamaños disponibles:</span>
          {tamanos.length > 0 ? (
            <ul className="font-medium list-disc ml-4">
              {tamanos.map((t) => (
                <li key={t.id}>
                  {t.nombre}
                  {typeof t.porciones !== "undefined" && t.porciones !== null && t.porciones !== ""
                    ? ` (${t.porciones} porciones)`
                    : ""}
                  - S/ {t.precio}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium">No disponible</p>
          )}
        </div>
        <div>
          <span className="text-gray-600">Sabores:</span>
          {sabores.length > 0 ? (
            <ul className="font-medium list-disc ml-4">
              {sabores.map((s) => (
                <li key={s.id}>{s.nombre}</li>
              ))}
            </ul>
          ) : (
            <p className="font-medium">No disponible</p>
          )}
        </div>
      
      </div>
    </div>
  );
};