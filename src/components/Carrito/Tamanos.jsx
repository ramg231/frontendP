import { useEffect, useState } from "react";
import pastelApi from "../../api/PastelApi";

export const Tamanos = () => {
  const [tamanos, setTamanos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [porciones, setPorciones] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [porcionesEdit, setPorcionesEdit] = useState("");

  const obtenerTamanos = async () => {
    try {
      const { data } = await pastelApi.get("opc/tamanos");
      setTamanos(data.tamanos || []);
    } catch {
      alert("Error al cargar tamaños");
    }
  };

  useEffect(() => {
    obtenerTamanos();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      await pastelApi.post("opc/tamano/crear", { nombre, porciones });
      setNombre("");
      setPorciones("");
      obtenerTamanos();
    } catch {
      alert("Error al crear tamaño");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este tamaño?")) return;
    try {
      await pastelApi.delete(`opc/tamano/${id}`);
      obtenerTamanos();
    } catch {
      alert("Error al eliminar");
    }
  };

  const handleEditar = (tamano) => {
    setEditando(tamano.id);
    setNombreEdit(tamano.nombre);
    setPorcionesEdit(tamano.porciones || "");
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await pastelApi.put(`opc/tamano/${editando}`, { nombre: nombreEdit, porciones: porcionesEdit });
      setEditando(null);
      setNombreEdit("");
      setPorcionesEdit("");
      obtenerTamanos();
    } catch {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Tamaños</h2>
      <form onSubmit={handleCrear} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nuevo tamaño"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          value={porciones}
          onChange={e => setPorciones(e.target.value)}
          placeholder="Porciones (opcional)"
          className="border px-3 py-2 rounded w-40"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Crear
        </button>
      </form>
      <ul className="space-y-2">
        {tamanos.map(tamano =>
          editando === tamano.id ? (
            <li key={tamano.id} className="flex gap-2 items-center">
              <form onSubmit={handleActualizar} className="flex gap-2 w-full">
                <input
                  type="text"
                  value={nombreEdit}
                  onChange={e => setNombreEdit(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  value={porcionesEdit}
                  onChange={e => setPorcionesEdit(e.target.value)}
                  className="border px-2 py-1 rounded w-40"
                  placeholder="Porciones"
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
            <li key={tamano.id} className="flex justify-between items-center border-b py-2">
              <span>
                <span className="font-semibold">{tamano.nombre}</span>
                {tamano.porciones
                  ? <span className="text-gray-500 text-sm ml-2">({tamano.porciones} porciones)</span>
                  : null}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEditar(tamano)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleEliminar(tamano.id)}
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