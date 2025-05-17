import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import { schoolAdminPaths } from "../../Routes/schoolAdmin.route";

const DashboardLayout = () => {
  const userRole = JSON.parse(localStorage.getItem("user_info") || "null");
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = [
    "orders",
    "service",
    "customer-feedBack",
    "settings",
  ];

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]); // Only keep the latest submenu open
    } else {
      setOpenKeys(keys); // Update normally for closing or nested submenus
    }
  };

  const defaultUrl = userRole?.role === "admin" ? "/admin" : "/";
  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems =
    userRole?.role === "admin"
      ? //   ? sidebarItemsGenerator(adminPaths, "admin")
        sidebarItemsGenerator(adminPaths, userRole?.role)
      : sidebarItemsGenerator(schoolAdminPaths, userRole?.role);
  // : sidebarItemsGenerator(resturantOwnerPaths, userRole?.role);

  menuItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#40140F", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={() => localStorage.removeItem("user_info")}>
        <NavLink to="/signin">Logout</NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-primary-color">
        <Sider
          theme="dark"
          width={300}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#28314E",
            borderRight: "3px solid #e1e1e1",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[50%] mx-auto h-auto my-5"
            />
          </Link>

          <Menu
            mode="inline"
            openKeys={openKeys} // Bind openKeys state
            onOpenChange={onOpenChange} // Handle open/close
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
            className="!px-5"
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-primary-color px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
