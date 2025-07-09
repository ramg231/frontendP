// src/components/MaterialSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "../css/MaterialSlider.css"; // aquí van estilos personalizados opcionales

const slides = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dryuudsbl/image/upload/v1751421565/productos_pasteleria/df2faxbmo9hywelokeos.jpg",
    title: "Slide 1"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dryuudsbl/image/upload/v1751421565/productos_pasteleria/acw9olguw0lpwctfpdad.jpg",
    title: "Slide 2"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dryuudsbl/image/upload/v1751421582/productos_pasteleria/tyldvqep1lumhbymnqpw.jpg",
    title: "Slide 3"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dryuudsbl/image/upload/v1751421581/productos_pasteleria/souhz2wkjv79qjcvqtoi.jpg",
    title: "Slide 4"
  },
];

export const MaterialSlider = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="rounded-2xl overflow-hidden shadow-lg w-[250px] h-[350px]">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-md">
                {slide.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
