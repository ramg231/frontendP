// src/stores/useAuthStore.js
import { create } from 'zustand'
import pastelApi from '../api/PastelApi'
import { devtools } from 'zustand/middleware'

export const useAuthStore = create(devtools((set) => ({
  status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
  statusRegis: 'not-registered',
  user: {},
  errorMessage: undefined,
  registerSuccess: false,
  registerMessage: "",

  startLogin: async ({ email, password }) => {
    set({ status: 'checking', user: {}, errorMessage: undefined })
    try {
      const { data } = await pastelApi.post('user/login', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      set({
        status: 'authenticated',
        user: {
          id: data.user.id,
          nombre: data.user.nombre,
          email: data.user.email,
          rol: data.user.rol_id
        },
        errorMessage: undefined
      })
    } catch (error) {
      set({ status: 'not-authenticated', errorMessage: 'Credenciales incorrectas' })
      setTimeout(() => set({ errorMessage: undefined }), 10)
    }
  },

  checkAuthToken: async () => {
    const token = localStorage.getItem('token')
    if (!token) return set({ status: 'not-authenticated', user: {} })

    try {
      const { data } = await pastelApi.get('/user/revalidar')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      set({
        status: 'authenticated',
        user: {
          id: data.user.id,
          nombre: data.user.nombre,
          email: data.user.email,
          rol: data.user.rol
        },
        errorMessage: undefined
      })
    } catch (error) {
      localStorage.clear()
      set({ status: 'not-authenticated', user: {} })
    }
  },

  startLogout: () => {
    localStorage.clear()
    set({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  },

  clearErrorMessage: () => set({ errorMessage: undefined, registerMessage: undefined }),

  onRegistered: (msg) => set({
    statusRegis: 'registered',
    registerSuccess: true,
    registerMessage: msg,
    errorMessage: undefined,
    status: 'not-authenticated'
  }),

  onNotRegister: (payload) => set({
    statusRegis: 'not-registered',
    registerSuccess: false,
    registerMessage: undefined,
    errorMessage: payload
  })
})))
