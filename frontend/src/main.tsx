import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";

// Crear una instancia de QueryClient que manejará las consultas y cachés de React Query
const queryClient = new QueryClient(); // QueryClient es un objeto que gestiona las configuraciones y el caché para las consultas de react-query

// Renderizado de la aplicación en el DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode es una herramienta de desarrollo que ayuda a identificar problemas en la aplicación durante el desarrollo
  <React.StrictMode>
    {/* QueryClientProvider es un componente que proporciona el cliente de React Query a toda la aplicación */}
    <QueryClientProvider client={queryClient}>
      {/* App es el componente raíz que contiene el resto de la aplicación */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
