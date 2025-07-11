 
import { Sabores } from "../components/Carrito/Sabores";
import { Tamanos } from "../components/Carrito/Tamanos";

export const AdminOpciones = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 grid gap-8 md:grid-cols-2">
      <Sabores />
      <Tamanos />
    </div>
  );
};