import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import pastelApi from "../../api/PastelApi";

export const FiltrosProductos = ({ filtros, setFiltros, setPaginaActual }) => {
  const [categorias, setCategorias] = useState([]);
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await pastelApi.get("/cat/");
        const categoriasBackend = data.categorias || [];
        setCategorias([
          { id: "del-dia", nombre: "HOY" },
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
    <div className="flex flex-col gap-6">
      {/* Filtros Activos */}
      {(Array.isArray(filtros.categoria) && filtros.categoria.length > 0) ||
      filtros.min > 0 ||
      filtros.max < 9999 ||
      (filtros.sabores && filtros.sabores.length > 0) ? (
        <div className="bg-pink-50 border border-pink-200 p-4 rounded-md shadow min-w-[250px]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-pink-700">Filtros Activos</span>
            <button
              onClick={limpiarFiltros}
              className="text-sm text-pink-600 hover:underline hover:text-pink-800"
            >
              Limpiar Todo
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(filtros.categoria) &&
              filtros.categoria.map((catId) => (
                <span
                  key={catId}
                  className="bg-pink-100 text-pink-700 px-2 py-1 rounded-md flex items-center gap-1 border border-pink-200"
                >
                  {categorias.find((c) => c.id == catId)?.nombre || "Categoría"}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-pink-900"
                    onClick={() => manejarQuitarCategoria(catId)}
                  />
                </span>
              ))}
            {filtros.sabores &&
              filtros.sabores.map((sid) => (
                <span
                  key={sid}
                  className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md flex items-center gap-1 border border-orange-200"
                >
                  {sabores.find((s) => s.id === sid)?.nombre || "Sabor"}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-orange-900"
                    onClick={() => manejarCambioSabor(sid)}
                  />
                </span>
              ))}
          </div>
        </div>
      ) : null}

      {/* Filtro por Categoría */}
      <div className="bg-white p-4 rounded-md shadow-md min-w-[250px] border border-pink-100">
        <h3 className="font-semibold text-lg mb-3 text-pink-700">Categorías</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
          {categorias.map((c) => (
            <div key={c.id} className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-pink-500"
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
      </div>

      {/* Filtro por Sabores */}
      <div className="bg-white p-4 rounded-md shadow-md min-w-[250px] border border-orange-100">
        <h3 className="font-semibold text-lg mb-3 text-orange-700">Sabores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-x-4 gap-y-1">
          {sabores.map((s) => (
            <div key={s.id} className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={filtros.sabores?.includes(s.id)}
                  onChange={() => manejarCambioSabor(s.id)}
                />
                <span>{s.nombre}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};