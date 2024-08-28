import React, { useState } from "react";
import { Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

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
    }
  };

  const [login, setLogin] = useState({
    user_username: "",
    user_password: "",
  });

  const onChangeLogin = (prop) => (event) => {
    setLogin({ ...login, [prop]: event.target.value });
    // console.log("us", login.user_username);
  };

  const handleLogin = (us, pw) => {
    if (
      us === null ||
      us === "" ||
      us === undefined ||
      pw === null ||
      pw === "" ||
      pw === undefined
    ) {
      openNotificationWithIcon("warning");
    } else {
      axios
        .post("https://fluffypaw.azurewebsites.net/api/Authentication/Login", {
          username: us,
          password: pw,
        })
        .then((response) => {
          if (response.status === 200) {
            const dataLog = response.data;
            console.log(dataLog.data.token);
            sessionStorage.setItem("access_token", dataLog.data.token);
            navigate("/dashboard");
          }
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      {contextHolder}
      <div class="bg-gray-100 flex justify-evenly items-center h-screen">
        <div class="w-1/2 h-screen hidden lg:block">
          <img
            src="https://i.pinimg.com/564x/99/e2/f8/99e2f879f7823d32ce100075290e674c.jpg"
            alt="Placeholder"
            class="object-contain w-full h-full"
          />
        </div>
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 lg:ml-[-100px] ">
          <h1 class="text-4xl font-semibold mb-8">Đăng nhập</h1>
          <div class="mb-4">
            <label for="username" class="block text-gray-600">
              Tài khoản
            </label>
            <Input
              size="large"
              placeholder=" Nhập tên đăng nhập của bạn"
              value={login.user_username}
              onChange={onChangeLogin("user_username")}
              prefix={<UserOutlined />}
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-600">
              Mật khẩu
            </label>
            <Input
              size="large"
              placeholder=" Nhập mật khẩu của bạn"
              type="password"
              value={login.user_password}
              onChange={onChangeLogin("user_password")}
              prefix={<KeyOutlined />}
            />
          </div>

          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={() =>
              handleLogin(login.user_username, login.user_password)
            }
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
