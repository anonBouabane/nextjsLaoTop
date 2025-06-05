"use client";

import { Modal, Form, Input, InputNumber } from "antd";
import React, { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
}

interface Props {
  open: boolean;
  onCancel: () => void;
  onSave: (product: Product) => void;
  initialData: Product | null;
}

const ProductFormModal = ({ open, onCancel, onSave, initialData }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const product: Product = initialData
          ? { ...initialData, ...values }
          : values;
        onSave(product);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={initialData ? "ແກ້ໄຂສິນຄ້າ" : "ເພີ່ມສິນຄ້າ"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="ບັນທຶກ"
      cancelText="ຍົກເລີກ"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="ຊື່ສິນຄ້າ"
          name="name"
          rules={[{ required: true, message: "ກະລຸນາໃສ່ຊື່ສິນຄ້າ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ລາຍລະອຽດ"
          name="description"
          rules={[{ required: true, message: "ກະລຸນາໃສ່ລາຍລະອຽດ" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="ລາຄາ"
          name="price"
          rules={[{ required: true, message: "ກະລຸນາໃສ່ລາຄາ" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="ສ່ວນຫຼຸດ (%)" name="discount" initialValue={0}>
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
