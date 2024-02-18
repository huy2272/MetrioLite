import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { FormOutlined, BarChartOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: "Form",
    key: "form",
    icon: <FormOutlined />,
  },
  {
    label: "Report",
    key: "report",
    icon: <BarChartOutlined />,
    disabled: true,
  },
];
const Navbar = () => {
  const [current, setCurrent] = useState("form");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default Navbar;
