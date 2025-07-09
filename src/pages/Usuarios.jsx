import React, { useEffect, useState } from "react";
import pastelApi from "../api/PastelApi";
import Swal from "sweetalert2";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol_id: "",
  });

  const [editForm, setEditForm] = useState({
    nombre: "",
    email: "",
    rol_id: "",
    activo: true,
  });

  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
  }, []);

  const cargarUsuarios = async () => {
    const { data } = await pastelApi.get("/user");
    setUsuarios(data.usuarios);
  };

  const cargarRoles = async () => {
    const { data } = await pastelApi.get("/roles");
    setRoles(data);
  };

  const handleCrearUsuario = async () => {
    try {
      const { nombre, email, password, rol_id } = nuevoUsuario;
      if (!nombre || !email || !password || !rol_id) {
        Swal.fire("Campos incompletos", "Completa todos los campos", "warning");
        return;
      }

      await pastelApi.post("/user/crear", {
        nombre,
        email,
        password,
        rol_id: parseInt(rol_id),
      });

      Swal.fire("Éxito", "Usuario creado correctamente", "success");
      setNuevoUsuario({ nombre: "", email: "", password: "", rol_id: "" });
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el usuario", "error");
    }
  };

  const startEditUser = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      nombre: user.nombre,
      email: user.email,
      rol_id: user.rol_id,
      activo: user.activo,
    });
  };

  const handleUpdateUser = async () => {
    try {
      await pastelApi.put(`/user/${editingUserId}`, {
        ...editForm,
        rol_id: parseInt(editForm.rol_id),
      });
      Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
      setEditingUserId(null);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  const toggleActivo = async (user) => {
    try {
      await pastelApi.put(`/user/${user.id}`, {
        activo: !user.activo,
      });
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo cambiar el estado", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>

      {/* Formulario de creación */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={nuevoUsuario.password}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
          }
          className="border p-2 rounded"
        />
        <select
          value={nuevoUsuario.rol_id}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, rol_id: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Selecciona un rol</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
        <button
          onClick={handleCrearUsuario}
          className="bg-pink-500 text-white px-4 py-2 rounded md:col-span-4"
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">
                {editingUserId === u.id ? (
                  <input
                    value={editForm.nombre}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nombre: e.target.value })
                    }
                    className="border p-1 rounded"
                  />
                ) : (
                  u.nombre
                )}
              </td>
              <td className="p-2">
                {editingUserId === u.id ? (
                  <input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="border p-1 rounded"
                  />
                ) : (
                  u.email
                )}
              </td>
              <td className="p-2">
                {editingUserId === u.id ? (
                  <select
                    value={editForm.rol_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, rol_id: e.target.value })
                    }
                    className="border p-1 rounded"
                  >
                    <option value="">Rol</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  u.Rol?.nombre
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => toggleActivo(u)}
                  className={`px-2 py-1 rounded text-white ${
                    u.activo ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {u.activo ? "Activo" : "Inactivo"}
                </button>
              </td>
              <td className="p-2 space-x-2">
                {editingUserId === u.id ? (
                  <button
                    onClick={handleUpdateUser}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditUser(u)}
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
