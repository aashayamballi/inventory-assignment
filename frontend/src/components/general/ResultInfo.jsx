import React from "react";
import { Result, Button } from "antd";

export default function ResultInfo({
  status = "403",
  title = "Unauthorized",
  subTitle = "Please login to use the application",
}) {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
