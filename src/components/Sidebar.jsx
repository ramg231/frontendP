import { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  Cake,
  ShoppingBag,
  HandCoins,
  ShieldCheck,
  CopyCheck,
  Menu,
  User,
  Package ,
  ChartBarStacked,
  RotateCwSquare,
  Pencil, 

} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { startLogout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    startLogout();
    navigate("/admin/login");
  };

  const closeMenu = () => setIsOpen(false);
 
  const navLinks = [
    {
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
     { to: "/admin/usuarios", icon: <User size={20} />, label: "usuarios" },
    { to: "/admin/productos", icon: <Package size={20} />, label: "Productos" },
    { to: "/admin/categorias", icon: <ChartBarStacked size={20} />, label: "Categorias" },
    { to: "/admin/opciones", icon: <Menu size={20} />, label: "Opciones" },
     { to: "/admin/imagen-productos", icon: <RotateCwSquare size={20} />, label: "Imagenes" },
     { to: "/admin/img-pro", icon: <Pencil size={20} />, label: "Editar" },
    { to: "/admin/pedidos", icon: <ShoppingBag size={20} />, label: "Pedidos" },
    { to: "/admin/rol", icon: <HandCoins size={20} />, label: "Roles" },
    {
      to: "/admin/permisos",
      icon: <ShieldCheck size={20} />,
      label: "Permisos",
    },
    {
      to: "/admin/asignar-permisos",
      icon: <CopyCheck size={20} />,
      label: "Asignar Permisos-Rol",
    },
  ];

  return (
    <>
      {/* Botón menú móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        <Menu size={24} className="text-pink-500" />
      </button>

      {/* Overlay en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`fixed z-50 top-0 left-0 w-64 h-screen bg-white border-r shadow-sm transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 md:static md:block flex flex-col justify-between`}
>
  {/* Parte superior: navegación */}
  <div className="p-6">
    <h2 className="text-2xl font-bold text-pink-500 mb-8">🍰 Admin</h2>
    <nav className="flex flex-col gap-4">
      {navLinks.map((link, i) => (
        <Link
          key={i}
          to={link.to}
          className="flex items-center gap-3 text-gray-700 hover:text-pink-600"
          onClick={closeMenu}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </nav>
  </div>

  {/* Parte inferior: logout */}
  <div className="p-6 border-t">
    <button
      onClick={() => {
        handleLogout()
        closeMenu()
      }}
      className="flex items-center gap-3 text-red-500 hover:text-red-600"
    >
      <LogOut size={20} />
      Cerrar sesión
    </button>
  </div>
</aside>


    </>
  );
};
