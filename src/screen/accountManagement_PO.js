import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, AlignLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Dropdown,
  Tag,
  notification,
  Spin,
  Modal,
} from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";

export default function AccountManagement_PO() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === "warning") {
      api.warning({
        message: "Thông tin này không thể trống !",
        description: "Vui lòng nhập đầy đủ thông tin của bạn để tiếp tục.",
        placement: "bottomRight",
      });
    } else if (type === "unvalid_email") {
      api.warning({
        message: "Sai định dạng mail !",
        description: "Vui lòng nhập đúng email của bạn.",
        placement: "bottomRight",
      });
    } else if (type === "unvalid_phone") {
      api.warning({
        message: "Sai định dạng số điện thoại !",
        description: "Vui lòng nhập đúng số điện thoại của bạn.",
        placement: "bottomRight",
      });
    } else if (type === "success_warning") {
      api.success({
        message: "Cảnh cáo tài khoản thành công.",
        description: "Tài khoản đã bị hạ bậc, vui lòng chờ trong giây lát.",
        placement: "bottomRight",
      });
    }
  };

  const [loading, setLoading] = useState(false);

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
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      width: "10%",

      ...getColumnSearchProps("dob"),
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
      title: "Tình trạng",
      key: "reputation",
      dataIndex: "reputation",
      width: "12%",
      render: (reputation) => (
        <span>
          <Tag
            color={
              reputation === "Tốt"
                ? "green-inverse"
                : reputation === "Cảnh cáo"
                ? "blue-inverse"
                : reputation === "Vi phạm"
                ? "orange-inverse"
                : "red-inverse"
            }
            key={reputation}
          >
            {reputation}
          </Tag>
        </span>
      ),
      filters: [
        {
          text: "Tốt",
          value: "Tốt",
        },
        {
          text: "Cảnh cáo",
          value: "Cảnh cáo",
        },
        {
          text: "Vi phạm",
          value: "Vi phạm",
        },
        {
          text: "Nghiêm cấm",
          value: "Nghiêm cấm",
        },
      ],
      onFilter: (value, record) => record.reputation.indexOf(value) === 0,
    },
    // {
    //   title: "Thông tin",
    //   width: 140,
    //   render: () => (
    //     <Button type="primary" onClick={showModal}>
    //       Chi tiết
    //     </Button>
    //   ),
    // },

    {
      title: "Hành động",
      width: "10%",
      render: (text, record) => {
        const menuItems = [
          {
            label: "Cảnh cáo",
            key: "1",
            onClick: () =>
              showModal("warning", record?.accountId, record?.fullname),
          },
          {
            label: "Cấm hoạt động",
            key: "2",
            onClick: () =>
              showModal("warning", record?.accountId, record?.fullname),
          },
        ];

        return (
          <Dropdown
            menu={{
              items: menuItems, // Menu items với sự kiện onClick
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <AlignLeftOutlined style={{ fontSize: "24px", color: "gray" }} />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
  const [isModalOpenBan, setIsModalOpenBan] = useState(false);
  const [idPo, setIdPo] = useState(0);
  const [namePo, setNamePo] = useState();

  const showModal = (input, record, namePo) => {
    setIdPo(record);
    setNamePo(namePo);
    if (input === "warning") {
      setIsModalOpenWarning(true);
    } else if (input === "warning") setIsModalOpenBan(true);
  };

  const handleCancel = () => {
    setIsModalOpenWarning(false);
    setIsModalOpenBan(false);
    setIdPo(0);
  };
  // GET PO ACCOUNT
  const [poAccounts, setPoAccounts] = useState();
  const [loadingGet, setLoadingGet] = useState(false);

  const handleGetPO = async () => {
    showLoader();
    setLoadingGet(true);
    try {
      const response = await axios.get(
        "https://fluffypaw.azurewebsites.net/api/Account/GetPetOwners",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        const formatDate = (isoDate) => {
          const date = new Date(isoDate);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };

        const formattedData = response.data.data?.map((item) => ({
          ...item,
          dob: formatDate(item.dob),
          reputation:
            item.reputation === "Good"
              ? "Tốt"
              : item.reputation === "Warning"
              ? "Cảnh cáo"
              : item.reputation === "Bad"
              ? "Tệ"
              : "Nghiêm cấm",
        }));
        setPoAccounts(formattedData);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingGet(false);
    }
  };

  // DOWNGRADE PO ACCOUNT
  const handleWarningPO = async (PoId) => {
    try {
      const response = await axios.patch(
        `https://fluffypaw.azurewebsites.net/api/Admin/DowngradeReputation/${PoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        handleGetPO();
        openNotificationWithIcon("success_warning");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  const [spinning, setSpinning] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };
  useEffect(() => {
    handleGetPO();
  }, []);
  return (
    <div>
      {contextHolder}
      <div className=" pr-12 flex flex-col gap-10 bg-[#f1f5f9] w-full">
        {loadingGet && (
          <Spin spinning={spinning} percent={percent} fullscreen />
        )}

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
            rowKey="id"
          />
        </div>
      </div>
      {/* MODAL WARNINg PET OWNER */}
      <Modal open={isModalOpenWarning} onCancel={handleCancel}>
        <h1 className="text-[20px]">Cảnh cáo tài khoản {namePo}</h1>
        <p>* Lưu ý:</p>
        <p>
          - Mọi hành động của bạn sẽ KHÔNG THỂ HOÀN TÁC và bạn sẽ phải CHỊU
          TRÁCH NHIỆM nếu xảy ra xự cố hoặc nhầm lẫn.
        </p>
      </Modal>

      {/* MODAL BAN PET OWNER */}
      <Modal
        title="Basic Modal"
        open={isModalOpenWarning}
        onCancel={handleCancel}
        footer={[
          <>
            <Button>Hủy bỏ</Button>
            <Button onClick={handleWarningPO(idPo)}>
              Tôi sẵn sàng chịu trách nhiệm !
            </Button>
          </>,
        ]}
      >
        <h1 className="text-[20px]">
          Cấm tài khoản {namePo} hoạt động trên Fluffy Paw{" "}
        </h1>
        <p>* Lưu ý:</p>
        <p>
          - Mọi hành động của bạn sẽ KHÔNG THỂ HOÀN TÁC và bạn sẽ phải CHỊU
          TRÁCH NHIỆM nếu xảy ra xự cố hoặc nhầm lẫn.
        </p>
        <p>
          - Hành động này sẽ khiến tài khoản {namePo} thực thi bất kì hành động
          trên hệ thống, bạn chắc chắn chứ ?
        </p>
      </Modal>
    </div>
  );
}
