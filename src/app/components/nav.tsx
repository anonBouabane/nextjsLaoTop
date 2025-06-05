"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/dashboard">ສິນຄ້າທັງໝົດ</Link>,
  },
  {
    key: "2",
    label: <Link href="/dashboard/productManagement">ຈັດການສິນຄ້າ</Link>,
  },
  {
    key: "3",
    label: <Link href="/dashboard/hrm">ຈັດການຜູ້ໃຊ້</Link>,
  },
];

const Nav = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
};

export default Nav;
