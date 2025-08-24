import React, { useState, useEffect } from "react";
import SearchTableUsers from "./components/SearchTableUsers";
import subAdminData from "./variables/subAdminData";
import { createColumnHelper } from "@tanstack/react-table";
import { MdMoreVert, MdEdit, MdVisibility } from "react-icons/md";

const columnHelper = createColumnHelper();

const SubAdminList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    if (dropdownOpen !== null) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdownToggle = (index, event) => {
    event.stopPropagation();
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleAction = (action, subAdmin) => {
    setDropdownOpen(null);
    if (action === 'edit') {
      console.log("Edit sub admin:", subAdmin);
      // Add edit functionality here
    } else if (action === 'view') {
      console.log("View sub admin:", subAdmin);
      // Add view functionality here
    }
  };

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
    columnHelper.accessor("actions", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => (
        <div className="relative flex justify-start">
          <button
            className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(event) => handleDropdownToggle(info.row.index, event)}
          >
            <MdMoreVert className="h-5 w-5" />
          </button>
          
          {/* Dropdown Menu */}
          {dropdownOpen === info.row.index && (
            <div className="absolute right-0 top-12 z-50 min-w-[120px] bg-white dark:bg-navy-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1">
              <button
                onClick={() => handleAction('view', info.row.original)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                  <MdVisibility className="h-3 w-3 text-green-500 dark:text-green-400" />
                </div>
                View
              </button>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button
                onClick={() => handleAction('edit', info.row.original)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-600/20 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20">
                  <MdEdit className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                </div>
                Edit
              </button>
            </div>
          )}
        </div>
      ),
    }),
  ];

  const handleAddSubAdmin = () => {
    console.log("Add Sub Admin clicked");
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <SearchTableUsers
          tableData={subAdminData}
          columns={subAdminColumns}
          title="Sub Admins"
          onAddClick={handleAddSubAdmin}
        />
      </div>
    </div>
  );
};

export default SubAdminList; 