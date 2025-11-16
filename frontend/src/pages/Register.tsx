import { Form, Input } from "antd";

const Register = () => {
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

        <Form layout="vertical" className="space-y-4">
          <Form.Item>
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
          <Form.Item label={"password"}>
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
