import React from "react";
import { Tabs } from "antd";
import Service from "./tabs/service";
import Pet from "./tabs/pet";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Dịch vụ",
    children: <Service />,
  },
  {
    key: "2",
    label: "Thú cưng",
    children: <Pet />,
  },
  // {
  //   key: "3",
  //   label: "Tab 3",
  //   children: "Content of Tab Pane 3",
  // },
];
export default function listOfCategory() {
  return (
    <div className="pr-12 flex flex-col gap-10 bg-[#f1f5f9] w-full">
      <div
        className="flex flex-col bg-white py-6 "
        style={{
          border: "1px solid rgb(226, 232, 240)",
          boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, .07)",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="px-10 pt-5"
        />
      </div>
    </div>
  );
}
