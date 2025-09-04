import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchTableUsers from "./components/SearchTableUsers";
import { useUserApiStore } from "stores/useUserApiStore";
import { createColumnHelper } from "@tanstack/react-table";
import { MdMoreVert, MdBlock, MdCheckCircle, MdArrowForward, MdVisibility } from "react-icons/md";

const columnHelper = createColumnHelper();

const UsersList = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  
  const { users, loading, error, getAllUsers, blockUser, unblockUser, clearError } = useUserApiStore();
  
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  
  const filteredUsers = users.filter(user => {
    if (activeTab === 'active') {
      return user.status?.toLowerCase() === 'active' || !user.isBlocked;
    } else {
      return user.status?.toLowerCase() === 'blocked' || user.status?.toLowerCase() === 'suspended' || user.isBlocked;
    }
  });

  const handleDropdownToggle = (rowIndex) => {
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  };

  const handleDropdownAction = async (action, rowData) => {
    setDropdownOpen(null);
    
    try {
      if (action === 'block') {
        await blockUser(rowData._id || rowData.id);
      } else if (action === 'unblock') {
        await unblockUser(rowData._id || rowData.id);
      } else if (action === 'view') {
        navigate(`/admin/main/userManagement/user-detail/${rowData._id || rowData.id}`);
      }
    } catch (error) {
      // Error is already handled in the store and shown via toast
      console.error('Action failed:', error);
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
    columnHelper.accessor((row) => row._id || row.id, {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          User ID
        </p>
      ),
      cell: (info) => (
        <p className="text-xs font-bold text-gray-600 dark:text-white">
          {info.getValue()?.slice(-8) || 'N/A'}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.profileImage || row.avatar, {
      id: "profileImage",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Profile Photo
        </p>
      ),
      cell: (info) => (
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-300">
          {info.getValue() ? (
            <img
              className="h-full w-full rounded-full"
              src={Array.isArray(info.getValue()) ? info.getValue()[1] : info.getValue()}
              alt={info.row.original.fullName || info.row.original.firstName}
            />
          ) : (
            <span className="text-white font-bold">
              {(info.row.original.fullName || info.row.original.firstName || 'U').charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.fullName || `${row.firstName || ''} ${row.lastName || ''}`.trim(), {
      id: "fullName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Full Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || 'N/A'}
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
    columnHelper.accessor((row) => row.phoneNumber || row.phone, {
      id: "phoneNumber",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Phone Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || 'N/A'}
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
          {info.getValue() || 'N/A'}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.registrationDate || row.createdAt, {
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
        const row = info.row.original;
        const status = row.status || (row.isBlocked ? 'Blocked' : 'Active');
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case "active":
              return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "blocked":
            case "suspended":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "deleted":
              return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
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
                  onClick={() => handleDropdownAction('view', info.row.original)}
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
    navigate('/admin/main/userManagement/new-user');
  };

  const handleRetry = () => {
    clearError();
    getAllUsers();
  };

  const EmptyState = ({ message, showRetry = false }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-navy-800">
        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        {message}
      </h3>
      {showRetry && (
        <button
          onClick={handleRetry}
          className="mt-4 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  );

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-navy-800">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'active'
                ? 'bg-white text-navy-700 shadow dark:bg-navy-700 dark:text-white'
                : 'text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Active Users ({users.filter(user => user.status?.toLowerCase() === 'active' || !user.isBlocked).length})
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'blocked'
                ? 'bg-white text-navy-700 shadow dark:bg-navy-700 dark:text-white'
                : 'text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Blocked Users ({users.filter(user => user.status?.toLowerCase() === 'blocked' || user.status?.toLowerCase() === 'suspended' || user.isBlocked).length})
          </button>
        </div>
        {error && !loading && users.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-navy-800">
            <h2 className="mb-4 text-xl font-bold text-navy-700 dark:text-white">
              {`${activeTab === 'active' ? 'Active' : 'Blocked'} Users`}
            </h2>
            <EmptyState 
              message={error}
              showRetry={true}
            />
          </div>
        ) : filteredUsers.length === 0 && !loading ? (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-navy-800">
            <h2 className="mb-4 text-xl font-bold text-navy-700 dark:text-white">
              {`${activeTab === 'active' ? 'Active' : 'Blocked'} Users`}
            </h2>
            <EmptyState 
              message={`No ${activeTab} users found`}
              showRetry={false}
            />
          </div>
        ) : (
          <SearchTableUsers
            tableData={filteredUsers}
            columns={usersColumns}
            title={`${activeTab === 'active' ? 'Active' : 'Blocked'} Users`}
            onAddClick={handleAddUser}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default UsersList; 