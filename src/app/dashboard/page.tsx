"use client";
import React, { useEffect, useState } from "react";
import { Table, ConfigProvider } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import thTH from "antd/locale/th_TH";

interface ProductType {
  key: string;
  id: number;
  pro_name: string;
  price: number;
  cat_name: string;
  created_date: string;
  updated_date: string;
}

const columns: TableProps<ProductType>["columns"] = [
  {
    title: "Product Name",
    dataIndex: "pro_name",
    key: "pro_name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price.toLocaleString()} kip`,
  },
  {
    title: "Category",
    dataIndex: "cat_name",
    key: "cat_name",
  },
  {
    title: "Created Date",
    dataIndex: "created_date",
    key: "created_date",
    render: (date) =>
      new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(date)),
  },
  {
    title: "Updated Date",
    dataIndex: "updated_date",
    key: "updated_date",
    render: (date) =>
      new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(date)),
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProductType[]>(
          "http://localhost:3030/products"
        );
        const products = response.data.map((item) => ({
          ...item,
          key: item.id.toString(),
        }));
        setData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorBgContainer: "#fff",
          colorText: "#000",
        },
        components: {
          Table: {
            headerBg: "#f0f2f5",
            headerColor: "#000",
            rowHoverBg: "#e6f7ff",
          },
        },
      }}
    >
      <Table<ProductType>
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered
        rowClassName={() => "custom-row"}
      />
    </ConfigProvider>
  );
};

export default App;
