/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input } from "antd";
import { useAppDispatch } from "../redux/store/hook";
import { loginAuth } from "../redux/AuthRedux/AuthAction";
import { useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    setError("");
    setLoading(true);
    try {
      const res = await dispatch(loginAuth(values)).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/home");
    } catch (err: any) {
      setError(err?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-200 to-teal-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue making a difference
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Form layout="vertical" className="space-y-4" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={loading}
              htmlType="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition text-lg"
            >
              {loading ? <LoadingComponent /> : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
