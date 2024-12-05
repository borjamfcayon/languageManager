import { useContext, createContext, ReactNode } from "react";
type RoleContextType = string;
const RoleContext = createContext<RoleContextType | null>(null);
interface RoleProviderProps {
    role: RoleContextType;
    children: ReactNode;
}
export const RoleProvider = ({ role, children }: RoleProviderProps) => {
    return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};
export const useRole = (): RoleContextType => {
    const context = useContext(RoleContext);
    if (context === null) {
        throw new Error("useRole debe ser usado dentro de un RoleProvider");
    }
    return context;
};