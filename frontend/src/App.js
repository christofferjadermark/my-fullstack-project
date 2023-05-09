import "./components/navbar/navbar.scss";
import {
  createHashRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Contact from "./routes/Contact.jsx";
import Profile from "./routes/Profile.jsx";
import Register from "./routes/Register.jsx";

function Root() {
  return (
    <>
      <section className="tabs">
        <div className="tabs-container">
          <Link to="/" className="tab" href="start">
            Start
          </Link>
          <Link to="/profile" className="tab" href="profile">
            Profile
          </Link>
          <Link Link to="/contact" className="tab" href="contact">
            Contact
          </Link>
          <Link Link to="/login" className="tab" href="login">
            Login/Sign Up
          </Link>
        </div>
      </section>
      <Outlet />
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Login />, path: "/login" },
        { element: <Contact />, path: "/contact" },
        { element: <Profile />, path: "/profile" },
        { element: <Register />, path: "/register" },
      ],
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
