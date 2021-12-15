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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCategory, editProduct } from "../../actions/inventory/api";
import { SET_PRODUCT_ERROR } from "../../actions/inventory/types";
import { dispatchDetailProduct } from "../../actions/inventory/action-creator";
import ResultInfo from "../general/ResultInfo";

const { TextArea } = Input;
const { Title } = Typography;

function EditProduct() {
  const [category, setCategory] = useState([]);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(dispatchDetailProduct(productId));
    const categories = await getCategory();
    setCategory(categories);

    return () => {
      dispatch({ type: SET_PRODUCT_ERROR, payload: {} });
    };
  }, []);

  const { error, detailProduct, loading } = useSelector(
    (state) => state.inventoryReducer
  );

  const categoryOption = () => {
    return category.map((data) => {
      return (
        <Select.Option key={data.id} value={data.id}>
          {data.categoryName}
        </Select.Option>
      );
    });
  };

  const formInitialValue = {
    ...detailProduct,
    category: detailProduct?.category?.id,
  };

  const onFinish = async (data) => {
    try {
      await editProduct({
        edit_product_data: data,
        product_id: productId,
      });
      message.success("Successfully updated product");
    } catch (error) {
      message.error("SOMETHING WENT WRONG! Please try again after sometime");
    }
  };

  if (loading) {
    return <Spin />;
  } else if (Object.keys(error).length !== 0) {
    return (
      <ResultInfo
        status={error.status}
        title={error.title}
        subTitle={error.subTitle}
      />
    );
  } else {
    return (
      <>
        <Title level={5}>Edit Product</Title>
        <div className="container">
          <Form
            initialValues={formInitialValue}
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
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

export default React.memo(EditProduct);
