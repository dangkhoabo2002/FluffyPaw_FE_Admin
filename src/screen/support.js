import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Table } from "antd";
import SideBar from "../component/sidebar";

const items = [
  {
    label: "Từ chủ thú cưng",
    key: "po_support",
    icon: <MailOutlined />,
  },
  {
    label: "Từ cửa hàng",
    key: "sm_support",
    icon: <MailOutlined />,
  },
  {
    label: "Đang xử lí",
    key: "in_proccess",
    icon: <MailOutlined />,
  },
  {
    label: "Các đơn đã xử lý",
    key: "sp_history",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Lịch sử",
        children: [
          {
            label: "Chủ thú cưng",
            key: "setting:1",
          },
          {
            label: "Cửa hàng",
            key: "setting:2",
          },
        ],
      },
    ],
  },
];

// TABLE
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];
const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description: "Tôi muốn được hỗ trợ về việc truy cứu danh sách các dịch vụ.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];
export default function Support() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col gap-4 fixed top-0 left-0 bottom-0 w-92">
        <SideBar />
      </div>
      <div className="py-12 pr-12 flex flex-col gap-6 bg-[#f1f5f9] w-full pl-[356px]">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />

        <div className=" bg-white w-full">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
}
