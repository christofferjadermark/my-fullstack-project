import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  const isLoggedIn = () => {
    if (login) {
      return <p>Logged in!</p>;
    } else {
      return <p>Not logged in!</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/users/login", user)
      .then((response) => {
        setEmail(response.data.email);
        setPassword(response.data.password);
        setLogin(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Form.Text>
          Don't have an account? <Link to="/register">Create an account.</Link>
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {isLoggedIn()}
    </Form>
  );
}

export default Login;
