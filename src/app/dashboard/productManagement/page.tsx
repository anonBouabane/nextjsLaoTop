"use client";

import { Button, Popconfirm, Space, Table, message } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import ProductFormModal from "@/app/dashboard/productManagement/ProductFormModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "ເສື້ອຍືດຜູ້ຍິງ",
    description: "ເສື້ອແຟຊັ່ນ ຄ້າຍສວມສບາຍ",
    price: 150000,
    discount: 10,
  },
  {
    id: 2,
    name: "ຊຸດກະໂປ່ງ",
    description: "ເຫຼາະກັບການໃສ່ອອກງານ",
    price: 250000,
    discount: 15,
  },
];

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    message.success("ລົບສິນຄ້າແລ້ວ");
  };

  const handleSave = (product: Product):void => {
    if (editingProduct) {
      // แก้ไข
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      message.success("ແກ້ໄຂສິນຄ້າແລ້ວ");
    } else {
      // เพิ่มใหม่
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts([...products, { ...product, id: newId }]);
      message.success("ເພີ່ມສິນຄ້າແລ້ວ");
    }
    setIsModalOpen(false);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "ຊື່ສິນຄ້າ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ລາຍລະອຽດ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "ລາຄາ",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} ກີບ`,
    },
    {
      title: "ສ່ວນຫຼຸດ",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "ຈັດການ",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="link">
            ແກ້ໄຂ
          </Button>
          <Popconfirm
            title="ຕ້ອງການລົບສິນຄ້າ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              ລົບ
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleAdd}>
          ເພີ່ມສິນຄ້າ
        </Button>
      </div>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <ProductFormModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </>
  );
}
