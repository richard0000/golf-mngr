import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderBar = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/"}>Tournaments</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/players"}>Players</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderBar;
