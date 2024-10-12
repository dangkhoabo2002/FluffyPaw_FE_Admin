import React, { useState } from "react";
import {
  HistoryOutlined,
  UserOutlined,
  TagOutlined,
  BarChartOutlined,
  DollarOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Logo from "../logo.png";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "sub1",
    label: "Thống kê",
    icon: <BarChartOutlined />,
  },
  {
    key: "sub2",
    label: "Quản lí",
    icon: <UserOutlined />,
    children: [
      {
        key: "1",
        label: "Chủ thú cưng",
      },
      {
        key: "2",
        label: "Cửa hàng",
      },
      {
        key: "sub2_1",
        label: "Thương hiệu",
      },
    ],
  },
  {
    key: "sub3",
    label: "Chờ xử lí",
    icon: <ContainerOutlined />,
    children: [
      {
        key: "sub3_1",
        label: "Thương hiệu chờ duyệt",
      },
      {
        key: "sub3_2",
        label: "Cửa hàng chờ duyệt",
      },
    ],
  },
  // {
  //   key: "sub3",
  //   label: "Hỗ trợ",
  //   icon: <BarChartOutlined />,
  // },
  {
    key: "sub4",
    label: "Hệ thống",
    icon: <TagOutlined />,
    children: [
      {
        key: "3",
        label: "Danh sách",
      },
      {
        key: "4",
        label: "Thêm mới",
      },
    ],
  },
  {
    key: "sub5",
    label: "Lịch sử",
    icon: <HistoryOutlined />,
    children: [
      {
        key: "5",
        label: "Rút tiền",
      },
      {
        key: "6",
        label: "Nạp tiền",
      },
      {
        key: "7",
        label: "Báo cáo",
      },
      {
        key: "8",
        label: "Khác",
      },
    ],
  },
  {
    key: "sub6",
    label: "Rút tiền",
    icon: <DollarOutlined />,
  },
];
const SideBar = () => {
  const [current, setCurrent] = useState("1");
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    switch (e.key) {
      case "sub1":
        navigate("/admin/dashboard");
        break;
      case "1":
        navigate("/admin/po_account");
        break;
      case "2":
        navigate("/admin/sm_account");
        break;
      case "sub3":
        navigate("/admin/support");
        break;
      case "3":
        navigate("/admin/list_category");
        break;
      case "4":
        navigate("/admin/add_category");
        break;
      case "5":
        navigate("/admin/wd_history");
        break;
      case "6":
        navigate("/admin/rc_history");
        break;
      case "7":
        navigate("/admin/rp_history");
        break;
      case "8":
        navigate("/admin/wd_request");
        break;
      case "sub2_1":
        navigate("/admin/store_waiting");
        break;
      case "sub3_1":
        navigate("/admin/waiting_sm_brand");
        break;
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate(`/`);
  };
  return (
    <>
      <div className="flex flex-col bg-[#001529] text-white h-full">
        <div className="flex flex-row justify-left items-center gap-4 px-6 pt-10">
          <img alt="logo" src={Logo} className="w-[80px]" />
          <h1 className="text-3xl">Fluffy Paw</h1>
        </div>

        <Menu
          className="h-screen text-[16px]"
          theme="dark"
          onClick={onClick}
          style={{
            width: 300,
            padding: "16px 12px",
          }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </>
  );
};
export default SideBar;
