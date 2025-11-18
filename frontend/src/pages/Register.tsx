/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import { registerAuth } from "../redux/AuthRedux/AuthAction";
import { LoadingComponent } from "../components/LoadingComponent";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loader = useAppSelector((state) => state.auth.authRegisterLoader);
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    console.log("Values=====>", values);
    setError("");
    try {
      const res = await dispatch(registerAuth(values)).unwrap();

      localStorage.setItem("token", res?.token);
      localStorage.setItem("user", JSON.stringify(res?.user));
      navigate("/home");
    } catch (err: any) {
      setError(err?.error || "Registeration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-200 to-teal-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Regsiter Yourself
          </h1>
          <p className="text-gray-600">
            Sign up to continue making a difference
          </p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Form layout="vertical" className="space-y-4" onFinish={onFinish}>
          <Form.Item
            label={"User Name"}
            name={"name"}
            rules={[
              { required: true, message: "User name is required" },
              {
                type: "string",
                message: "Invalid format",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Enter a valid email",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label={"Password"}
            name={"password"}
            rules={[
              {
                required: true,
                message: "Password is Required",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={loader}
              htmlType="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition text-lg"
            >
              {loader ? <LoadingComponent /> : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
