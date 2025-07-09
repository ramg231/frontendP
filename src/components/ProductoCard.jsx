// src/components/ProductoCard.jsx
import { ShoppingCart } from "lucide-react"

export const ProductoCard = ({ producto }) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
    <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover rounded" />
    <h3 className="text-xl font-semibold mt-4">{producto.nombre}</h3>
    <p className="text-sm text-gray-600">{producto.descripcion}</p>
    <div className="flex items-center justify-between mt-4">
      <span className="text-pink-600 font-bold">{producto.precio}</span>
      <button className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 flex items-center gap-1 text-sm">
        <ShoppingCart size={14} />
        Ver más
      </button>
    </div>
  </div>
)
