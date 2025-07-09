// src/pages/ImagenProduct.jsx
import React, { useEffect, useState } from "react";
import pastelApi from "../api/PastelApi";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";

export const ImagenProduct = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imagenes, setImagenes] = useState([]);

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

  const handleImagenesChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const subirImagenes = async () => {
    if (!productoSeleccionado || imagenes.length === 0) {
      return Swal.fire("Aviso", "Selecciona un producto e imágenes", "warning");
    }

    const formData = new FormData();
    imagenes.forEach((img) => {
      formData.append("imagenes", img);
    });

    try {
      Swal.fire({
        title: "Cargando imágenes...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const { data } = await pastelApi.post(
        `/img/productos/${productoSeleccionado}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.close(); // Cierra el loader
      Swal.fire("Éxito", data.message || "Imágenes subidas correctamente", "success");
      setImagenes([]);
      setCategoriaId("");
setProductoSeleccionado(null);
    } catch (error) {
      Swal.close();
      console.error(error);
      Swal.fire("Error", "No se pudieron subir las imágenes", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Agregar Imágenes a Productos</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Seleccionar Categoría</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
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

      {categoriaId && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Buscar y seleccionar producto</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadProductos}
            defaultOptions={false}
            onChange={(selected) => setProductoSeleccionado(selected?.value)}
            placeholder="Escribe para buscar productos"
            isSearchable
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Seleccionar imágenes (hasta 10)</label>
        <input
          type="file"
          multiple
          onChange={handleImagenesChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={subirImagenes}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Subir Imágenes
      </button>
    </div>
  );
};
