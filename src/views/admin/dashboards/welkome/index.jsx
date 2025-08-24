import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Reusing existing dashboard components
import OverallRevenue from "../default/components/OverallRevenue";
import DailyTraffic from "../default/components/DailyTraffic";
import ProfitEstimation from "../default/components/ProfitEstimation";
import ProjectStatus from "../default/components/ProjectStatus";
import MostVisited from "../default/components/MostVisited";
import YourTransfers from "../default/components/YourTransfers";

// Import existing card components
import MiniStatistics from "components/card/MiniStatistics";
import Card from "components/card";

// Chart components
import LineChart from "components/charts/LineChart";
import BarChart from "components/charts/BarChart";
import PieChart from "components/charts/PieChart";

// Data display components
import Transfer from "components/dataDisplay/Transfer";
import Progress from "components/progress";

// Icons
import { MdAttachMoney, MdPeople, MdShoppingCart, MdPersonAdd, MdOutlineCalendarToday, MdInventory, MdDirectionsBike, MdGroup, MdPendingActions } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

// Mock data for WELKOME platform
import {
  welkomeOrderVolumeData,
  welkomeOrderVolumeOptions,
  welkomeTopCategoriesData,
  welkomeTopCategoriesOptions,
  welkomeUserRatioData,
  welkomeUserRatioOptions,
  welkomeLatestOrdersData,
  welkomeVerifiedSellersData,
  welkomeSupportTicketsData,
} from "./variables/welkomeData";

// Mock avatars
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";

