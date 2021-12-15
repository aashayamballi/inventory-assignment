import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Select,
  InputNumber,
  Spin,
  Button,
  message,
  Typography,
} from "antd";
import { useHistory } from "react-router-dom";

import { getCategory, createProduct } from "../../actions/inventory/api";

const { TextArea } = Input;
const { Title } = Typography;

function CreateProduct() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    setLoading(true);
    const categories = await getCategory();
    setCategory(categories);
    setLoading(false);
  }, []);

  const categoryOption = () => {
    return category.map((data) => {
      return (
        <Select.Option key={data.id} value={data.id}>
          {data.categoryName}
        </Select.Option>
      );
    });
  };

  const onFinish = async (data) => {
    await createProduct({ create_product: data });
    message.success("New product has been successfully created");
    history.push("/");
  };

  if (loading) {
    return <Spin />;
  } else {
    return (
      <>
        <Title level={5}>Create Product</Title>
        <div className="container">
          <Form
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter product name!",
                },
              ]}
              name="name"
              label="Product Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select a category!",
                },
              ]}
              name="category"
              label="Product Category"
            >
              <Select>{categoryOption()}</Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter description for the product!",
                },
              ]}
              name="description"
              label="Product Description"
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter product units!",
                },
              ]}
              name="units"
              label="Product Units"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 14,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

export default React.memo(CreateProduct);
