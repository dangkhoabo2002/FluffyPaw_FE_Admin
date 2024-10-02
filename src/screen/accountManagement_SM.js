import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, AlignLeftOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Dropdown, Modal, Tag } from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";

import SideBar from "../component/sidebar";

const items = [
  {
    key: "1",
    label: <button>Cảnh cáo</button>,
  },
  {
    key: "2",
    label: <button>Cấm hoạt động</button>,
  },
];
export default function AccountManagement_SM() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log(poAccounts + "hellooooo");

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
      dataIndex: "fullname",
      key: "fullname",
      width: "20%",
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
      width: "18%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "13%",

      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",

      ...getColumnSearchProps("email"),
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
      title: "Tình trạng",
      key: "reputation",
      dataIndex: "reputation",
      width: "12%",
      render: (reputation) => (
        <span>
          <Tag
            color={
              reputation === "null"
                ? "default"
                : reputation === 2
                ? "blue"
                : reputation === 3
                ? "green"
                : "default"
            }
            key={reputation}
          >
            {reputation?.toUpperCase()}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "Tốt",
          value: "Good",
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
      onFilter: (value, record) => record.reputation.indexOf(value) === 0,
    },
    {
      title: "Hành động",
      width: "10%",
      render: () => (
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <AlignLeftOutlined style={{ fontSize: "24px", color: "gray" }} />
          </a>
        </Dropdown>
      ),
    },
  ];

  // GET SM ACCOUNT
  const [loading, setLoading] = useState(false);
  const [poAccounts, setPoAccounts] = useState();
  const handleGetPO = async () => {
    try {
      const response = await axios.get(
        "https://fluffypaw.azurewebsites.net/api/Account/GetStores",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        setPoAccounts(response.data.data.result);
        console.log(response.data.data.result);
      }
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
        title="Chi tiết cửa hàng"
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
