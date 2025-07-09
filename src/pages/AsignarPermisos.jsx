// src/pages/AsignarPermisos.jsx
import { useEffect, useState } from "react";
import pastelApi from "../api/pastelApi";
 
import Swal from "sweetalert2";

export const AsignarPermisos = () => {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [permisosAsignados, setPermisosAsignados] = useState([]);

  useEffect(() => {
    cargarRoles();
    cargarTodosLosPermisos();
  }, []);

  const cargarRoles = async () => {
    try {
      const { data } = await pastelApi.get("/roles");
      setRoles(data);
    } catch (err) {
      console.error("Error al cargar roles", err);
    }
  };

  const cargarTodosLosPermisos = async () => {
    try {
      const { data } = await pastelApi.get("/permisos");
      setPermisos(data);
    } catch (err) {
      console.error("Error al cargar permisos", err);
    }
  };

  const cargarPermisosAsignados = async (idRol) => {
    try {
      const { data } = await pastelApi.get(`/rolPerm/${idRol}`);
      setPermisosAsignados(data.map((p) => p.id));
    } catch (err) {
      console.error("Error al cargar permisos asignados", err);
    }
  };

  const handleRolChange = (e) => {
    const id = e.target.value;
    setRolSeleccionado(id);
    if (id) cargarPermisosAsignados(id);
    else setPermisosAsignados([]);
  };

  const handleCheckboxChange = (permisoId) => {
    if (permisosAsignados.includes(permisoId)) {
      setPermisosAsignados(permisosAsignados.filter((id) => id !== permisoId));
    } else {
      setPermisosAsignados([...permisosAsignados, permisoId]);
    }
  };

  const guardarAsignacion = async () => {
    try {
      await pastelApi.post("/rolPerm", {
        rol_id: parseInt(rolSeleccionado),
        permisos: permisosAsignados,
      });
      Swal.fire("Éxito", "Permisos asignados correctamente", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo asignar los permisos", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Asignar Permisos a Rol</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Selecciona un Rol:</label>
        <select
          value={rolSeleccionado}
          onChange={handleRolChange}
          className="w-full border rounded p-2"
        >
          <option value="">-- Seleccionar --</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
      </div>

      {rolSeleccionado && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Permisos disponibles:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {permisos.map((permiso) => (
              <label key={permiso.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={permisosAsignados.includes(permiso.id)}
                  onChange={() => handleCheckboxChange(permiso.id)}
                />
                {permiso.nombre}
              </label>
            ))}
          </div>
        </div>
      )}

      {rolSeleccionado && (
        <button
          onClick={guardarAsignacion}
          className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Guardar Cambios
        </button>
      )}
    </div>
  );
};
