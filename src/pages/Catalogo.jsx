// src/paginas/Catalogo.jsx
import React, { useEffect, useState } from "react";
import pastelApi from "../api/pastelApi";
import { FiltrosProductos } from "../components/Carrito/FiltrosProductos";
import { GrillaProductos } from "../components/Carrito/GrillaProductos";
import { useLocation, useNavigate } from "react-router-dom";

export const Catalogo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paramsUrl = new URLSearchParams(location.search);

  // Lee los filtros y la página desde la URL al cargar
  const [paginaActual, setPaginaActual] = useState(Number(paramsUrl.get("page")) || 1);
  const [filtros, setFiltros] = useState({
    q: paramsUrl.get("q") || "",
    categoria: paramsUrl.get("categoria")
      ? paramsUrl.get("categoria").split(",").map((id) =>
          isNaN(Number(id)) ? id : Number(id)
        )
      : [],
    min: paramsUrl.get("min") ? Number(paramsUrl.get("min")) : 0,
    max: paramsUrl.get("max") ? Number(paramsUrl.get("max")) : 9999,
    destacado: paramsUrl.get("destacado") === "true" ? true : undefined,
    sabores: paramsUrl.get("sabores")
      ? paramsUrl.get("sabores").split(",").map(Number)
      : [],
  });

  const [productos, setProductos] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Actualiza la URL cuando cambian filtros o página
  useEffect(() => {
    const params = new URLSearchParams();
    if (paginaActual > 1) params.set("page", paginaActual);
    if (filtros.categoria.length > 0) params.set("categoria", filtros.categoria.join(","));
    if (filtros.sabores.length > 0) params.set("sabores", filtros.sabores.join(","));
    if (filtros.q) params.set("q", filtros.q);
    if (filtros.min > 0) params.set("min", filtros.min);
    if (filtros.max < 9999) params.set("max", filtros.max);
    if (filtros.categoria.includes("del-dia")) params.set("destacado", "true");
    navigate(`/catalogo?${params.toString()}`, { replace: true });
    // eslint-disable-next-line
  }, [paginaActual, filtros]);

  const obtenerProductos = async () => {
    try {
      const params = {
        ...filtros,
        page: paginaActual,
        limit: 9,
      };

      // Si está seleccionado "del-dia", ajusta los filtros
      let categoriasFiltradas = filtros.categoria.filter((cat) => cat !== "del-dia");
      if (categoriasFiltradas.length > 0) {
        params.categoria = categoriasFiltradas.join(",");
      } else {
        params.categoria = "all";
      }

      // Convierte el array de sabores a string separado por comas
      if (Array.isArray(filtros.sabores) && filtros.sabores.length > 0) {
        params.sabores = filtros.sabores.join(",");
      } else {
        delete params.sabores;
      }

      // Si está seleccionado "del-dia", ajusta el destacado
      if (filtros.categoria.includes("del-dia")) {
        params.destacado = true;
      } else {
        delete params.destacado;
      }

      const { data } = await pastelApi.get("/publica/catalogo", { params });

      setProductos(data.productos);
      setTotalPaginas(data.paginas);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Cuando cambian los filtros o la página, consulta productos
  useEffect(() => {
    obtenerProductos();
    // eslint-disable-next-line
  }, [filtros, paginaActual]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Productos</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <FiltrosProductos filtros={filtros} setFiltros={setFiltros} setPaginaActual={setPaginaActual} />
          </aside>
          <section className="flex-1">
            <GrillaProductos
              productos={productos}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              setPaginaActual={setPaginaActual}
            />
          </section>
        </div>
      </main>
    </div>
  );
};
