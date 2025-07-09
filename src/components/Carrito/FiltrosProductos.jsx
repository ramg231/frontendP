import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import pastelApi from "../../api/pastelApi";

export const FiltrosProductos = ({ filtros, setFiltros, setPaginaActual }) => {
  const [categorias, setCategorias] = useState([]);
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await pastelApi.get("/cat/");
        const categoriasBackend = data.categorias || [];
        setCategorias([
          { id: "del-dia", nombre: "Del día" },
          ...categoriasBackend,
        ]);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    const obtenerSabores = async () => {
      try {
        const { data } = await pastelApi.get("/products/sabores");
        setSabores(data.sabores || []);
      } catch (error) {
        console.error("Error cargando sabores:", error);
      }
    };

    obtenerCategorias();
    obtenerSabores();
  }, []);

  const limpiarFiltros = () => {
    setFiltros({
      q: "",
      categoria: [],
      min: 0,
      max: 9999,
      destacado: undefined,
      sabores: [],
    });
    setPaginaActual(1);
  };

  // Elimina una categoría del array de filtros
  const manejarCambioCategoria = (catId) => {
    let nuevasCategorias = Array.isArray(filtros.categoria)
      ? [...filtros.categoria]
      : [];
    if (nuevasCategorias.includes(catId)) {
      nuevasCategorias = nuevasCategorias.filter((id) => id !== catId);
    } else {
      nuevasCategorias.push(catId);
    }
    setFiltros((prev) => ({
      ...prev,
      categoria: nuevasCategorias,
      destacado: nuevasCategorias.includes("del-dia") ? true : undefined,
    }));
    setPaginaActual(1);
  };

  const manejarQuitarCategoria = (catId) => {
    let nuevasCategorias = filtros.categoria.filter((id) => id !== catId);
    setFiltros((prev) => ({
      ...prev,
      categoria: nuevasCategorias,
      destacado: nuevasCategorias.includes("del-dia") ? true : undefined,
    }));
    setPaginaActual(1);
  };

  const manejarCambioSabor = (saborId) => {
    let nuevosSabores = filtros.sabores || [];
    if (nuevosSabores.includes(saborId)) {
      nuevosSabores = nuevosSabores.filter((id) => id !== saborId);
    } else {
      nuevosSabores = [...nuevosSabores, saborId];
    }
    setFiltros({ ...filtros, sabores: nuevosSabores });
    setPaginaActual(1);
  };

  return (
    <div className="space-y-6">
      {/* Filtros Activos */}
      {(Array.isArray(filtros.categoria) && filtros.categoria.length > 0) ||
      filtros.min > 0 ||
      filtros.max < 9999 ||
      (filtros.sabores && filtros.sabores.length > 0) ? (
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Filtros Activos</span>
            <button
              onClick={limpiarFiltros}
              className="text-sm text-gray-600 hover:underline"
            >
              Limpiar Todo
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(filtros.categoria) &&
              filtros.categoria.map((catId) => (
                <span
                  key={catId}
                  className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {categorias.find((c) => c.id == catId)?.nombre || "Categoría"}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => manejarQuitarCategoria(catId)}
                  />
                </span>
              ))}
            {filtros.sabores &&
              filtros.sabores.map((sid) => (
                <span
                  key={sid}
                  className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {sabores.find((s) => s.id === sid)?.nombre || "Sabor"}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => manejarCambioSabor(sid)}
                  />
                </span>
              ))}
          </div>
        </div>
      ) : null}

      {/* Filtro por Categoría */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="font-semibold text-lg mb-3">Categorías</h3>
        {categorias.map((c) => (
          <div key={c.id} className="flex items-center mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  Array.isArray(filtros.categoria)
                    ? filtros.categoria.includes(c.id)
                    : false
                }
                onChange={() => manejarCambioCategoria(c.id)}
              />
              <span>{c.nombre}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Filtro por Sabores */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="font-semibold text-lg mb-3">Sabores</h3>
        {sabores.map((s) => (
          <div key={s.id} className="flex items-center mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filtros.sabores?.includes(s.id)}
                onChange={() => manejarCambioSabor(s.id)}
              />
              <span>{s.nombre}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};