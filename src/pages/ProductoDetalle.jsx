import React, { useEffect, useState } from "react";
import logoPasteleria from "../assets/logo.png";
import { useParams, Link, useNavigate } from "react-router-dom";
import pastelApi from "../api/pastelApi";
import { ArrowLeft, Star, Heart, Share2, ArrowBigRight } from "lucide-react";
import { SelectorCantidad } from "../components/Carrito/SelectorCantidad";
import { Caracteristicas } from "../components/Carrito/Carasteristicas";
import { ProductosRelacionados } from "../components/Carrito/ProductosRelacionados";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Zoom from "react-medium-image-zoom";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "react-medium-image-zoom/dist/styles.css";

export const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleShareWhatsApp = () => {
    const telefono = "51949301521"; // Coloca aquí el número de WhatsApp con código de país (sin '+')
    const mensaje = `Hola, deseo más información sobre el producto "${producto.nombre}". Aquí está el enlace: ${window.location.href}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank"); // Abre en una nueva pestaña
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data } = await pastelApi.get(`/publica/detalle/${id}`);
        setProducto(data);

        const relacionadosRes = await pastelApi.get("/publica", {
          params: { categoria: data.categoria },
        });

        const relacionadosFiltrados = relacionadosRes.data
          .filter((p) => p.id !== data.id)
          .slice(0, 4);

        setRelacionados(relacionadosFiltrados);
      } catch (error) {
        console.error("Producto no encontrado", error);
        navigate("/catalogo");
      }
    };

    obtenerProducto();
  }, [id, navigate]);

  if (!producto)
    return <div className="text-center py-8">Cargando producto...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería con Swiper y Zoom */}
          <div>
            <Swiper
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              {producto.imagenes?.map((img) => (
                <SwiperSlide key={img.id}>
                  <Zoom>
                    <img
                      src={img.url}
                      alt="Imagen grande"
                      className="w-full h-[400px] object-cover rounded-2xl cursor-zoom-in"
                    />
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
               slidesPerView={producto.imagenes?.length || 1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="mt-4"
            >
              {producto.imagenes?.map((img) => (
                <SwiperSlide key={img.id} className="cursor-pointer !h-auto">
                  <div className="h-24">
                    <img
                      src={img.url}
                      alt="Miniatura"
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Detalles del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {producto.categoria}
                </span>

                {producto.destacado === true ||
                producto.destacado === "true" ? (
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                    Hoy
                  </span>
                ) : null}
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                {producto.nombre}
              </h1>

              

              <p className="text-gray-600 text-lg mt-4">
                {producto.descripcion}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">
                S/.{producto.precio}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full ml-2">
                Precio referencial
              </span>
            </div>
                <Caracteristicas productoId={producto.id} />
            <div className="space-y-4">
              {producto.stock > 0 && (
                <div className="text-lg font-semibold text-gray-700">
                  Stock disponible:{" "}
                  <span className="text-pink-600">{producto.stock}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white rounded-lg flex items-center justify-center gap-2">
                  CONSULTA EL PRODUCTO
                  <ArrowBigRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="p-3 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-pink-500 hover:bg-pink-50 shadow-sm hover:shadow-md"
                >
                  <Share2 className="w-5 h-5 text-gray-600 hover:text-pink-500 transition duration-300" />
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Disponibilidad del Producto</span>
              </div>
              <p className="mt-1">
                -Los productos sin la etiqueta "Del día" están disponibles solo
                bajo pedido previo{" "}
              </p>
              <p className="mt-1">
                -Los pedidos se realizan a través de WhatsApp
              </p>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="mt-10">
            <ProductosRelacionados productos={relacionados} />
          </div>
        )}
      </main>
    </div>
  );
};
