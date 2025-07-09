import React, { useEffect, useState } from "react";
import pastelApi from "../api/PastelApi";
import Swal from "sweetalert2";

export const Rol = () => {
  const [roles, setRoles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRolName, setNewRolName] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const { data } = await pastelApi.get("/roles");
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      Swal.fire("Error", "No se pudo cargar la lista de roles", "error");
    }
  };

  const handleEdit = (rol) => {
    setEditing(rol.id);
    setNewName(rol.nombre);
  };

  const handleUpdate = async (id) => {
    try {
      await pastelApi.put(`/roles/${id}`, { nombre: newName });
      Swal.fire("Actualizado", "El rol se actualizó correctamente", "success");
      setEditing(null);
      fetchRoles();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar el rol", "error");
    }
  };

  const handleCreate = async () => {
    if (!newRolName.trim()) {
      return Swal.fire("Campo vacío", "Ingresa un nombre para el nuevo rol", "warning");
    }
    try {
      await pastelApi.post("/roles/crear", { nombre: newRolName });
      Swal.fire("Creado", "El nuevo rol fue creado exitosamente", "success");
      setNewRolName("");
      fetchRoles();
    } catch (error) {
      console.error("Error al crear rol:", error);
      Swal.fire("Error", "No se pudo crear el nuevo rol", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el rol permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await pastelApi.delete(`/roles/${id}`);
        Swal.fire("Eliminado", "El rol fue eliminado", "success");
        fetchRoles();
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire("Error", "No se pudo eliminar el rol", "error");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gestión de Roles</h2>

      {/* Crear nuevo rol */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Nuevo rol:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre del rol"
            value={newRolName}
            onChange={(e) => setNewRolName(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Tabla de roles */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id} className="border-t">
              <td className="p-2">{rol.id}</td>
              <td className="p-2">
                {editing === rol.id ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  rol.nombre
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editing === rol.id ? (
                  <button
                    onClick={() => handleUpdate(rol.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(rol)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(rol.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
