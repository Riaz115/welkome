import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { MdAttachMoney, MdPeople, MdShoppingCart, MdInventory, MdOutlineCalendarToday } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

// MarketSphere specific data
import {
  marketSphereWeeklySalesData,
  marketSphereWeeklySalesOptions,
  marketSphereTopCategoriesData,
  marketSphereTopCategoriesOptions,
  marketSphereOrderStatusData,
  marketSphereOrderStatusOptions,
  marketSphereLatestOrdersData,
  marketSphereActiveSellersData,
  marketSphereRecentActivity,
  marketSphereKPIData,
} from "./variables/marketSphereData";

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
      id: "customer",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CUSTOMER NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("unique", {
      id: "seller",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SELLER NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("clients", {
      id: "total",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TOTAL AMOUNT
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("bounceRate", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === "Delivered" ? "bg-green-100 text-green-600" :
            info.getValue() === "Pending" ? "bg-yellow-100 text-yellow-600" :
            "bg-red-100 text-red-600"
          }`}>
            {info.getValue()}
          </span>
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

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
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
                      className="cursor-pointer border-b border-white/0 pb-2 pr-4 pt-4 text-start"
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
                  <tr key={row.id} className="border-b border-gray-200 dark:border-white/30">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[120px] border-white/0 py-3 pr-4 whitespace-nowrap"
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

// Active Sellers Table Component
const ActiveSellersTable = ({ tableData }) => {
  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    columnHelper.accessor("pageName", {
      id: "sellerName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SELLER NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("visitors", {
      id: "joinDate",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          JOIN DATE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("unique", {
      id: "totalProducts",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TOTAL PRODUCTS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("clients", {
      id: "totalSales",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TOTAL SALES
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("bounceRate", {
      id: "verification",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === "Verified" ? "bg-green-100 text-green-600" :
            "bg-yellow-100 text-yellow-600"
          }`}>
            {info.getValue()}
          </span>
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
          Active Sellers
        </p>
        <button className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <p className="text-base font-medium">View All</p>
        </button>
      </div>

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
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
                      className="cursor-pointer border-b border-white/0 pb-2 pr-4 pt-4 text-start"
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
                  <tr key={row.id} className="border-b border-gray-200 dark:border-white/30">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[120px] border-white/0 py-3 pr-4 whitespace-nowrap"
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

const MarketSphereDashboard = () => {
  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px]">
      {/* Top KPI Cards Row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <MiniStatistics
          name="Total Sellers"
          value={marketSphereKPIData.totalSellers.toLocaleString()}
          icon={<MdPeople />}
          iconBg="bg-blue-100"
        />
        <MiniStatistics
          name="Total Products"
          value={marketSphereKPIData.totalProducts.toLocaleString()}
          icon={<MdInventory />}
          iconBg="bg-purple-100"
        />
        <MiniStatistics
          name="Total Orders"
          value={marketSphereKPIData.totalOrders.toLocaleString()}
          icon={<MdShoppingCart />}
          iconBg="bg-orange-100"
        />
        <MiniStatistics
          name="Revenue (This Month)"
          value={`$${(marketSphereKPIData.revenueThisMonth / 1000).toFixed(1)}K`}
          icon={<MdAttachMoney />}
          iconBg="bg-green-100"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex h-full w-full flex-col gap-[20px] xl:flex-row">
        {/* Left Side - Charts and Tables */}
        <div className="h-full w-full rounded-[20px]">
          {/* Charts Row */}
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Weekly Sales Volume - Line Chart */}
            <div className="col-span-12 lg:col-span-8">
              <Card extra={"h-[381px] pb-8 px-6 pt-6"}>
                <div className="flex justify-between px-3 pt-1">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                        18.7K
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        Weekly Sales Volume
                      </p>
                    </div>
                    <div className="ml-4 flex items-end pb-2">
                      <span className="text-sm font-bold text-green-500">+15.2%</span>
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
                      chartData={marketSphereWeeklySalesData}
                      chartOptions={marketSphereWeeklySalesOptions}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Status Breakdown - Donut Chart */}
            <div className="col-span-12 lg:col-span-4">
              <Card extra={"h-[381px] p-5"}>
                <div className="mb-auto flex flex-col px-2 text-center">
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    Order Status Breakdown
                  </p>
                  <p className="mt-2 px-4 text-sm font-medium text-gray-600">
                    Current order status distribution
                  </p>
                </div>
                <div className="mx-auto mb-5 mt-4 flex h-40 w-36 items-center justify-center">
                  <PieChart
                    chartData={marketSphereOrderStatusData}
                    chartOptions={marketSphereOrderStatusOptions}
                  />
                </div>
                <Card extra="!flex-row !justify-between gap-1 px-3 py-4 mb-2 rounded-[20px] dark:!bg-navy-700">
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Delivered</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">65%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Pending</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">25%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Cancelled</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">10%</p>
                  </div>
                </Card>
              </Card>
            </div>
          </div>

          {/* Bar Chart - Top 5 Product Categories by Sales */}
          <div className="mb-5">
            <Card extra="pb-7 p-5">
              <div className="flex flex-row justify-between">
                <div className="ml-1 pt-2">
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Top 5 Product Categories by Sales
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
                    <p className="font-bold"> +12.4% </p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full pb-0 pt-10">
                <BarChart
                  chartData={marketSphereTopCategoriesData}
                  chartOptions={marketSphereTopCategoriesOptions}
                />
              </div>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Latest Orders Table */}
            <div>
              <LatestOrdersTable tableData={marketSphereLatestOrdersData} />
            </div>

            {/* Active Sellers Table */}
            <div>
              <ActiveSellersTable tableData={marketSphereActiveSellersData} />
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
                  Seller Onboarding Completion (%)
                </p>
                <p className="text-sm text-gray-600">Marketplace setup progress</p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">{marketSphereKPIData.sellerOnboardingProgress.profileCompletion}%</span>
                  </div>
                  <Progress value={marketSphereKPIData.sellerOnboardingProgress.profileCompletion} color="green" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Document Verification</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">{marketSphereKPIData.sellerOnboardingProgress.documentVerification}%</span>
                  </div>
                  <Progress value={marketSphereKPIData.sellerOnboardingProgress.documentVerification} color="blue" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Store Setup</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">{marketSphereKPIData.sellerOnboardingProgress.storeSetup}%</span>
                  </div>
                  <Progress value={marketSphereKPIData.sellerOnboardingProgress.storeSetup} color="orange" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Payment Setup</span>
                    <span className="text-sm font-bold text-navy-700 dark:text-white">{marketSphereKPIData.sellerOnboardingProgress.paymentSetup}%</span>
                  </div>
                  <Progress value={marketSphereKPIData.sellerOnboardingProgress.paymentSetup} color="purple" />
                </div>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card extra={"!p-5 flex-1"}>
              <h4 className="mb-[22px] ml-px text-lg font-bold text-navy-700 dark:text-white">
                Recent Activity
              </h4>

              {marketSphereRecentActivity.map((activity, index) => (
                <Transfer
                  key={index}
                  name={activity.name}
                  date={activity.date}
                  sum={activity.sum}
                  avatar={[avatar1, avatar2, avatar3, avatar4][index % 4]}
                />
              ))}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSphereDashboard; 