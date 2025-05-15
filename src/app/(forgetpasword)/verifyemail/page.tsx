"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input, Modal } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    const email = values.user?.email;

    if (email === "admin@gmail.com") {
      router.push("/verifyOTP");
    } else {
      setModalMessage("This email is not authorized.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md w-full max-w-md">
          <div className="mb-6 text-2xl font-bold text-center">verify email</div>
          <Form
            {...layout}
            name="verify-email"
            onFinish={onFinish}
            validateMessages={validateMessages}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
          >
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                { required: true },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>
            <Flex justify="end" gap="small">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="button" onClick={() => router.push("/")}>
                  Cancel
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </div>
      </div>

      <Modal
        title="Notification"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        centered
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default App;
