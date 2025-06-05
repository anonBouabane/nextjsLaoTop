"use client";
import { Layout } from "antd";
import Nav from "../components/nav";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          height: 70,
          backgroundColor: "#001529",
          color: "white",
          padding: "0 20px",
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        dashboard
      </Header>

      <Layout style={{ flex: 1 }}>
        <Sider
          width={200}
          style={{
            backgroundColor: "#f0f2f5",
            overflowY: "auto",
          }}
        >
          <Nav />
        </Sider>

        <Content
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            overflow: "auto",
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
