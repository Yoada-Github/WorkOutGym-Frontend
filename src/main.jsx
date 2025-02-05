import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { SnackbarProvider } from 'notistack'; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <SnackbarProvider>
      <App />
     </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
