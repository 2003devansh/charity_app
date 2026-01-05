import { Form, Input, Card, Button, Row, Col, Select } from "antd";
import { DonationCategory } from "../components/constants";
import { useAppDispatch } from "../redux/store/hook";
import { createDonation } from "../redux/donorRedux/donorAction";

const Donation = () => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    try {
      const res = await dispatch(createDonation(values)).unwrap();
      console.log("Res------------->", res);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen m-4">
      <Card
        className="w-full "
        title={<h1 className="text-xl font-semibold">Create a Donation</h1>}
      >
        <Form layout="vertical" onFinish={(values) => onFinish(values)}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Title is required",
                  },
                ]}
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
              {" "}
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

            <Col>
              <Form.Item
                name={"quantity"}
                label={"Quantity"}
                rules={[
                  {
                    required: true,
                    message: "Quantity is required",
                  },
                ]}
              >
                <Input placeholder="Input a number" maxLength={16} />
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
