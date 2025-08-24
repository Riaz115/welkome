import React from "react";
import { Link } from "react-router-dom";
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

// Icons
import { MdPeople, MdPersonAdd, MdBlock, MdVerifiedUser, MdOutlineCalendarToday, MdEdit } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

// User Management specific data
import {
  userGrowthData,
  userGrowthOptions,
  userStatusData,
  userStatusOptions,
  usersByRoleData,
  usersByRoleOptions,
  usersTableData,
  recentUserActivity,
  userManagementKPIData,
} from "./variables/userManagementData";

// Mock avatars
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";

// Users Table Component
const UsersTable = ({ tableData }) => {
  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    columnHelper.accessor("pageName", {
      id: "fullName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          NAME
        </p>
      ),
      cell: (info) => (
        <div className="flex flex-col">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
          <p className="text-xs text-gray-500 md:hidden">
            {info.row.original.visitors}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("visitors", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white hidden md:table-cell">
          EMAIL
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white hidden md:table-cell">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("unique", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white hidden lg:table-cell">
          PHONE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white hidden lg:table-cell">
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
            info.getValue() === "Active" ? "bg-green-100 text-green-600" :
            info.getValue() === "Suspended" ? "bg-yellow-100 text-yellow-600" :
            "bg-red-100 text-red-600"
          }`}>
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("bounceRate", {
      id: "role",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white hidden sm:table-cell">
          ROLE
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center hidden sm:table-cell">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue() === "Admin" ? "bg-purple-100 text-purple-600" :
            info.getValue() === "Seller" ? "bg-blue-100 text-blue-600" :
            "bg-gray-100 text-gray-600"
          }`}>
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("signupDate", {
      id: "signupDate",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white hidden xl:table-cell">
          SIGNUP DATE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white hidden xl:table-cell">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => (
        <Link to={`/admin/main/userManagement/edit-user/${info.getValue()}`}>
          <button className="flex items-center justify-center gap-1 rounded-lg bg-brand-500 px-2 py-1 text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
            <MdEdit className="h-3 w-3" />
            <span className="text-xs font-medium hidden sm:inline">Edit</span>
          </button>
        </Link>
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
    <Card extra={"h-full w-full pt-3 pb-10 px-4 sm:px-8"}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          User Management
        </p>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <p className="text-base font-medium">Filter</p>
        </button>
      </div>

      <div className="mt-8 w-full">
        <div className="w-full overflow-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-700">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer pb-2 pr-4 pt-4 text-start"
                      >
                        <div className="items-center justify-between text-xs">
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
                .rows.slice(0, 8)
                .map((row) => {
                  return (
                    <tr key={row.id} className="border-b border-gray-100 dark:border-gray-800">
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="py-3 pr-4 align-top"
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
      </div>
    </Card>
  );
};

const UserManagementDashboard = () => {
  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] p-4 sm:p-0">
      {/* Top KPI Cards Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStatistics
          name="Total Users"
          value={userManagementKPIData.totalUsers.toLocaleString()}
          icon={<MdPeople />}
          iconBg="bg-blue-100"
        />
        <MiniStatistics
          name="Verified Users"
          value={userManagementKPIData.verifiedUsers.toLocaleString()}
          icon={<MdVerifiedUser />}
          iconBg="bg-green-100"
        />
        <MiniStatistics
          name="Suspended Users"
          value={userManagementKPIData.suspendedUsers.toLocaleString()}
          icon={<MdBlock />}
          iconBg="bg-yellow-100"
        />
        <MiniStatistics
          name="New Signups This Month"
          value={userManagementKPIData.newSignupsThisMonth.toLocaleString()}
          icon={<MdPersonAdd />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex h-full w-full flex-col gap-[20px] 2xl:flex-row">
        {/* Left Side - Charts and Tables */}
        <div className="h-full w-full rounded-[20px]">
          {/* Charts Row */}
          <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* User Growth Over Time - Line Chart */}
            <div className="col-span-1 xl:col-span-8">
              <Card extra={"h-[381px] pb-8 px-6 pt-6"}>
                <div className="flex flex-col sm:flex-row justify-between px-3 pt-1 gap-4">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                        3.2K
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        User Growth Over Time
                      </p>
                    </div>
                    <div className="ml-4 flex items-end pb-2">
                      <span className="text-sm font-bold text-green-500">+{userManagementKPIData.userGrowthRate}%</span>
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
                      chartData={userGrowthData}
                      chartOptions={userGrowthOptions}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* User Status Distribution - Donut Chart */}
            <div className="col-span-1 xl:col-span-4">
              <Card extra={"h-[381px] p-5"}>
                <div className="mb-auto flex flex-col px-2 text-center">
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    User Status Distribution
                  </p>
                  <p className="mt-2 px-4 text-sm font-medium text-gray-600">
                    Current user status breakdown
                  </p>
                </div>
                <div className="mx-auto mb-5 mt-4 flex h-40 w-36 items-center justify-center">
                  <PieChart
                    chartData={userStatusData}
                    chartOptions={userStatusOptions}
                  />
                </div>
                <Card extra="!flex-row !justify-between gap-1 px-3 py-4 mb-2 rounded-[20px] dark:!bg-navy-700">
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Active</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">75%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Suspended</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">15%</p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs font-medium text-gray-600">Deleted</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">10%</p>
                  </div>
                </Card>
              </Card>
            </div>
          </div>

          {/* Bar Chart - Users by Role */}
          <div className="mb-5">
            <Card extra="pb-7 p-5">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="ml-1 pt-2">
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Users by Role Distribution
                  </p>
                  <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                    Role{" "}
                    <span className="text-sm font-medium leading-6 text-gray-600">
                      Analytics
                    </span>
                  </p>
                </div>
                <div className="mt-2 flex items-start">
                  <div className="flex items-center text-sm text-green-500">
                    <p className="font-bold"> +{userManagementKPIData.verificationRate}% </p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full pb-0 pt-10">
                <BarChart
                  chartData={usersByRoleData}
                  chartOptions={usersByRoleOptions}
                />
              </div>
            </Card>
          </div>

          {/* Users Table */}
          <div className="mb-5">
            <UsersTable tableData={usersTableData} />
          </div>
        </div>

        {/* Right Side - Recent Activity */}
        <div className="h-full w-full 2xl:w-[400px] 2xl:min-w-[300px] 2xl:max-w-[400px]">
          <div className="flex h-full flex-col gap-5">
            {/* Recent User Activity */}
            <Card extra={"!p-5 flex-1"}>
              <h4 className="mb-[22px] ml-px text-lg font-bold text-navy-700 dark:text-white">
                Recent User Activity
              </h4>

              {recentUserActivity.map((activity, index) => (
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

            {/* User Statistics Summary */}
            <Card extra={"p-5"}>
              <div className="mb-4">
                <p className="text-lg font-bold text-navy-700 dark:text-white">
                  User Statistics Summary
                </p>
                <p className="text-sm text-gray-600">Key user metrics overview</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">User Growth Rate</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">{userManagementKPIData.userGrowthRate}%</p>
                  </div>
                  <div className="text-green-500">
                    <MdPeople className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Verification Rate</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">{userManagementKPIData.verificationRate}%</p>
                  </div>
                  <div className="text-blue-500">
                    <MdVerifiedUser className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Signups</p>
                    <p className="text-lg font-bold text-navy-700 dark:text-white">{userManagementKPIData.newSignupsThisMonth}</p>
                  </div>
                  <div className="text-purple-500">
                    <MdPersonAdd className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard; 