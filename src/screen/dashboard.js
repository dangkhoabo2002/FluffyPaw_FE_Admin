import React from "react";
import { TeamOutlined, ArrowUpOutlined } from "@ant-design/icons";
import SideBar from "../component/sidebar";
import "./dashboard.css";

import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function dashboard() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col gap-4 fixed top-0 left-0 bottom-0 w-92">
        <SideBar className="" />.
      </div>
      <div className="py-12 pr-12 flex flex-col gap-10 bg-[#f1f5f9] w-full pl-[356px]">
        <div className="flex flex-row flex-wrap gap-6">
          <div className="titleCard">
            <div className="rounded-full bg-[#eff2f7] w-12 h-12 flex flex-row justify-center items-center">
              <TeamOutlined />
            </div>
            <div className="flex flex-row justify-between items-center pt-4">
              <p className="font-semibold text-3xl"> 3.456</p>
              <p className="text-blue-500">
                0.95% <ArrowUpOutlined />
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#64748B]">Tổng số người dùng</p>
            </div>
          </div>

          <div className="titleCard">
            <div className="rounded-full bg-[#eff2f7] w-12 h-12 flex flex-row justify-center items-center">
              <TeamOutlined />
            </div>
            <div className="flex flex-row justify-between items-center pt-4">
              <p className="font-semibold text-3xl"> 200</p>
              <p className="text-blue-500">
                2% <ArrowUpOutlined />
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#64748B]">Tổng cửa hàng</p>
            </div>
          </div>

          <div className="titleCard">
            <div className="rounded-full bg-[#eff2f7] w-12 h-12 flex flex-row justify-center items-center">
              <TeamOutlined />
            </div>
            <div className="flex flex-row justify-between items-center pt-4">
              <p className="font-semibold text-3xl"> 1.000</p>
              <p className="text-blue-500">
                20% <ArrowUpOutlined />
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#64748B]">Chủ sở hữu thú cưng</p>
            </div>
          </div>

          <div className="titleCard">
            <div className="rounded-full bg-[#eff2f7] w-12 h-12 flex flex-row justify-center items-center">
              <TeamOutlined />
            </div>
            <div className="flex flex-row justify-between items-center pt-4">
              <p className="font-semibold text-3xl"> 12.460</p>
              <p className="text-blue-500">
                15% <ArrowUpOutlined />
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#64748B]">Tổng lượt xem</p>
            </div>
          </div>
        </div>
        <div className="lineChart1">
          <div className="flex flex-col lineChartCard">
            <h1 className="font-semibold text-[20px]">Thống kê số liệu</h1>
            <LineChart
              height={300}
              series={[
                { data: pData, label: "Khách vãng lai" },
                { data: uData, label: "Người dùng" },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          </div>
          <div></div>
        </div>
        <div className="flex flex-row pt-14 justify-between">
          <div className="lineChartCard">
            <h1 className="font-semibold text-[20px] pb-7">
              Số lượng đặt dịch vụ
            </h1>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 45,
                  data,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
              {...size}
            />
          </div>
          <div className="lineChartCard">
            <h1 className="font-semibold text-[20px] pb-7">Thống kê dịch vụ</h1>

            <BarChart
              width={500}
              height={300}
              series={[
                { data: preYear, label: "Năm ngoái", id: "pvId" },
                { data: nowYear, label: "Hiện tại", id: "uvId" },
              ]}
              xAxis={[{ data: typeService, scaleType: "band" }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// LINE CHART
const pData = [
  0, 100, 200, 580, 990, 2090, 3100, 5200, 7400, 8500, 9000, 11400, 12460,
];
const uData = [
  0, 200, 400, 580, 700, 1000, 1400, 1700, 2000, 2500, 2700, 3000, 3456,
];
const xLabels = [
  "",
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

// BAR CHART
const nowYear = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const preYear = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const typeService = ["Chăm sóc", "Huấn luyện", "Tiêm chủng", "Dịch vụ"];

// PIE CHART
const size = {
  width: 500,
  height: 200,
};
const data = [
  { value: 30, label: "Chăm sóc" },
  { value: 10, label: "Huấn luyện" },
  { value: 20, label: "Tiêm chủng" },
  { value: 40, label: "Dịch vụ" },
];
