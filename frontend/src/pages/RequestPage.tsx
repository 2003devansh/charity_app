import { Card, Col, Form, Input, Row, Select } from "antd";

const RequestPage = () => {
  return (
    <div>
      <Form>
        <h1>form layout for the request pag</h1>
        <Card>
          <Row>
            <Col>
              <Form.Item
                name={"title"}
                label="Title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"description"}
                label="Description"
                rules={[{ required: true, message: "Description is required" }]}
              >
                <Input placeholder="Enter description" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"category"}
                label="Category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Select placeholder="Enter description" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default RequestPage;
