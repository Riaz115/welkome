import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchTableUsers from "./components/SearchTableUsers";
import usersData from "./variables/usersData";
import { createColumnHelper } from "@tanstack/react-table";
import { MdMoreVert, MdBlock, MdCheckCircle, MdArrowForward, MdVisibility } from "react-icons/md";

const columnHelper = createColumnHelper();

const UsersList = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  
  // Convert usersData to state so we can update it
  const [users, setUsers] = useState(usersData);

  const handleDropdownToggle = (rowIndex) => {
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  };

  const handleDropdownAction = (action, rowData) => {
    console.log(`${action} action for:`, rowData);
    setDropdownOpen(null);
    
    // Handle block/unblock actions
    if (action === 'block') {
      console.log(`Blocking user ${rowData.fullName} (${rowData.id})`);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === rowData.id 
            ? { ...user, status: 'Suspended' }
            : user
        )
      );
    } else if (action === 'unblock') {
      console.log(`Unblocking user ${rowData.fullName} (${rowData.id})`);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === rowData.id 
            ? { ...user, status: 'Active' }
            : user
        )
      );
    } else if (action === 'edit') {
      // Navigate to edit user page
      navigate(`/admin/main/userManagement/edit-user/${rowData.id}`);
    }
  };

  // Function to format date to "Dec 15, 2024" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Users columns
  const usersColumns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          User ID
        </p>
      ),
      cell: (info) => (
        <p className="text-xs font-bold text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("profileImage", {
      id: "profileImage",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Profile Photo
        </p>
      ),
      cell: (info) => (
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-300">
          <img
            className="h-full w-full rounded-full"
            src={info.getValue()[1]}
            alt={info.row.original.fullName}
          />
        </div>
      ),
    }),
    columnHelper.accessor("fullName", {
      id: "fullName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Full Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Primary Email
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Phone Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Gender
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("registrationDate", {
      id: "registrationDate",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Sign-Up Date
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {formatDate(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Status
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case "active":
              return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "suspended":
              return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "deleted":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
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
    columnHelper.accessor("actions", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => (
        <div className="relative">
          <button
            className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            onClick={() => handleDropdownToggle(info.row.index)}
          >
            <MdMoreVert className="h-5 w-5" />
          </button>
          {dropdownOpen === info.row.index && (
            <div className="absolute left-0 top-10 z-50 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-navy-800">
              <div className="px-0.5">
                <button
                  className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  onClick={() => handleDropdownAction('block', info.row.original)}
                >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                    <MdBlock className="h-3 w-3" />
                  </span>
                  Block User
                </button>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                  onClick={() => handleDropdownAction('unblock', info.row.original)}
                >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                    <MdCheckCircle className="h-3 w-3" />
                  </span>
                  Unblock User
                </button>
                <div className="mx-2 my-0.5 h-px bg-gray-200 dark:bg-gray-600"></div>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  onClick={() => handleDropdownAction('edit', info.row.original)}
                >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                    <MdVisibility className="h-3 w-3" />
                  </span>
                  View User
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    }),
  ];

  const handleAddUser = () => {
    console.log("Add User clicked");
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <SearchTableUsers
          tableData={users}
          columns={usersColumns}
          title="Users"
          onAddClick={handleAddUser}
        />
      </div>
    </div>
  );
};

export default UsersList; 