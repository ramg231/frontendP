// src/components/SliderDelDia.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "../css/MaterialSlider.css";
import pastelApi from "../api/PastelApi";
import { Link } from "react-router-dom";

export const SliderDelDia = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await pastelApi.get("/publica/");
        setSlides(data);
      } catch (error) {
        console.error("Error al cargar los slides:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <section className="w-full py-20 bg-gradient-to-br from-yellow-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-pink-600 mb-12 tracking-wide">
          Postres del día
        </h2>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper flex justify-center max-h-[400px]"
          style={{ maxWidth: "100%", margin: "0 auto", height: "400px" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="flex justify-center">
              <Link to="/catalogo?categoria=del-dia">
                <div className="relative rounded-2xl overflow-hidden shadow-xl w-[250px] h-[350px] hover:scale-105 transition-transform duration-300">
                  <img
                    src={slide.url}
                    alt={slide.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-md bg-black bg-opacity-50 px-3 py-1 rounded">
                    {slide.nombre}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
