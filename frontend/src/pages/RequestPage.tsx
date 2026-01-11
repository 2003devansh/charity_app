import {
  Form,
  Input,
  Card,
  Button,
  Row,
  Col,
  Select,
  message,
  Alert,
} from "antd";
import { DonationCategory } from "../components/constants";
import { useAppDispatch } from "../redux/store/hook";

import { useState } from "react";
import { createRequest } from "../redux/RequestRedux/RequestAction";

const RequestPage = () => {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await dispatch(createRequest(values)).unwrap();
      setShowSuccess(true);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create request");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-transparent">
      <Row justify="center">
        <Col xs={24} md={18} lg={14}>
          <Card
            bordered={false}
            className="backdrop-blur-md bg-white/10 shadow-lg"
            title={
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  Create a Request
                </h1>
                <p className="text-sm text-gray-300 mt-1">
                  Let others know what you need. Be clear and descriptive.
                </p>
              </div>
            }
          >
            {showSuccess && (
              <Alert
                message="Request created successfully"
                type="success"
                showIcon
                closable
                onClose={() => setShowSuccess(false)}
                className="mb-4"
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: "Title is required" }]}
                  >
                    <Input
                      placeholder="e.g. Winter clothes needed"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Description is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Explain your situation and what kind of help you need"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Category is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select category"
                      options={DonationCategory}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full"
                >
                  Submit Request
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RequestPage;
