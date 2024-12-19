import { Loader2 } from "lucide-react";

// Componente que muestra un indicador de carga (spinner)
export const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center text-blue-600 animate-spin">
      {/* Muestra el ícono de carga con un tamaño de 100px y animación de giro */}
      <Loader2 size={100} />
    </div>
  );
};
