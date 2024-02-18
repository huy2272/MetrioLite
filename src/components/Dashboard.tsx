import { Layout } from "antd";
import FormGrid from "./FormGrid";
import Navbar from "./Navbar";
import logo from "../assets/hero.svg";
import "./Dashboard.css";
const Dashboard = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="dashboard">
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "#FFFFFF",
          }}
        >
          <div className="demo-logo">
            <img className="logo" src={logo} alt="Logo"></img>
          </div>
          <Navbar />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              minHeight: 280,
              padding: 24,
            }}
          >
            <FormGrid />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by Khanh Huy Nguyen, Concordia University ©
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </div>
  );
};

export default Dashboard;
