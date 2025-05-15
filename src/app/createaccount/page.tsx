"use client";

import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const CreateAccount: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    setIsModalVisible(true);

    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
      form.resetFields();
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md w-full max-w-md">
          <div className="mb-6 text-2xl font-bold text-center">
            Create Account
          </div>
          <Form
            {...layout}
            form={form}
            name="create-account"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="vertical"
          >
            <Form.Item
              name="fullname"
              label="Full Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true },
                {
                  type: "number",
                  min: 1,
                  max: 120,
                  message: "Please enter a valid age",
                },
              ]}
              getValueFromEvent={(e) => Number(e.target.value)}
            >
              <Input type="number" placeholder="Enter your age" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter your address" rows={3} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        title="Account Created"
        footer={null}
        closable={false}
        centered
      >
        <p>create account successfuly...</p>
      </Modal>
    </>
  );
};

export default CreateAccount;
