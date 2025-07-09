import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export const Login = () => {
  const navigate = useNavigate()
  const { startLogin, status, errorMessage } = useAuthStore()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [touched, setTouched] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)

    if (!formData.email || !formData.password) return

    await startLogin(formData)

    if (useAuthStore.getState().status === "authenticated") {
      navigate("/admin/dashboard")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Iniciar Sesión</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-pink-500"
          />
          {touched && !formData.email && (
            <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-pink-500"
          />
          {touched && !formData.password && (
            <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "checking"}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold w-full py-2 rounded transition"
        >
          {status === "checking" ? "Verificando..." : "Ingresar"}
        </button>
      </form>
    </div>
  )
}
