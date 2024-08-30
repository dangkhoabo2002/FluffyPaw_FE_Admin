import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Pagination } from "antd";
import Highlighter from "react-highlight-words";

import SideBar from "../component/sidebar";

const data = [
  {
    key: "1",
    name: "Nguyễn Thị Bích Phượng",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Mai Văn Tiến Hoàng Đạt",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Lê Hiếu Nghĩa Đệ Nhất Thương Tâm Nhàn",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Ngô Tiến Đạt",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Ngô Tiến Đạt",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    name: "Ngô Tiến Đạt",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    name: "Ngô Tiến Đạt",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
export default function AccountManagement_PO() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "26%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "startDate",
      key: "startDate",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gửi cảnh cáo",
      fixed: "right",
      width: 120,
      render: () => <a>action</a>,
    },
    {
      title: "Cấm hoạt động",
      width: 140,
      render: () => <a>action</a>,
    },
  ];
  return (
    <div>
      <div className="flex flex-row h-screen">
        <div className="flex flex-col gap-4 fixed top-0 left-0 bottom-0 w-92">
          <SideBar />
        </div>
        <div className="py-12 pr-12 flex flex-col gap-10 bg-[#f1f5f9] w-full pl-[356px]">
          <div
            className="flex flex-col bg-white h-screen"
            style={{
              border: "1px solid rgb(226, 232, 240)",
              boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, .07)",
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
