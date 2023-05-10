import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./register.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setField = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);

    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);

      if (response.status === 201) {
        alert("User created successfully");
      } else {
        alert("Error creating user");
      }
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={data.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="Password"
        />
        <Form.Text>
          Already have an account? <Link to="/login">Login.</Link>
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="submit">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default Register;
