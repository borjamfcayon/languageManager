import { Outlet } from "react-router-dom";
import { Header } from "../../lib/components/Header";

const RootLayout = () => {
  return (
    <div className="bg-[#FFE4E1] min-h-screen w-screen flex flex-col font-mono">
      <Header />
      <main className="flex-grow p-5 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
