import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Image,
  Divider,
  notification,
  Spin,
  Modal,
} from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";
const { TextArea } = Input;

export default function WaitingBrand() {
  // NOTICE
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === "unvalid_phone") {
      api.warning({
        message: "Sai định dạng số điện thoại !",
        description: "Vui lòng nhập đúng số điện thoại của bạn.",
        placement: "bottomRight",
      });
    } else if (type === "success_accept") {
      api.success({
        message: "Kích hoạt thương hiệu thành công.",
        description: "Vui lòng chờ hệ thống xử lí trong giây lát.",
        placement: "bottomRight",
      });
    }
  };
  // GET WAITING BRAND
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [waitBrand, setWaitBrand] = useState();
  const handleGetPO = async () => {
    try {
      setLoadingGet(true);
      const response = await axios.get(
        "https://fluffypaw.azurewebsites.net/api/Admin/GetAllBrandFalse",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        setWaitBrand(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingGet(false);
    }
  };

  // MODAL DETAIL
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState();
  const showModal = (record, type) => {
    setSelectedDetail(record);
    if (type === "view") setIsModalOpenView(true);
    else setIsModalOpenConfirm(true);
  };

  const handleCancel = () => {
    setIsModalOpenView(false);
    setIsModalOpenConfirm(false);
    setSelectedDetail("");
  };

  const [isDenied, setIsDenied] = useState(false);
  const [reason, setReason] = useState();
  const onChangeReason = (e) => {
    setReason(e.target.value);
  };

  // TABLE
  function formatDate(list) {
    let date = new Date(list);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  let formattedList = waitBrand?.map((item) => {
    return {
      ...item,
      createDate: formatDate(item.createDate),
    };
  });

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

  // COLUMS
  const columns = [
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      width: "26%",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Đường dây nóng",
      dataIndex: "hotline",
      key: "hotline",
      width: "20%",
      ...getColumnSearchProps("hotline"),
    },

    {
      title: "Email",
      dataIndex: "brandEmail",
      key: "brandEmail",
      width: "14%",

      ...getColumnSearchProps("brandEmail"),
    },
    {
      title: "Hành động",
      width: 140,
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record, "view")}>
          Xem đơn
        </Button>
      ),
    },
    // {
    //   title: "Gửi cảnh cáo",
    //   fixed: "right",
    //   width: 120,
    //   render: () => <Button>Cảnh cáo</Button>,
    // },
    // {
    //   title: "Cấm hoạt động",
    //   width: 140,
    //   render: () => <Button>Khóa tài khoản</Button>,
    // },
  ];

  // ACCEPT BRAND
  const handleAcceptBrand = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://fluffypaw.azurewebsites.net/api/Admin/AcceptBrand/${selectedDetail?.id}`,
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
        openNotificationWithIcon("success_accept");
        console.log(response);
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
    showLoader();
    handleGetPO();
  }, []);
  return (
    <div className="pr-12 flex flex-col gap-10 bg-[#f1f5f9] w-full ">
      {loadingGet && <Spin spinning={spinning} percent={percent} fullscreen />}
      <div
        className="flex flex-col bg-white h-screen"
        style={{
          border: "1px solid rgb(226, 232, 240)",
          boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, .07)",
        }}
      >
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={formattedList}
          pagination={{ pageSize: 7 }}
        />
      </div>

      {/* MODAL DETAIL */}
      <Modal
        title={
          <p className="text-[20px]">Chi tiết đơn của {selectedDetail?.name}</p>
        }
        open={isModalOpenView}
        onCancel={handleCancel}
        footer={[
          <>
            {isDenied === false ? (
              <Button onClick={handleCancel}>Thoát</Button>
            ) : (
              <Button onClick={() => setIsDenied(false)}>Thoát</Button>
            )}
            {isDenied === false ? (
              <Button type="primary" onClick={() => setIsDenied(true)}>
                Từ chối
              </Button>
            ) : (
              <Button type="primary">Gửi phản hồi</Button>
            )}

            <Button
              type={isDenied === true ? "" : "primary"}
              onClick={() => setIsModalOpenConfirm(true)}
            >
              Phê duyệt
            </Button>
          </>,
        ]}
      >
        <div className="flex flex-col pt-6 pb-8 text-[18px] gap-6 justify-center items-center">
          <div className="flex flex-row gap-6 w-full justify-between px-6">
            <p className="text-[16px]">Họ và tên người đăng ký: </p>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">
                {selectedDetail?.fullName}adsadadassad
              </p>
              <div className="flex flex-row gap-4">
                <Image
                  width={100}
                  height={70}
                  alt="CCCD/CMND"
                  src={selectedDetail?.front}
                />
                <Image
                  width={100}
                  height={70}
                  alt="CCCD/CMND"
                  src={selectedDetail?.back}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 pr-[56px]">
            <p className="text-[16px]">Mã số thuế: </p>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">{selectedDetail?.mst}</p>
            </div>
          </div>
          <div className="flex flex-row gap-6 w-full pl-11">
            <p className="text-[16px]">Giấp phép kinh doanh: </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Image
                  width={100}
                  height={70}
                  alt="GPKD"
                  src={selectedDetail?.businessLicense}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 w-full pl-11">
            <p className="text-[16px]">Hình ảnh thương hiệu: </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Image
                  width={100}
                  height={70}
                  alt="GPKD"
                  src={selectedDetail?.logo}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-6 w-full pl-20">
            <p className="text-[16px]">Tên thương hiệu: </p>
            <p>{selectedDetail?.name} </p>
          </div>
          <div className="flex flex-row gap-6 w-full pl-[66px]">
            <p className="text-[16px]">Email thương hiệu: </p>
            <p>{selectedDetail?.brandEmail} </p>
          </div>
          <div className="flex flex-row gap-6 w-full pl-2">
            <p className="text-[16px]">Đường dây nóng (Hotline): </p>
            <p>{selectedDetail?.brandEmail} </p>
          </div>

          {isDenied && (
            <>
              <Divider>Ghi rõ lý do từ chối</Divider>
              <TextArea
                showCount
                maxLength={1500}
                onChange={onChangeReason}
                placeholder="Nhập lí do vào đây."
                style={{
                  height: 120,
                  resize: "none",
                }}
              />
            </>
          )}
        </div>
      </Modal>

      {/* MODAL ACCEPT CONFIRMATION */}
      <Modal
        title={`Bạn cho phép thương hiệu ${selectedDetail?.name} kinh doanh trên Fluffy Paw ? `}
        open={isModalOpenConfirm}
        onCancel={handleCancel}
        footer={[
          <>
            <Button onClick={handleCancel}>Tôi cần suy nghĩ</Button>
            <Button
              onClick={handleAcceptBrand}
              type="primary"
              disabled={loading}
            >
              {loading && <LoadingOutlined spin />} Tôi chắc chắn
            </Button>
          </>,
        ]}
      >
        <p>
          *Lưu ý: Mọi sự cố phát sinh do quyết định này bạn sẽ hoàn toàn chịu
          trách nhiệm và hành động này không thể hoàn tác, bạn chắc chứ ?
        </p>
      </Modal>
    </div>
  );
}
