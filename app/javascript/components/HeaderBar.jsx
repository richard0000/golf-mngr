import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderBar = () => (
  <Header>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">Home</Menu.Item>
      <Menu.Item key="2">Our Services</Menu.Item>
      <Menu.Item key="3">Contact</Menu.Item>
    </Menu>
  </Header>
);

export default HeaderBar;