// Latest Orders Table Component
const LatestOrdersTable = ({ tableData }) => {
  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    columnHelper.accessor("pageName", {
      id: "orderID",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ORDER ID
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("visitors", {
      id: "buyer",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          BUYER
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("unique", {
      id: "total",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TOTAL
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("clients", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === "Completed" ? "bg-green-100 text-green-600" :
            info.getValue() === "Processing" ? "bg-yellow-100 text-yellow-600" :
            info.getValue() === "Shipped" ? "bg-blue-100 text-blue-600" :
            "bg-red-100 text-red-600"
          }`}>
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("bounceRate", {
      id: "growth",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          GROWTH
        </p>
      ),
      cell: (info) => (
        <div
          className={`text-sm font-bold ${
            info.getValue()[0] === "-"
              ? "font-medium text-red-500"
              : "font-medium text-green-500"
          }`}
        >
          {info.getValue()}
        </div>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"h-full w-full pt-3 pb-10 px-8"}>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          Latest Orders
        </p>
        <button className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <p className="text-base font-medium">Today</p>
        </button>
      </div>

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
        <table className="w-full min-w-[600px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-white/0 pb-2 pr-4 pt-4 text-start whitespace-nowrap"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3 pr-4 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const WelkomeDashboard = () => {
  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px]">
      {/* Top KPI Cards - First Row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <MiniStatistics
          name="Total Revenue"
          value="$847.2K"
          icon={<MdAttachMoney />}
          iconBg="bg-green-100"
        />
        <MiniStatistics
          name="Active Sellers"
          value="2,847"
          icon={<MdPeople />}
          iconBg="bg-blue-100"
        />
        <MiniStatistics
          name="Orders This Month"
          value="15,628"
          icon={<MdShoppingCart />}
          iconBg="bg-purple-100"
        />
        <MiniStatistics
          name="Active Customers"
          value="8,439"
          icon={<MdGroup />}
          iconBg="bg-cyan-100"
        />
      </div>

      {/* Top KPI Cards - Second Row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <MiniStatistics
          name="Active Riders"
          value="245"
          icon={<MdDirectionsBike />}
          iconBg="bg-yellow-100"
        />
        <MiniStatistics
          name="Total Products"
          value="45,620"
          icon={<MdInventory />}
          iconBg="bg-pink-100"
        />
        <MiniStatistics
          name="Pending Orders"
          value="1,324"
          icon={<MdPendingActions />}
          iconBg="bg-red-100"
        />
        <MiniStatistics
          name="New Signups This Week"
          value="847"
          icon={<MdPersonAdd />}
          iconBg="bg-orange-100"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex h-full w-full flex-col gap-[20px] xl:flex-row">
        {/* Left Side - Charts and Tables */}
        <div className="h-full w-full rounded-[20px]">
          {/* Charts Row */}
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Weekly Order Volume - Line Chart */}
            <div className="col-span-12 lg:col-span-8">
              <Card extra={"h-[381px] pb-8 px-6 pt-6"}>
                <div className="flex justify-between px-3 pt-1">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                        15.6K
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        Weekly Order Volume
                      </p>
                    </div>
                    <div className="ml-4 flex items-end pb-2">
                      <span className="text-sm font-bold text-green-500">+12.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="flex h-full w-full flex-row sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                  <div className="h-full w-full">
                    <LineChart
                      chartData={welkomeOrderVolumeData}
                      chartOptions={welkomeOrderVolumeOptions}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* User Ratio Breakdown - Pie Chart */}
            <div className="col-span-12 lg:col-span-4">
              <Card extra={"h-[381px] p-5"}>
                <div className="mb-auto flex flex-col px-2 text-center">
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    User Distribution
                  </p>
                  <p className="mt-2 px-4 text-sm font-medium text-gray-600">
                    Platform user breakdown
                  </p>
                </div>
                <div className="mx-auto mb-5 mt-4 flex h-40 w-36 items-center justify-center">
                  <PieChart
                    chartData={welkomeUserRatioData}
                    chartOptions={welkomeUserRatioOptions}
                  />
                </div>
                <Card extra="!flex-row !justify-between gap-1 px-3 py-4 mb-2 rounded-[20px] dark:!bg-navy-700">
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Customers</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">65%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Sellers</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">28%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Riders</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">7%</p>
                  </div>
                </Card>
              </Card>
            </div>
          </div>

          {/* Bar Chart - Top Selling Categories */}
          <div className="mb-5">
            <Card extra="pb-7 p-5">
              <div className="flex flex-row justify-between">
                <div className="ml-1 pt-2">
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Top-Selling Categories
                  </p>
                  <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                    MarketSphere{" "}
                    <span className="text-sm font-medium leading-6 text-gray-600">
                      Performance
                    </span>
                  </p>
                </div>
                <div className="mt-2 flex items-start">
                  <div className="flex items-center text-sm text-green-500">
                    <p className="font-bold"> +8.2% </p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full pb-0 pt-10">
                <BarChart
                  chartData={welkomeTopCategoriesData}
                  chartOptions={welkomeTopCategoriesOptions}
                />
              </div>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Latest Orders Table */}
            <div>
              <LatestOrdersTable tableData={welkomeLatestOrdersData} />
            </div>

            {/* Verified Sellers Table */}
            <div>
              <Card extra={"h-full w-full pt-3 pb-10 px-8"}>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    Verified Sellers
                  </p>
                  <button className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                    <p className="text-base font-medium">View All</p>
                  </button>
                </div>
                <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
                  <div className="min-w-[400px] space-y-4">
                    {welkomeVerifiedSellersData.map((seller, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                            <span className="text-sm font-bold text-blue-600">{seller.name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-navy-700 dark:text-white whitespace-nowrap">{seller.name}</p>
                            <p className="text-xs text-gray-600 whitespace-nowrap">{seller.category}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-600 whitespace-nowrap">{seller.joinDate}</p>
                          <div className="mt-1">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600 whitespace-nowrap">Verified</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Side - Progress Cards and Activity Feed */}
        <div className="h-full w-full xl:w-[400px] xl:min-w-[300px] 2xl:min-w-[400px]">
          <div className="flex h-full flex-col gap-5">
            {/* Seller Onboarding Progress */}
            <Card extra={"p-5"}>
              <div className="mb-4">
                <p className="text-lg font-bold text-navy-700 dark:text-white">
                  Seller Onboarding Progress
                </p>
                <p className="text-sm text-gray-600">Complete marketplace setup</p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">87%</span>
                  </div>
                  <Progress value={87} color="green" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Document Verification</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">92%</span>
                  </div>
                  <Progress value={92} color="blue" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Store Setup</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">64%</span>
                  </div>
                  <Progress value={64} color="orange" />
                </div>
              </div>
            </Card>

            {/* EduMatch Profile Completion */}
            <Card extra={"p-5"}>
              <div className="mb-4">
                <p className="text-lg font-bold text-navy-700 dark:text-white">
                  EduMatch Profile Completion
                </p>
                <p className="text-sm text-gray-600">Student & tutor profiles</p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Student Profiles</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">78%</span>
                  </div>
                  <Progress value={78} color="purple" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Tutor Profiles</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">85%</span>
                  </div>
                  <Progress value={85} color="cyan" />
                </div>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card extra={"!p-5 flex-1"}>
              <h4 className="mb-[22px] ml-px text-lg font-bold text-navy-700 dark:text-white">
                Recent Activity
              </h4>

              <Transfer
                name="New Registration: Sarah Chen"
                date="Today, 16:36"
                sum="EduMatch"
                avatar={avatar1}
              />
              <Transfer
                name="Refund Request: Order #8847"
                date="Today, 14:22"
                sum="MarketSphere"
                avatar={avatar2}
              />
              <Transfer
                name="Support Ticket: Payment Issue"
                date="Today, 11:15"
                sum="WalletPro"
                avatar={avatar3}
              />
              <Transfer
                name="CareerPath: New Job Posting"
                date="Yesterday, 18:30"
                sum="Corporate"
                avatar={avatar4}
              />
              <Transfer
                name="Seller Verification: TechStore"
                date="Yesterday, 15:45"
                sum="Verified"
                avatar={avatar1}
              />

              <div className="mb-auto" />
              <div className="flex w-full items-center justify-end gap-1 hover:cursor-pointer">
                <div className="text-sm font-bold text-brand-500 transition-all hover:-translate-x-1 hover:cursor-pointer dark:text-white">
                  View all activities
                </div>
                <div className="text-xl font-bold text-brand-500 transition-all hover:translate-x-1 hover:cursor-pointer dark:text-white">
                  <BsArrowRight />
                </div>
              </div>
            </Card>

            {/* Support Tickets Summary */}
            <Card extra={"p-5"}>
              <div className="mb-4">
                <p className="text-lg font-bold text-navy-700 dark:text-white">
                  Open Support Tickets
                </p>
              </div>
              <div className="space-y-3">
                {welkomeSupportTicketsData.map((ticket, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-navy-700 dark:text-white">#{ticket.id}</p>
                      <p className="text-xs text-gray-600">{ticket.subject}</p>
                    </div>
                    <div className="text-right">
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        ticket.priority === 'High' ? 'bg-red-100 text-red-600' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelkomeDashboard; 