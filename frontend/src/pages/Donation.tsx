import {
  Form,
  Input,
  Card,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  message,
  Alert,
} from "antd";
import { DonationCategory } from "../components/constants";
import { useAppDispatch } from "../redux/store/hook";
import { createDonation } from "../redux/donorRedux/donorAction";
import { useState } from "react";

const Donation = () => {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await dispatch(createDonation(values)).unwrap();
      setShowSuccess(true);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create donation");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen m-4">
      <Card
        className="w-full"
        title={<h1 className="text-xl font-semibold">Create a Donation</h1>}
      >
        {showSuccess && (
          <Alert
            message="Donation created successfully"
            type="success"
            showIcon
            closable
            onClose={() => setShowSuccess(false)}
            className="mb-4"
          />
        )}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="description" label="Description">
                <Input placeholder="Description" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Select
                  placeholder="Select category"
                  options={DonationCategory}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  { required: true, message: "Quantity is required" },
                  {
                    type: "number",
                    min: 1,
                    message: "Quantity must be a positive number",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter quantity"
                  className="w-full"
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Donation;
