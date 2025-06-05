// app/dashboard/hrm/page.tsx
"use client";

import { Button, Table, message, Popconfirm, Space } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import UserFormModal from "@/app/components/UserFormModel";
import { User } from "@/app/user";

const initialUsers: User[] = [
  { id: 1, name: "ພິມພິລັດ", email: "pim@example.com", role: "admin" },
  { id: 2, name: "ສຸລິດ", email: "soulit@example.com", role: "user" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    message.success("ລົບຜູ້ໃຊ້ແລ້ວ");
  };

  const handleSave = (user: User): void => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      message.success("ແກ້ໄຂຜູ້ໃຊ້ແລ້ວ");
    } else {
      const newId = Math.max(...users.map((u) => u.id)) + 1;
      setUsers([...users, { ...user, id: newId }]);
      message.success("ເພີ່ມຜູ້ໃຊ້ແລ້ວ");
    }
    setIsModalOpen(false);
  };

  const columns: ColumnsType<User> = [
    { title: "ຊື່", dataIndex: "name", key: "name" },
    { title: "ອີເມວ", dataIndex: "email", key: "email" },
    { title: "ສິດທິ", dataIndex: "role", key: "role" },
    {
      title: "ຈັດການ",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="link">
            ແກ້ໄຂ
          </Button>
          <Popconfirm
            title="ຢືນຢັນການລົບ?"
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
          ເພີ່ມຜູ້ໃຊ້
        </Button>
      </div>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <UserFormModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingUser}
      />
    </>
  );
}
