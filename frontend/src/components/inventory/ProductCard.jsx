import React from "react";
import { Card, Typography, Tooltip, Modal } from "antd";
import { useDispatch } from "react-redux";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { dispatchProductDeletion } from "../../actions/inventory/action-creator";

const { Text, Paragraph } = Typography;
const { Meta } = Card;
const { confirm } = Modal;

export default function ProductCard({ title, description, id, category }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const confirmDelete = () =>
    confirm({
      title: `Delete ${title}`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete this product?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(dispatchProductDeletion(id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  return (
    <>
      <Card
        hoverable={true}
        cover={
          <img
            alt="example"
            src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200114114006-belugaxl-first-flight-air-to-air-074.jpg"
          />
        }
        actions={[
          <Tooltip placement="bottom" title="Detail info">
            <EyeOutlined
              onClick={() => history.push(`product/${id}`)}
              key="detail"
            />
          </Tooltip>,
          <Tooltip placement="bottom" title="Edit Product">
            <EditOutlined
              onClick={() => history.push(`product/edit/${id}`)}
              key="edit"
            />
          </Tooltip>,
          <Tooltip placement="bottom" title="Delete Product">
            <DeleteOutlined onClick={confirmDelete} key="delete" />
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={
            <>
              <Paragraph ellipsis={true}>{category}</Paragraph>
              <Text ellipsis={true} style={{ fontWeight: "normal" }}>
                {description}
              </Text>
            </>
          }
        />
      </Card>
    </>
  );
}
