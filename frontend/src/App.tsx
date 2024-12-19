import { RouterProvider } from "react-router-dom";
import { Router } from "./config/router/Router";

// Componente principal de la aplicación
const App = () => {
  return (
    // RouterProvider se utiliza para proporcionar el enrutador (Router) a toda la aplicación
    <RouterProvider router={Router} />
  );
};

// Exportación del componente App para su uso en el punto de entrada de la aplicación
export default App;
