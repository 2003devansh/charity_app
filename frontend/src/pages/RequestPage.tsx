import { Card, Col, Form, Input, Row } from "antd";

const RequestPage = () => {
  return (
    <div>
      <Form>
        <h1>form layout for the request pag</h1>
        <Card>
          <Row>
            <Col>
              <Form.Item name={"title"} label="Title">
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={"description"} label="Title">
                <Input placeholder="Enter description" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default RequestPage;
