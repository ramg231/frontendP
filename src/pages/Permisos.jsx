import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import pastelApi from "../api/PastelApi";

export const Permisos = () => {
  const [permisos, setPermisos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPermiso, setNuevoPermiso] = useState("");

  useEffect(() => {
    obtenerPermisos();
  }, []);

  const obtenerPermisos = async () => {
    try {
      const { data } = await pastelApi.get("/permisos");
      setPermisos(data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo obtener la lista de permisos", "error");
    }
  };

  const handleCrear = async () => {
    if (!nuevoPermiso.trim()) return;
    try {
      await pastelApi.post("/permisos/crear", { nombre: nuevoPermiso });
      Swal.fire("Éxito", "Permiso creado correctamente", "success");
      setNuevoPermiso("");
      obtenerPermisos();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el permiso", "error");
    }
  };

  const handleEditar = (permiso) => {
    setEditingId(permiso.id);
    setNuevoNombre(permiso.nombre);
  };

  const handleActualizar = async (id) => {
    try {
      await pastelApi.put(`/permisos/${id}`, { nombre: nuevoNombre });
      Swal.fire("Actualizado", "El permiso fue actualizado", "success");
      setEditingId(null);
      obtenerPermisos();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el permiso", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gestión de Permisos</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={nuevoPermiso}
          onChange={(e) => setNuevoPermiso(e.target.value)}
          placeholder="Nuevo permiso"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleCrear}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Crear
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {permisos.map((permiso) => (
            <tr key={permiso.id} className="border-t">
              <td className="p-2">{permiso.id}</td>
              <td className="p-2">
                {editingId === permiso.id ? (
                  <input
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  permiso.nombre
                )}
              </td>
              <td className="p-2">
                {editingId === permiso.id ? (
                  <button
                    onClick={() => handleActualizar(permiso.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditar(permiso)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
