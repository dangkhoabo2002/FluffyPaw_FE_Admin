import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  notification,
  Radio,
  Button,
  Checkbox,
  Form,
  Input,
} from "antd";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
const options = [
  { label: "Chó", value: 1 },
  { label: "Mèo", value: 2 },
];
export default function Pet() {
  const [api, contextHolder] = notification.useNotification();

  // GET PET TYPE
  const [typeValue, setTypeValue] = useState();
  const [addValue, setAddValue] = useState();

  const [loading, setLoading] = useState(false);
  const [dogtypes, setDogTypes] = useState();
  const [cattypes, setCatTypes] = useState();

  const handleGetTypes = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fluffypaw.azurewebsites.net/api/Pet/GetAllPetTypeByPetCategory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        if (id === 1) setDogTypes(response.data.data);
        else setCatTypes(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GET PET BEHAVIOR
  const [behaviors, setBehaviors] = useState();
  const handlePetBehavior = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fluffypaw.azurewebsites.net/api/Pet/GetAllBehavior`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 200) {
        setBehaviors(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRadioChange = (e) => {
    console.log("Selected value: ", e.target.value);

    setTypeValue(e.target.value);
  };

  // ADD SERVICE TYPE
  // ADD SERVICE TYPE

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
        api.success({
          message: "Thêm thành công",
          description: "Vui lòng chờ trong giây lát.",
          placement: "bottomRight",
        });
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
    handleGetTypes(1);
    handleGetTypes(2);
    handlePetBehavior();
  }, []);
  return (
    <div className="pb-6">
      {contextHolder}

      <div className="flex flex-col gap-4">
        <Radio.Group
          block
          options={options}
          defaultValue="Mèo"
          optionType="button"
          buttonStyle="solid"
          onChange={handleRadioChange}
        />
        <List
          header={
            <div className="font-bold">
              Các giống loài {typeValue === 1 ? "Chó" : "Mèo"}
            </div>
          }
          bordered
          dataSource={typeValue === 1 ? dogtypes : cattypes}
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
          style={{ maxHeight: "200px", overflow: "auto" }}
        />
        <Divider orientation="center">Thêm giống loài Chó & Mèo</Divider>

        <div className="flex flex-row gap-4 px-[28px] justify-center items-center">
          <p className="w-[320px]">Tên giống loài muốn thêm: </p>
          <Input
            placeholder="Loại hình dịch vụ"
            onChange={handleInputAddChange}
          />
          <Button
            onClick={handleAddService}
            className="w-60"
            type="primary"
            disabled={loading}
          >
            Thêm
          </Button>
        </div>

        <Divider />
        <List
          header={<div className="font-bold">Các hành vi của thú cưng</div>}
          bordered
          dataSource={behaviors}
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
          style={{ maxHeight: "200px", overflow: "auto" }}
        />
        <Divider orientation="center">Thêm hành vi thú cưng</Divider>

        <div className="flex flex-row gap-4 px-[28px] justify-center items-center">
          <p className="w-[320px]">Đặc điểm hành vi: </p>
          <Input
            placeholder="Loại hình dịch vụ"
            onChange={handleInputAddChange}
          />
          <Button
            onClick={handleAddService}
            className="w-60"
            type="primary"
            disabled={loading}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
