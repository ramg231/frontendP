import React, { useEffect, useState } from "react";
import pastelApi from "../api/PastelApi";
import Swal from "sweetalert2";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanos, setTamanos] = useState([]);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
  });

  const [saboresSeleccionados, setSaboresSeleccionados] = useState([]);
  const [tamanoPrecio, setTamanoPrecio] = useState({
    tamano_id: "",
    precio: "",
  });
  const [tamanosConPrecio, setTamanosConPrecio] = useState([]);
  const [editando, setEditando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;
  const [busqueda, setBusqueda] = useState(""); // <-- Nuevo estado

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
    obtenerSabores();
    obtenerTamanos();
  }, []);

  const obtenerProductos = async () => {
    const { data } = await pastelApi.get("/products");
    setProductos(data.productos);
  };

  const obtenerCategorias = async () => {
    const { data } = await pastelApi.get("/cat");
    setCategorias(data.categorias);
  };

  const obtenerSabores = async () => {
    const { data } = await pastelApi.get("products/sabores");
    setSabores(data.sabores);
  };

  const obtenerTamanos = async () => {
    const { data } = await pastelApi.get("products/tamanos");
    setTamanos(data.tamanos);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria_id: "",
    });
    setSaboresSeleccionados([]);
    setTamanoPrecio({ tamano_id: "", precio: "" });
    setTamanosConPrecio([]);
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio || !form.categoria_id) {
      Swal.fire("Campos requeridos", "Completa todos los campos", "warning");
      return;
    }

    try {
      if (editando) {
        await pastelApi.put(`/products/${form.id}`, form);
        // Actualizar sabores
        await pastelApi.put(`/products/${form.id}/sabores`, {
          sabores: saboresSeleccionados.map((id) => ({
            sabor_id: id,
            estado: true,
          })),
        });
        // Actualizar tamaños
        await pastelApi.put(`/products/${form.id}/tamanos`, {
          tamanos: tamanosConPrecio,
        });
        Swal.fire(
          "Actualizado",
          "Producto actualizado correctamente",
          "success"
        );
      } else {
        const { data } = await pastelApi.post("/products/crear", form);
        const productoId = data.producto_id;

        // Luego enviar sabores seleccionados
        for (const sabor_id of saboresSeleccionados) {
          await pastelApi.post("/products/sabor", {
            producto_id: productoId,
            sabor_id,
          });
        }

        // 🔧 Aquí está la corrección: usar tamanosConPrecio
        for (const item of tamanosConPrecio) {
          await pastelApi.post("/products/tamano", {
            producto_id: productoId,
            tamano_id: item.tamano_id,
            precio: item.precio,
          });
        }

        Swal.fire("Creado", "Producto creado correctamente", "success");
      }

      limpiarFormulario();
      obtenerProductos();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Hubo un problema al guardar el producto", "error");
    }
  };

  const handleEdit = async (prod) => {
    setForm({
      id: prod.id,
      nombre: prod.nombre,
      descripcion: prod.descripcion || "",
      precio: prod.precio,
      stock: prod.stock,
      categoria_id: prod.categoria_id,
    });
    setEditando(true);
    // Obtener sabores asociados
    try {
      const saboresRes = await pastelApi.get(`/products/${prod.id}/sabores`);
      setSaboresSeleccionados(saboresRes.data.sabores.map((s) => s.id));
    } catch (e) {
      setSaboresSeleccionados([]);
    }
    // Obtener tamaños y precios asociados
    try {
      const tamanosRes = await pastelApi.get(`/products/${prod.id}/tamanos`);
      setTamanosConPrecio(
        tamanosRes.data.tamanos.map((t) => ({
          tamano_id: t.id,
          precio: t.precio,
          estado: t.estado,
        }))
      );
    } catch (e) {
      setTamanosConPrecio([]);
    }
  };

  // Cambia el valor de destacado y actualiza en backend
  const toggleDestacado = async (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;
    const nuevoValor = !producto.destacado;
    try {
      await pastelApi.put(`/products/${id}`, { destacado: nuevoValor });
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, destacado: nuevoValor } : p))
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el destacado", "error");
    }
  };

  // Filtrado por nombre
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular productos a mostrar (paginación sobre filtrados)
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">
        Gestión de Productos
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio base"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </form>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-pink-500 mb-2">
          Sabores del Producto
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {sabores.map((sabor) => (
            <label key={sabor.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={saboresSeleccionados.includes(sabor.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSaboresSeleccionados((prev) =>
                    checked
                      ? [...prev, sabor.id]
                      : prev.filter((id) => id !== sabor.id)
                  );
                }}
              />
              {sabor.nombre}
            </label>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-pink-500 mb-2">
          Tamaños y Precios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <select
            value={tamanoPrecio.tamano_id}
            onChange={(e) =>
              setTamanoPrecio({ ...tamanoPrecio, tamano_id: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Seleccione un tamaño</option>
            {tamanos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre} ({t.porciones} porciones)
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio S/"
            value={tamanoPrecio.precio}
            onChange={(e) =>
              setTamanoPrecio({ ...tamanoPrecio, precio: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button
            type="button"
            onClick={() => {
              const { tamano_id, precio } = tamanoPrecio;
              if (!tamano_id || !precio) {
                return Swal.fire(
                  "Campos requeridos",
                  "Selecciona tamaño y precio",
                  "warning"
                );
              }
              // Si ya existe, actualizar el precio
              setTamanosConPrecio((prev) => {
                const existe = prev.find((t) => t.tamano_id === tamano_id);
                if (existe) {
                  return prev.map((t) =>
                    t.tamano_id === tamano_id ? { ...t, precio } : t
                  );
                }
                return [...prev, { tamano_id, precio }];
              });
              setTamanoPrecio({ tamano_id: "", precio: "" });
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editando ? "Actualizar/Agregar" : "Agregar"}
          </button>
        </div>

        {tamanosConPrecio.length > 0 && (
          <ul className="list-disc ml-5 mb-4 text-sm text-gray-700">
            {tamanosConPrecio.map((tp, index) => {
              const tam = tamanos.find((t) => t.id === parseInt(tp.tamano_id));
              return (
                <li key={index} className="flex items-center gap-2">
                  {tam?.nombre} ({tam?.porciones} porciones) - S/ {tp.precio}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs ${
                      tp.estado
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {tp.estado ? "Activo" : "Inactivo"}
                  </span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => {
                      setTamanosConPrecio((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="ml-2 text-blue-500 hover:underline"
                    onClick={() => {
                      setTamanosConPrecio((prev) =>
                        prev.map((t, i) =>
                          i === index ? { ...t, estado: !t.estado } : t
                        )
                      );
                    }}
                  >
                    {tp.estado ? "Desactivar" : "Activar"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-start gap-2 mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          {editando ? "Actualizar" : "Crear"}
        </button>
        {editando && (
          <button
            type="button"
            onClick={limpiarFormulario}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
      <div className="mb-4"></div>
      {/* Buscador */}

      <div className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Reinicia a la primera página al buscar
          }}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      <table className="w-full border text-left mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Destacado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosPagina.map((prod) => (
            <tr key={prod.id} className="border-t">
              <td className="p-2">{prod.id}</td>
              <td className="p-2">{prod.nombre}</td>
              <td className="p-2">S/ {prod.precio}</td>
              <td className="p-2">{prod.stock}</td>
              <td className="p-2">{prod.Categorium?.nombre}</td>
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={!!prod.destacado}
                  onChange={() => toggleDestacado(prod.id)}
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPaginaActual(i + 1)}
            className={`px-3 py-1 rounded ${
              paginaActual === i + 1 ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaActual === totalPaginas}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
