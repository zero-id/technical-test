import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/call/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      console.log(form);

      e.preventDefault();

      if (!form.username || !form.password) {
        alert("Please enter username and password");
        return;
      }

      const res = await login(form);

      localStorage.setItem("token", res.data.token);

      alert("Login success!");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-50 m-auto bg-info rounded-3">
      <div className="m-5 p-5">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={handleSubmit}>
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
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button type="submit" size="sm" className="btn btn-primary">
            Login
          </Button>
          <div style={{ fontSize: "14px" }} className="text-end mt-3">
            <p>
              Not registered yet?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
                className="text-danger fst-italic "
              >
                Register
              </span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
