import { Button, Checkbox, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { Divider, List, notification } from "antd";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

export default function Service() {
  const [api, contextHolder] = notification.useNotification();

  // GET SERVICE TYPE
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState();
  const handleGetService = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://fluffypaw.azurewebsites.net/api/ServiceType/GetAllServiceType",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        setTypes(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD SERVICE TYPE
  const [addValue, setAddValue] = useState();

  const handleInputAddChange = (e) => {
    setAddValue(e.target.value);
  };
  const handleAddService = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://fluffypaw.azurewebsites.net/api/ServiceType/CreateServiceType",
        {
          name: addValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        handleGetService();
        api.success({
          message: "Thêm thành công",
          description: "Vui lòng chờ trong giây lát.",
          placement: "bottomRight",
        });
        setAddValue("");
        setLoading(false);
      }
    } catch (err) {
      console.log();
      if (err.response.status)
        api.warning({
          message: "Tên loại dịch vụ đã tồn tại !",
          description: "Vui lòng thử lại sau.",
          placement: "bottomRight",
        });
      else
        api.warning({
          message: `${err.response.statusText}`,
          description: "Vui lòng thử lại sau.",
          placement: "bottomRight",
        });
    } finally {
      setLoading(false);
    }
  };

  // DELETE SERVICE TYPE

  const handleDeleteService = async (serviceTypeId) => {
    console.log(serviceTypeId);
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://fluffypaw.azurewebsites.net/api/ServiceType/DeleteServiceType/${serviceTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        handleGetService();
        api.success({
          message: "Xóa thành công",
          description: "Vui lòng chờ trong giây lát.",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    } catch (err) {
      api.warning({
        message: "Có lỗi khi xóa",
        description: "Vui lòng thử lại sau .",
        placement: "bottomRight",
      });

      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetService();
  }, []);
  return (
    <div className="h-[510px]">
      {contextHolder}

      <List
        header={<div className="font-bold ">Các loại hình dịch vụ</div>}
        bordered
        dataSource={types}
        renderItem={(item) => (
          <List.Item>
            <p> {item.name}</p>
            <button
              className="text-blue-400"
              onClick={() => handleDeleteService(item.id)}
            >
              Xóa
            </button>
          </List.Item>
        )}
        style={{ maxHeight: "600px", overflow: "auto" }}
      />
      <Divider orientation="center" className="py-6">
        Thêm loại hình dịch vụ
      </Divider>

      <div className="flex flex-row gap-4 px-[28px] justify-center items-center">
        <p className="w-[420px]">Tên loại hình dịch vụ muốn thêm: </p>
        <Input
          placeholder="Loại hình dịch vụ"
          onChange={handleInputAddChange}
        />
        <Button
          onClick={handleAddService}
          className="w-56"
          type="primary"
          disabled={loading}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}
