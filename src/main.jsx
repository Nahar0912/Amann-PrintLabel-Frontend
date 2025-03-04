import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider,} from "react-router-dom";
import router from './routes/router';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </AuthProvider>
  </StrictMode>,
)
