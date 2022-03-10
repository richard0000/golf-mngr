import { Layout } from "antd";
import React from "react";
import Tournaments from "./Tournaments";
import HeaderBar from "./HeaderBar";

const { Content, Footer } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <HeaderBar />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ margin: "100px auto" }}>
          <h1>Tournaments List</h1>
          <Tournaments />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Golf Mngr ©2022.</Footer>
    </Layout>
  );
};

export default Home;
