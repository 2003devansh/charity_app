import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  GiftOutlined,
  UnorderedListOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const menuItem = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "/donations",
    icon: <GiftOutlined />,
    label: <Link to="/donations">Donations</Link>,
  },
  {
    key: "/requests",
    icon: <UnorderedListOutlined />,
    label: <Link to="/requests">Requests</Link>,
  },
  {
    key: "/volenteer",
    icon: <UserOutlined />,
    label: <Link to="/volenteer">Volenteers</Link>,
  },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <Layout className="relative">
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={250}
        className="min-h-screen bg-black"
      >
        <div className="text-white text-center py-4 text-xl font-bold">
          {collapsed ? "C" : "CharityApp"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          className="bg-black"
          items={menuItem}
        />
      </Sider>

      <div
        className="
          absolute top-8
           text-white p-2  
          cursor-pointer transition-all duration-300
        "
        style={{ left: collapsed ? 80 : 220 }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <RightOutlined className="text-base" />
        ) : (
          <LeftOutlined className="text-base" />
        )}
      </div>

      <Layout>
        <Content className="p-6 bg-black text-white min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
