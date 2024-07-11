import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/call/auth";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    name: string;
    username: string;
    password: string;
  }>({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!form.name || !form.username || !form.password) {
        alert("Please enter name, username and password");
        return;
      }

      await register(form);

      alert("Register success");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-50 m-auto bg-info rounded-3">
      <div className="m-5 p-5">
        <h1 className="text-center">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name" onChange={handleChange}>
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" required />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="username"
            onChange={handleChange}
          >
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" required />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="password"
            onChange={handleChange}
          >
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Button type="submit" size="sm" className="btn btn-primary">
            Regsiter
          </Button>
          <div style={{ fontSize: "14px" }} className="text-end mt-3">
            <p>
              Already registered?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
                className="text-danger fst-italic"
              >
                Login
              </span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
