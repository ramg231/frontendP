// src/router/PublicLayout.jsx
 
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // Ajusta la ruta según tu estructura

export const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* Aquí podrías incluir un <Footer /> también si tienes uno */}
    </div>
  );
};
