// components/UserFormModal.tsx
"use client";

import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { User } from "@/app/user";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSave: (user: User) => void;
  initialData: User | null;
}

const UserFormModal: React.FC<Props> = ({
  open,
  onCancel,
  onSave,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const user = { ...initialData, ...values };
      onSave(user as User);
    });
  };

  return (
    <Modal
      open={open}
      title={initialData ? "ແກ້ໄຂຜູ້ໃຊ້" : "ເພີ່ມຜູ້ໃຊ້"}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ຊື່"
          name="name"
          rules={[{ required: true, message: "ກະລຸນາປ້ອນຊື່" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ອີເມວ"
          name="email"
          rules={[
            { required: true, type: "email", message: "ອີເມວບໍ່ຖືກຕ້ອງ" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ສິດທິ"
          name="role"
          rules={[{ required: true, message: "ກະລຸນາລະບຸສິດທິ" }]}
        >
          <Input placeholder="admin, user..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
