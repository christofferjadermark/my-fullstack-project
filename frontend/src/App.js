import "./components/navbar/navbar.scss";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Contact from "./routes/Contact.jsx";
import Root from "./Root.jsx";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Login />, path: "/login" },
        { element: <Contact />, path: "/contact" },
      ],
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
