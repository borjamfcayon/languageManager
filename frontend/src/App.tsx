import { RouterProvider } from "react-router-dom";
import { Router } from "./config/router/Router";

const App = () => {

  return (
    <RouterProvider router={Router} />
  );
};

export default App;
