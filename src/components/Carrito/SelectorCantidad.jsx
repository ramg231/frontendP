// src/componentes/productos/SelectorCantidad.jsx
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export const SelectorCantidad = () => {
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">Cantidad:</span>
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
          disabled={cantidad <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{cantidad}</span>
        <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-2 hover:bg-gray-100">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
