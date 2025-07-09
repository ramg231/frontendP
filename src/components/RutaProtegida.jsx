import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export const RutaProtegida = ({ children }) => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, []) // ejecutar una sola vez

  if (status === 'checking') {
    return <h1 className="text-center mt-10">Verificando sesión...</h1>
  }

  if (status === 'not-authenticated') {
    return <Navigate to="/admin/login" />
  }

  return children
}
