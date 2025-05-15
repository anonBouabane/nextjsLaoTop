"use client";

import { Card, Statistic, Row, Col, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import React from "react";

const Dashboard: React.FC = () => {
  const summaryData = [
    {
      title: "Users",
      value: 1280,
      icon: <ArrowUpOutlined style={{ color: "#52c41a" }} />,
    },
    {
      title: "Orders",
      value: 320,
      icon: <ArrowDownOutlined style={{ color: "#f5222d" }} />,
    },
    {
      title: "Revenue",
      value: 9450,
      prefix: "$",
      icon: <ArrowUpOutlined style={{ color: "#1890ff" }} />,
    },
  ];

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className={status === "Completed" ? "text-green-500" : "text-red-500"}>
          {status}
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      customer: "John Doe",
      product: "iPhone 15",
      amount: 1099,
      status: "Completed",
    },
    {
      key: "2",
      customer: "Jane Smith",
      product: "MacBook Pro",
      amount: 2399,
      status: "Pending",
    },
    {
      key: "3",
      customer: "Alex Johnson",
      product: "AirPods Pro",
      amount: 249,
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Row gutter={16}>
        {summaryData.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card>
              <div className="flex items-center justify-between">
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.prefix}
                />
                <div className="text-2xl">{item.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Card>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
