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
          lineHeight: "70px",
          backgroundColor: "#001529",
          color: "white",
          padding: "0 20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        dashboard
      </Header>

      <Layout>
        <Sider
          width={200}
          style={{
            backgroundColor: "#f0f2f5",
            height: `calc(100vh - 70px)`,
            minWidth: 100,
            maxWidth: 200,
            overflow: "auto",
          }}
        >
          <Nav />
        </Sider>

        <Content style={{ flex: 1 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
