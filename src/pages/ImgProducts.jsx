import React, { useEffect, useState } from "react";
import pastelApi from "../api/PastelApi";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";
import DataTable from "react-data-table-component";

export const ImgProducts = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [productoSelect, setProductoSelect] = useState(null);
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagenesModal, setImagenesModal] = useState([]);
  const [productoEnModal, setProductoEnModal] = useState(null);
  const [imagenesReemplazo, setImagenesReemplazo] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await pastelApi.get("/cat/");
        setCategorias(data.categorias);
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar las categorías", "error");
      }
    };
    fetchCategorias();
  }, []);

  const loadProductos = async (inputValue) => {
    if (!inputValue || !categoriaId) return [];
    try {
      const { data } = await pastelApi.get(
        `/products/buscar?categoria_id=${categoriaId}&q=${inputValue}`
      );
      return data.map((prod) => ({
        value: prod.id,
        label: prod.nombre,
      }));
    } catch (error) {
      Swal.fire("Error", "No se pudieron buscar los productos", "error");
      return [];
    }
  };

  const consultarImagenes = async () => {
    if (!categoriaId || !productoSelect) {
      return Swal.fire("Aviso", "Selecciona categoría y producto", "warning");
    }

    try {
      const { data } = await pastelApi.get(
        `/img/productos/buscarv?categoria_id=${categoriaId}&q=${encodeURIComponent(
          productoSelect.label
        )}`
      );
      setProductos(data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron obtener las imágenes", "error");
    }
  };

  const mostrarModalImagenes = (producto) => {
    setProductoEnModal(producto);
    setImagenesModal(producto.imagenes);
    setModalVisible(true);
  };

  const handleReemplazo = (idImagen, file) => {
    setImagenesReemplazo((prev) => ({ ...prev, [idImagen]: file }));
  };

  // NUEVO: Eliminar imagen
  const eliminarImagen = async (idImagen) => {
    try {
      await pastelApi.delete(`/img/productos/${idImagen}`);
      setImagenesModal((prev) => prev.filter((img) => img.id !== idImagen));
      Swal.fire("Eliminado", "Imagen eliminada correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la imagen", "error");
    }
  };

  const guardarCambios = async () => {
    try {
      // Guardar destacado
      for (const p of productos) {
        await pastelApi.put(`/products/${p.id}`, {
          destacado: p.destacado,
        });
      }

      // Subir imágenes reemplazadas
      if (productoEnModal && Object.keys(imagenesReemplazo).length > 0) {
        const formData = new FormData();
        Object.entries(imagenesReemplazo).forEach(([id, file]) => {
          formData.append("imagenes", file);
        });

        await pastelApi.post(`/img/productos/${productoEnModal.id}`, formData);
      }

      Swal.fire("Éxito", "Cambios guardados correctamente", "success");
      setModalVisible(false);
      setImagenesReemplazo({});
      consultarImagenes();
    } catch (error) {
      Swal.fire("Error", "No se pudieron guardar los cambios", "error");
    }
  };

  const columns = [
    {
      name: "Producto",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Destacado",
      cell: (row) =>
        row.destacado ? <span className="text-pink-600 font-bold">★</span> : "",
      sortable: true,
    },
    {
      name: "Imagen",
      cell: (row) =>
        row.imagenes.length > 0 ? (
          <img
            src={row.imagenes[0].url}
            alt="Miniatura"
            className="w-16 h-16 object-cover cursor-pointer rounded shadow"
            onClick={() => mostrarModalImagenes(row)}
          />
        ) : (
          <span>No hay</span>
        ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gestión de Imágenes</h2>

      {/* Categoría y Producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Seleccionar Categoría</label>
          <select
            value={categoriaId}
            onChange={(e) => {
              setCategoriaId(e.target.value);
              setProductoSelect(null);
              setProductos([]);
            }}
            className="border p-2 w-full rounded"
          >
            <option value="">-- Selecciona --</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Buscar Producto</label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadProductos}
            onChange={(option) => setProductoSelect(option)}
            placeholder="Escribe para buscar..."
            isClearable
          />
        </div>
      </div>

      {/* Botón Buscar */}
      {productoSelect && (
        <button
          onClick={consultarImagenes}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Buscar imágenes
        </button>
      )}

      {/* Tabla */}
      {productos.length > 0 && (
        <DataTable
          title="Productos con Imágenes"
          columns={columns}
          data={productos}
          pagination
          responsive
          highlightOnHover
        />
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              Imágenes de: {productoEnModal?.nombre}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {imagenesModal.map((img) => (
                <div key={img.id} className="space-y-2">
                  <img
                    src={img.url}
                    alt={`Imagen ${img.id}`}
                    className="w-full object-contain rounded border h-60 bg-gray-100"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      handleReemplazo(img.id, e.target.files[0])
                    }
                    className="w-full"
                  />
                  <button
                    onClick={() => eliminarImagen(img.id)}
                    className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 mt-1"
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};