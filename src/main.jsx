import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import APIprovider from './contexts/APIprovider.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import router from './routes/Router.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <APIprovider>
          <AuthProvider>
            <>
              <ToastContainer></ToastContainer>
              <RouterProvider router={router} />
            </>
          </AuthProvider>
        </APIprovider>
  </StrictMode>
);

