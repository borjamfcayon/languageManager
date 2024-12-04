import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="bg-blue-200 min-h-screen w-screen flex flex-col font-mono">
      <main className="flex-grow p-5 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
