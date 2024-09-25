import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Tag } from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";

import SideBar from "../component/sidebar";

// const data = [
//   {
//     key: "1",
//     name: "Nguyễn Thị Bích Phượng",
//     age: 32,
//     startDate: "24-07-2024",
//     status: ["tốt"],

//     address: "New York No. 1 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "2",
//     name: "Mai Văn Tiến Hoàng Đạt",
//     age: 42,
//     startDate: "24-07-2024",
//     status: ["tốt"],

//     address: "London No. 1 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "3",
//     name: "Lê Hiếu Nghĩa Đệ Nhất Thương Tâm Nhàn",
//     age: 32,
//     startDate: "20-04-2024",
//     status: ["tốt"],

//     address: "Sydney No. 1 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "4",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "24-03-2024",
//     status: ["tốt"],

//     address: "London No. 2 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "5",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "24-01-2024",
//     status: ["tốt"],

//     address: "London No. 2 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "6",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "21-02-2024",
//     status: ["vi phạm"],

//     address: "London No. 2 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "7",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "04-07-2024",
//     status: ["cảnh cáo"],

//     address: "London No. 2 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "8",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "24-07-2023",
//     status: ["cảnh cáo"],

//     address: "London No. 2 Lake Park",
//     username: "username123",
//   },
//   {
//     key: "9",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "24-06-2024",
//     status: ["tốt"],

//     username: "username123",
//   },
//   {
//     key: "10",
//     name: "Ngô Tiến Đạt",
//     age: 32,
//     startDate: "20-07-2024",
//     status: ["cảnh cáo"],
//     username: "abcFulfypaw1231231",
//   },
// ];
export default function AccountManagement_PO() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      dataIndex: "fullName",
      key: "fullName",
      width: "26%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "startDate",
      key: "startDate",
      width: "14%",

      ...getColumnSearchProps("startDate"),
    },

    {
      title: "Tình trạng",
      key: "status",
      dataIndex: "status",
      width: "12%",

      filters: [
        {
          text: "Tốt",
          value: "tốt",
        },
        {
          text: "Cảnh cáo",
          value: "cảnh cáo",
        },
        {
          text: "Vi phạm",
          value: "vi phạm",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Thông tin",
      width: 140,
      render: () => (
        <Button type="primary" onClick={showModal}>
          Chi tiết
        </Button>
      ),
    },
    {
      title: "Gửi cảnh cáo",
      fixed: "right",
      width: 120,
      render: () => <Button>Cảnh cáo</Button>,
    },
    {
      title: "Cấm hoạt động",
      width: 140,
      render: () => <Button>Khóa tài khoản</Button>,
    },
  ];

  // GET SM ACCOUNT
  const [loading, setLoading] = useState(false);
  const [poAccounts, setPoAccounts] = useState();
  const handleGetPO = async () => {
    try {
      const response = await axios.get(
        "https://fluffypaw.azurewebsites.net/api/Admin/GetPetOwners",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      setPoAccounts(response.data.data.result);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetPO();
  }, []);
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
            <button onClick={() => console.log(poAccounts)}>LCICKK</button>
            <button onClick={() => handleGetPO()}>GetAlla</button>

            <Table
              columns={columns}
              dataSource={poAccounts}
              pagination={{ pageSize: 7 }}
            />
          </div>
        </div>
      </div>
      {/* MODAL DETAIL PET OWNER */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
