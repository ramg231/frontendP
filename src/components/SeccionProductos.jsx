// src/components/SeccionProductos.jsx
import { ProductoCard } from "./ProductoCard"


export const SeccionProductos = ({ id, titulo, productos }) => (
  <section id={id} className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-600">{titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productos.map(p => <ProductoCard key={p.id} producto={p} />)}
      </div>
    </div>
  </section>
)
 
