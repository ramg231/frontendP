// src/router/RouterPrincipal.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PublicLayout } from '../router/PublicLayout'
import { AdminLayout } from '../router/AdminLayout'
import { RutaProtegida } from '../components/RutaProtegida'
import { PantallaPublica } from '../pages/PantallaPublica'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { Productos } from '../pages/Productos'
import {  ImagenProduct } from '../pages/ImagenProduct'
import {   ImgProducts } from '../pages/ImgProducts'
import { Categorias } from '../pages/Categorias'
import { Rol } from '../pages/Rol'
import { Permisos } from '../pages/Permisos'
import { AsignarPermisos } from '../pages/AsignarPermisos'
import { Usuarios } from '../pages/Usuarios'
import { Catalogo } from '../pages/Catalogo'
import {  ProductoDetalle } from '../pages/ProductoDetalle'
import {   Contacto } from '../components/Contacto'
import { AdminOpciones } from '../pages/AdminOpciones'

export const RouterPrincipal = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <PantallaPublica /> },
    { path: 'catalogo', element: <Catalogo /> },
     { path: 'producto/:id', element: <ProductoDetalle /> },
  //{ path: 'contacto', element: <Contacto /> }, // opcional
     // { path: 'inicio', element: <HomePage /> }, // opcional
      { path: '*', element: <Navigate to="/" /> }
    ]
  },

  // ✅ LOGIN SIN SIDEBAR
  {
    path: '/admin/login',
    element: <Login />
  },

  // ✅ RUTAS PROTEGIDAS CON SIDEBAR
  {
    path: '/admin',
    element: (
      <RutaProtegida>
        <AdminLayout />
      </RutaProtegida>
    ),
    children: [
      { path: 'dashboard', element: <Home /> },
      { path: 'usuarios', element: <Usuarios /> },
      { path: 'productos', element: <Productos /> },
      { path: 'imagen-productos', element: <ImagenProduct /> },
      { path: 'img-pro', element: <ImgProducts /> },
      { path: 'categorias', element: <Categorias /> },
      { path: 'opciones', element: <AdminOpciones /> },
      { path: 'rol', element: <Rol /> },
      { path: 'permisos', element: <Permisos /> },
      { path: 'asignar-permisos', element: <AsignarPermisos /> },
      { path: '*', element: <Navigate to="/admin/dashboard" /> }
    ]
  },

  { path: '*', element: <Navigate to="/" /> }
])
