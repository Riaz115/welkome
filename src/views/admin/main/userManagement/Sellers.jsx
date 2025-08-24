import React, { useState, useMemo } from "react";
import Card from "components/card";
import SearchTableUsers from "./components/SearchTableUsers";
import { createColumnHelper } from "@tanstack/react-table";
import { MdVerified, MdBlock, MdClose, MdVisibility, MdEdit, MdMoreVert, MdStore, MdPending, MdCheckCircle, MdCancel } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import sellersData, { statusOptions } from "./variables/sellersData";

const columnHelper = createColumnHelper();

const Sellers = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Filter sellers based on selected status
  const filteredSellers = useMemo(() => {
    if (selectedStatus === "all") {
      return sellersData;
    }
    return sellersData.filter(seller => seller.status === selectedStatus);
  }, [selectedStatus]);

  // Calculate stats for each status
  const getStatusStats = () => {
    return {
      total: sellersData.length,
      requested: sellersData.filter(s => s.status === "requested").length,
      verified: sellersData.filter(s => s.status === "verified").length,
      blocked: sellersData.filter(s => s.status === "blocked").length,
      declined: sellersData.filter(s => s.status === "declined").length
    };
  };

  const stats = getStatusStats();

  const handleDropdownToggle = (rowIndex, event) => {
    event.stopPropagation();
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  };

  const handleAction = (action, seller) => {
    console.log(`${action} action for seller:`, seller);
    setDropdownOpen(null);
    
    switch(action) {
      case 'verify':
        // Handle verification logic
        console.log(`Verifying seller: ${seller.name[0]}`);
        break;
      case 'block':
        // Handle blocking logic
        console.log(`Blocking seller: ${seller.name[0]}`);
        break;
      case 'unblock':
        // Handle unblocking logic
        console.log(`Unblocking seller: ${seller.name[0]}`);
        break;
      case 'decline':
        // Handle declining logic
        console.log(`Declining seller: ${seller.name[0]}`);
        break;
      case 'view':
        // Handle view details
        console.log(`Viewing seller details: ${seller.name[0]}`);
        break;
      case 'edit':
        // Handle edit seller
        console.log(`Editing seller: ${seller.name[0]}`);
        break;
      default:
        break;
    }
  };

  // Table columns configuration
  const sellersColumns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SELLER
        </p>
      ),
      cell: (info) => (
        <div className="flex w-full items-center gap-[14px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-300">
            <img
              className="h-full w-full rounded-full object-cover"
              src={info.getValue()[1]}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-navy-700 dark:text-white text-sm">
              {info.getValue()[0]}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {info.row.original.ownerName}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {info.row.original.businessType}
            </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PHONE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
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
        const getStatusConfig = (status) => {
          switch (status) {
            case "verified":
              return {
                className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                icon: <MdCheckCircle className="w-3 h-3" />,
                label: "Verified"
              };
            case "requested":
              return {
                className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                icon: <MdPending className="w-3 h-3" />,
                label: "Requested"
              };
            case "blocked":
              return {
                className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                icon: <MdBlock className="w-3 h-3" />,
                label: "Blocked"
              };
            case "declined":
              return {
                className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                icon: <MdCancel className="w-3 h-3" />,
                label: "Declined"
              };
            default:
              return {
                className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                icon: null,
                label: status
              };
          }
        };

        const config = getStatusConfig(status);
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
            {config.icon}
            {config.label}
          </span>
        );
      },
    }),
    columnHelper.accessor("totalProducts", {
      id: "products",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PRODUCTS
        </p>
      ),
      cell: (info) => (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("id", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => {
        const seller = info.row.original;
        return (
          <div className="relative flex justify-start">
            <button
              className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={(event) => handleDropdownToggle(info.row.index, event)}
            >
              <MdMoreVert className="h-5 w-5" />
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen === info.row.index && (
              <div className="absolute right-0 top-12 z-50 min-w-[160px] bg-white dark:bg-navy-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1">
                <button
                  onClick={() => handleAction('view', seller)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20">
                    <MdVisibility className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                  </div>
                  View Details
                </button>
                
                {seller.status === "requested" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => handleAction('verify', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                        <MdVerified className="h-3 w-3 text-green-500 dark:text-green-400" />
                      </div>
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction('decline', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20">
                        <MdClose className="h-3 w-3 text-red-500 dark:text-red-400" />
                      </div>
                      Decline
                    </button>
                  </>
                )}

                {seller.status === "verified" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => handleAction('edit', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20">
                        <MdEdit className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      </div>
                      Edit
                    </button>
                    <button
                      onClick={() => handleAction('block', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20">
                        <MdBlock className="h-3 w-3 text-red-500 dark:text-red-400" />
                      </div>
                      Block
                    </button>
                  </>
                )}

                {seller.status === "blocked" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => handleAction('unblock', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                        <MdCheckCircle className="h-3 w-3 text-green-500 dark:text-green-400" />
                      </div>
                      Unblock
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-6">
      {/* Seller Management Header & Filters */}
      <div className="col-span-1">
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                Seller Management
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage seller accounts, verification, and marketplace access
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IoFilterSharp className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Filter by Status
              </span>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-medium">Total Sellers</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MdStore className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">Requested</p>
                  <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{stats.requested}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <MdPending className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-xs font-medium">Verified</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{stats.verified}</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <MdCheckCircle className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-xl border border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-xs font-medium">Blocked</p>
                  <p className="text-xl font-bold text-red-700 dark:text-red-300">{stats.blocked}</p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <MdBlock className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Declined</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{stats.declined}</p>
                </div>
                <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                  <MdCancel className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedStatus === option.value
                    ? "bg-brand-500 text-white shadow-lg dark:bg-brand-400"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Sellers Table */}
      <div className="col-span-1">
        <SearchTableUsers
          tableData={filteredSellers}
          columns={sellersColumns}
          title={`Sellers ${selectedStatus !== "all" ? `- ${statusOptions.find(s => s.value === selectedStatus)?.label}` : ""}`}
        />
      </div>
    </div>
  );
};

export default Sellers; 