// Importación de hooks y tipos de React
import { useContext, createContext, ReactNode } from "react";

// Definición del tipo para el contexto que gestionará el rol del usuario
type RoleContextType = string; // El valor del contexto será un string que representa el rol del usuario

// Creación del contexto con un valor inicial de `null`
const RoleContext = createContext<RoleContextType | null>(null); // El contexto puede tener un valor de tipo RoleContextType o ser null

// Definición de las propiedades que acepta el componente RoleProvider
interface RoleProviderProps {
  role: RoleContextType; // El rol que se va a proporcionar a los componentes hijos
  children: ReactNode; // Los componentes hijos que recibirán el contexto
}

// Componente que proporciona el contexto de rol a sus hijos
export const RoleProvider = ({ role, children }: RoleProviderProps) => {
  // Provee el rol al contexto para que los componentes hijos puedan acceder a él
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};

// Hook personalizado para acceder al contexto de rol
export const useRole = (): RoleContextType => {
  // Usa `useContext` para obtener el valor actual del contexto
  const context = useContext(RoleContext);

  // Si el contexto es null, lanza un error indicando que el hook debe ser usado dentro de un `RoleProvider`
  if (context === null) {
    throw new Error("useRole debe ser usado dentro de un RoleProvider");
  }

  // Devuelve el valor del contexto (el rol del usuario)
  return context;
};
