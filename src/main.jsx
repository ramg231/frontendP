import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { RouterPrincipal } from './router/RouterPrincipal'
 
import './index.css'

//         
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={RouterPrincipal} />
 
  </StrictMode>,
)
