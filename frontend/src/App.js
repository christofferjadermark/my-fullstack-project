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
import React, { useState } from "react";

function Root() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

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
          <Link to="/contact" className="tab" href="contact">
            Contact
          </Link>
          {isLoggedIn ? (
            <div
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="tab"
            >
              Logout
            </div>
          ) : (
            <Link to="/login" className="tab" href="login">
              Login/Sign Up
            </Link>
          )}
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
