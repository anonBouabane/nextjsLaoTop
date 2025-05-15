"use client";

import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values: any) => {
    const { email, password } = values.user;

    if (email === "admin@gmail.com" && password === "12345678") {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
        router.push("/dashboard");
      }, 2000);
    } else {
      setModalMessage("Invalid email or password");
      setIsModalOpen(true);
      form.resetFields();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md w-full max-w-md">
          <div className="mb-6 text-2xl font-bold text-center">Login</div>
          <Form
            form={form}
            name="login-form"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
          >
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                { required: true },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>

            <Form.Item
              name={["user", "password"]}
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password must be at least 8 characters!",
                  min: 8,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-between text-sm">
                <Link href={"/verifyemail"}>Forgot password</Link>
                <Link href={"/createaccount"}>create an account</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Modal
        title="Notification"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        centered
        okButtonProps={{ disabled: loading }}
        cancelButtonProps={{ disabled: loading }}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default App;
