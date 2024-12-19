import { Outlet } from "react-router-dom";

// Componente RootLayout que define la estructura principal de la aplicación
const RootLayout = () => {
  return (
    // Contenedor principal del layout con estilos de fondo y tamaño de pantalla completa
    <div className="bg-blue-200 min-h-screen w-screen flex flex-col font-mono">
      {/* Sección principal de la aplicación, que se expande para llenar el espacio disponible */}
      <main className="flex-grow p-5 overflow-y-auto overflow-x-hidden">
        {/* El Outlet renderiza el componente correspondiente a la ruta hija */}
        <Outlet />
      </main>
    </div>
  );
};

// Exportación del componente RootLayout para su uso en las rutas principales
export default RootLayout;
