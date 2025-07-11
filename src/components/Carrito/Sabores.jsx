import   { useEffect, useState } from "react";
import pastelApi from "../../api/PastelApi";

export const Sabores = () => {
  const [sabores, setSabores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");

  const obtenerSabores = async () => {
    try {
      const { data } = await pastelApi.get("opc/sabores");
      setSabores(data.sabores || []);
    } catch {
      alert("Error al cargar sabores");
    }
  };

  useEffect(() => {
    obtenerSabores();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      await pastelApi.post("opc/sabor/crear", { nombre });
      setNombre("");
      obtenerSabores();
    } catch {
      alert("Error al crear sabor");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este sabor?")) return;
    try {
      await pastelApi.delete(`opc/sabor/${id}`);
      obtenerSabores();
    } catch {
      alert("Error al eliminar");
    }
  };

  const handleEditar = (sabor) => {
    setEditando(sabor.id);
    setNombreEdit(sabor.nombre);
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await pastelApi.put(`opc/sabor/${editando}`, { nombre: nombreEdit });
      setEditando(null);
      setNombreEdit("");
      obtenerSabores();
    } catch {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Sabores</h2>
      <form onSubmit={handleCrear} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nuevo sabor"
          className="border px-3 py-2 rounded w-full"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded" type="submit">
          Crear
        </button>
      </form>
      <ul className="space-y-2">
        {sabores.map(sabor =>
          editando === sabor.id ? (
            <li key={sabor.id} className="flex gap-2 items-center">
              <form onSubmit={handleActualizar} className="flex gap-2 w-full">
                <input
                  type="text"
                  value={nombreEdit}
                  onChange={e => setNombreEdit(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
                <button className="bg-green-500 text-white px-2 py-1 rounded" type="submit">
                  Guardar
                </button>
                <button
                  className="bg-gray-300 px-2 py-1 rounded"
                  type="button"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
              </form>
            </li>
          ) : (
            <li key={sabor.id} className="flex justify-between items-center border-b py-2">
              <span>{sabor.nombre}</span>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEditar(sabor)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleEliminar(sabor.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};