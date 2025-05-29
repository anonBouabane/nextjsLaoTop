'use client';

import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="/dashboard">ໜ້າຫຼັກ</Link>,
  },
  {
    key: '2',
    label: <Link href="/dashboard/seller">ການຂາຍ</Link>,
  },
  {
    key: '3',
    label: <Link href="/dashboard/settings">ການຕັ້ງຄ່າ</Link>,
  },
];

const Nav = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

export default Nav;
