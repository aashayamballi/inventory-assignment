// react related
import React, { useEffect } from "react";

// third party imports
import { Layout, Menu } from "antd";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppstoreOutlined, AppstoreAddOutlined } from "@ant-design/icons";

// project imports
import RenderRoutes from "../../routes/Routes";
import airbusLogo from "../../images/airbus-logo.svg";
import { disaptchUser } from "../../actions/user/action-creator";
import ResultInfo from "../general/ResultInfo";
const { Header, Content, Footer } = Layout;

export default function LayoutComponent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(disaptchUser());
  }, []);

  if (error.status) {
    return (
      <ResultInfo
        status={error.statusCode}
        title={error.title}
        subTitle={error.subTitle}
      />
    );
  } else {
    return (
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo">
            <img src={airbusLogo} alt="" className="logo__img" />
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/">
              <NavLink to="/" exact>
                <AppstoreOutlined style={{ marginRight: 10 }} />
                Products
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/product/create">
              <NavLink to="/product/create" exact>
                <AppstoreAddOutlined style={{ marginRight: 10 }} />
                Create Product
              </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div className="site-layout-content">
            <RenderRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>SmartCow ©2021</Footer>
      </Layout>
    );
  }
}
