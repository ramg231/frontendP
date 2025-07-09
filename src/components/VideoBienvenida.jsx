// src/componentes/Inicio/VideoBienvenida.jsx
import React, { useState } from "react";

export const VideoBienvenida = () => {
  const videos = [
    "https://res.cloudinary.com/dzvko0obc/video/upload/v1751502264/video1_tgswkt.mp4",
    "https://res.cloudinary.com/dzvko0obc/video/upload/v1751502264/video2_ezbzw6.mp4",
    "https://res.cloudinary.com/dzvko0obc/video/upload/v1751502266/video3_ydnwdl.mp4",
  ];

  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <section className="relative w-full h-[100vh]">
      {/* Fondo de video */}
      <video
        key={videoIndex}
        src={videos[videoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

   

      {/* Contenido centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
          ¡Bienvenidos a Pastelería Jazmín!
        </h1>
        <p className="text-lg md:text-2xl font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] max-w-2xl">
            Endulza tus momentos especiales con lo mejor.
        </p>
      </div>
    </section>
  );
};

