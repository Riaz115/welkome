import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SearchTableUsers from "./components/SearchTableUsers";
import RolePermissionEditor from "./components/RolePermissionEditor";
import subAdminData from "./variables/subAdminData";
import usersData from "./variables/usersData";
import { createColumnHelper } from "@tanstack/react-table";
import "react-tabs/style/react-tabs.css";

const columnHelper = createColumnHelper();

const UserManagement = () => {
  const [subAdminActiveTab, setSubAdminActiveTab] = useState(0);

  // Sub Admin columns
  const subAdminColumns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          NAME
        </p>
      ),
      cell: (info) => (
        <div className="flex w-full items-center gap-[14px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-300">
            <img
              className="h-full w-full rounded-full"
              src={info.getValue()[1]}
              alt=""
            />
          </div>
          <p className="font-medium text-navy-700 dark:text-white">
            {info.getValue()[0]}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ROLE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "Active" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor("lastLogin", {
      id: "lastLogin",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          LAST LOGIN
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  // Users columns
  const usersColumns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          NAME
        </p>
      ),
      cell: (info) => (
        <div className="flex w-full items-center gap-[14px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-300">
            <img
              className="h-full w-full rounded-full"
              src={info.getValue()[1]}
              alt=""
            />
          </div>
          <p className="font-medium text-navy-700 dark:text-white">
            {info.getValue()[0]}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("username", {
      id: "username",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          USERNAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("joinDate", {
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
    columnHelper.accessor("userType", {
      id: "userType",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          USER TYPE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        const getStatusColor = (status) => {
          switch (status) {
            case "Active":
              return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "Blocked":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "Inactive":
              return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
            case "Pending KYC":
              return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            default:
              return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
          }
        };
        return (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      },
    }),
  ];

  const handleAddSubAdmin = () => {
    console.log("Add Sub Admin clicked");
  };

  const handleAddUser = () => {
    console.log("Add User clicked");
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <Accordion allowMultiple>
          {/* Sub Admin Accordion Section */}
          <AccordionItem mb="8px" border="none">
            <AccordionButton
              display="flex"
              _hover={{
                bg: "unset",
              }}
              _focus={{
                boxShadow: "none",
              }}
              borderRadius="8px"
              w="100%"
              px="0px"
              py="0px"
              bg="transparent"
              ms={0}
              mb="4px"
            >
              <div className="mb-1.5 flex w-full items-center justify-between pl-8 pr-3">
                <div>
                  <div className="align-center flex w-full justify-center">
                    <div className="flex items-center justify-center mr-3.5 text-brand-500 dark:text-white">
                      <span className="text-lg font-semibold">👥</span>
                    </div>
                    <p className="mr-auto block font-medium text-navy-700 dark:text-white">
                      Sub Admin
                    </p>
                  </div>
                </div>
                <AccordionIcon ms="auto" className="!text-gray-600" />
              </div>
            </AccordionButton>
            <AccordionPanel py="0px" ps="8px">
              <div className="space-y-6">
                <Tabs selectedIndex={subAdminActiveTab} onSelect={setSubAdminActiveTab}>
                  <TabList className="mb-4 flex space-x-1 rounded-lg bg-gray-50 p-1 dark:bg-gray-900">
                    <Tab className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 focus:outline-none focus:ring-0 ui-selected:bg-brand-500 ui-selected:text-white dark:text-gray-400 dark:ui-selected:bg-brand-400">
                      Sub-admin List
                    </Tab>
                    <Tab className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 focus:outline-none focus:ring-0 ui-selected:bg-brand-500 ui-selected:text-white dark:text-gray-400 dark:ui-selected:bg-brand-400">
                      Role & Permission Editor
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <SearchTableUsers
                      tableData={subAdminData}
                      columns={subAdminColumns}
                      title="Sub Admins"
                      onAddClick={handleAddSubAdmin}
                      enableDropdown={false}
                    />
                  </TabPanel>
                  <TabPanel>
                    <RolePermissionEditor />
                  </TabPanel>
                </Tabs>
              </div>
            </AccordionPanel>
          </AccordionItem>

          {/* Users Accordion Section */}
          <AccordionItem mb="8px" border="none">
            <AccordionButton
              display="flex"
              _hover={{
                bg: "unset",
              }}
              _focus={{
                boxShadow: "none",
              }}
              borderRadius="8px"
              w="100%"
              px="0px"
              py="0px"
              bg="transparent"
              ms={0}
              mb="4px"
            >
              <div className="mb-1.5 flex w-full items-center justify-between pl-8 pr-3">
                <div>
                  <div className="align-center flex w-full justify-center">
                    <div className="flex items-center justify-center mr-3.5 text-brand-500 dark:text-white">
                      <span className="text-lg font-semibold">👤</span>
                    </div>
                    <p className="mr-auto block font-medium text-navy-700 dark:text-white">
                      Users
                    </p>
                  </div>
                </div>
                <AccordionIcon ms="auto" className="!text-gray-600" />
              </div>
            </AccordionButton>
            <AccordionPanel py="0px" ps="8px">
              <SearchTableUsers
                tableData={usersData}
                columns={usersColumns}
                title="Users"
                onAddClick={handleAddUser}
                enableDropdown={true}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UserManagement; 