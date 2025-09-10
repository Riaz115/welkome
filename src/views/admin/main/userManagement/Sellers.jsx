import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import SearchTableUsers from "./components/SearchTableUsers";
import { createColumnHelper } from "@tanstack/react-table";
import { CarouselTabs } from "components/carousel";
import { MdVerified, MdBlock, MdClose, MdVisibility, MdMoreVert, MdStore, MdPending, MdCheckCircle, MdCancel } from "react-icons/md";
import useSellerApiStore from "stores/useSellerApiStore";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

const Sellers = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { 
    sellers, 
    loading, 
    error, 
    getSellers, 
    approveSeller,
    rejectSeller,
    blockSeller,
    unblockSeller
  } = useSellerApiStore();

  // Fetch sellers on component mount
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        await getSellers();
      } catch (error) {
        // Handle 403 errors silently - don't show error UI for permission issues
        if (error?.response?.status === 403) {
          console.warn('Access denied: Insufficient permissions to view sellers');
          return;
        }
        // For other errors, let the error state handle it
        console.error('Error fetching sellers:', error);
      }
    };
    
    fetchSellers();
  }, [getSellers]);

  // Ensure sellers is always an array
  const sellersArray = Array.isArray(sellers) ? sellers : [];

  // Filter sellers based on selected status
  const filteredSellers = useMemo(() => {
    if (selectedStatus === "blocked") {
      return sellersArray.filter(seller => seller.verificationStatus === "approved" && seller.isBlocked === true);
    }
    return sellersArray.filter(seller => seller.verificationStatus === selectedStatus);
  }, [sellersArray, selectedStatus]);

  // Calculate stats for each status
  const getStatusStats = () => {
    return {
      total: sellersArray.length,
      pending: sellersArray.filter(s => s.verificationStatus === "pending").length,
      approved: sellersArray.filter(s => s.verificationStatus === "approved").length,
      rejected: sellersArray.filter(s => s.verificationStatus === "rejected").length,
      blocked: sellersArray.filter(s => s.verificationStatus === "approved" && s.isBlocked === true).length
    };
  };

  const stats = getStatusStats();


  const handleDropdownToggle = (rowIndex, event) => {
    event.stopPropagation();
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  };

  const handleAction = async (action, seller) => {
    setDropdownOpen(null);
    
    try {
      switch(action) {
        case 'approve':
          setActionLoading(true);
          await approveSeller(seller._id);
          toast.success(`Seller ${seller.businessName} has been approved successfully!`);
          setActionLoading(false);
          break;
        case 'reject':
          setSelectedSeller(seller);
          setShowRejectModal(true);
          break;
        case 'block':
          setSelectedSeller(seller);
          setShowBlockModal(true);
          break;
        case 'unblock':
          setActionLoading(true);
          await unblockSeller(seller._id);
          toast.success(`Seller ${seller.businessName} has been unblocked successfully!`);
          setActionLoading(false);
          break;
        case 'view':
          // Navigate to seller detail page
          navigate(`/admin/main/userManagement/sellers/${seller._id}`);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update seller status');
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      setActionLoading(true);
      await rejectSeller(selectedSeller._id, rejectionReason);
      toast.success(`Seller ${selectedSeller.businessName} has been rejected.`);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedSeller(null);
      setActionLoading(false);
    } catch (error) {
      toast.error('Failed to reject seller');
      setActionLoading(false);
    }
  };

  const handleBlock = async () => {
    if (!blockReason.trim()) {
      toast.error('Please provide a reason for blocking');
      return;
    }

    try {
      setActionLoading(true);
      await blockSeller(selectedSeller._id, blockReason);
      toast.success(`Seller ${selectedSeller.businessName} has been blocked.`);
      setShowBlockModal(false);
      setBlockReason('');
      setSelectedSeller(null);
      setActionLoading(false);
    } catch (error) {
      toast.error('Failed to block seller');
      setActionLoading(false);
    }
  };

  // Table columns configuration
  const sellersColumns = [
    columnHelper.accessor("businessName", {
      id: "businessName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SELLER
        </p>
      ),
      cell: (info) => (
        <div className="flex w-full items-center gap-[14px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-300">
            <span className="text-white font-bold text-lg">
              {info.row.original.businessName?.charAt(0) || 'S'}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-navy-700 dark:text-white text-sm">
              {info.getValue()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {info.row.original.name}
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
    columnHelper.accessor("verificationStatus", {
      id: "verificationStatus",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        const getStatusConfig = (status) => {
          switch (status) {
            case "approved":
              return {
                className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                icon: <MdCheckCircle className="w-3 h-3" />,
                label: "Approved"
              };
            case "pending":
              return {
                className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                icon: <MdPending className="w-3 h-3" />,
                label: "Pending"
              };
            case "rejected":
              return {
                className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                icon: <MdCancel className="w-3 h-3" />,
                label: "Rejected"
              };
            default:
              return {
                className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                icon: <MdPending className="w-3 h-3" />,
                label: "Pending"
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
    columnHelper.accessor("isBlocked", {
      id: "blockStatus",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          BLOCK STATUS
        </p>
      ),
      cell: (info) => {
        const seller = info.row.original;
        const isBlocked = seller.isBlocked;
        
        if (seller.verificationStatus !== "approved") {
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
              <MdPending className="w-3 h-3" />
              N/A
            </span>
          );
        }
        
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
            isBlocked 
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          }`}>
            {isBlocked ? (
              <>
                <MdBlock className="w-3 h-3" />
                Blocked
              </>
            ) : (
              <>
                <MdCheckCircle className="w-3 h-3" />
                Active
              </>
            )}
          </span>
        );
      },
    }),
    columnHelper.accessor("rating", {
      id: "rating",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          RATING
        </p>
      ),
      cell: (info) => {
        const rating = info.getValue()?.average || 0;
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {rating.toFixed(1)} ⭐
          </span>
        );
      },
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
                
                {seller.verificationStatus === "pending" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => handleAction('approve', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                        <MdVerified className="h-3 w-3 text-green-500 dark:text-green-400" />
                      </div>
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction('reject', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20">
                        <MdClose className="h-3 w-3 text-red-500 dark:text-red-400" />
                      </div>
                      Reject
                    </button>
                  </>
                )}


                {seller.verificationStatus === "rejected" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => handleAction('approve', seller)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                        <MdCheckCircle className="h-3 w-3 text-green-500 dark:text-green-400" />
                      </div>
                      Approve
                    </button>
                  </>
                )}

                {seller.verificationStatus === "approved" && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    {seller.isBlocked ? (
                      <button
                        onClick={() => handleAction('unblock', seller)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-3"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20">
                          <MdCheckCircle className="h-3 w-3 text-green-500 dark:text-green-400" />
                        </div>
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction('block', seller)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20">
                          <MdBlock className="h-3 w-3 text-red-500 dark:text-red-400" />
                        </div>
                        Block
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="mt-3 grid h-full grid-cols-1 gap-6">
        <Card extra="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading sellers...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show error state (but not for 403 errors)
  if (error && !loading) {
    return (
      <div className="mt-3 grid h-full grid-cols-1 gap-6">
        <Card extra="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400 mb-2">Error loading sellers</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
              <button 
                onClick={() => getSellers()}
                className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show empty state for 403 errors (no error message, just empty state)
  if (!loading && !error && sellersArray.length === 0) {
    return (
      <div className="mt-3 grid h-full grid-cols-1 gap-6">
        <Card extra="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">No sellers found</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                There are no sellers to display at the moment.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                  <p className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">Pending</p>
                  <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <MdPending className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-xs font-medium">Approved</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{stats.approved}</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <MdCheckCircle className="text-white text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-xl border border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-xs font-medium">Rejected</p>
                  <p className="text-xl font-bold text-red-700 dark:text-red-300">{stats.rejected}</p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <MdCancel className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="mb-6">
            <CarouselTabs
              tabs={[
                { 
                  key: 'pending', 
                  label: 'Pending', 
                  count: stats.pending 
                },
                { 
                  key: 'approved', 
                  label: 'Approved', 
                  count: stats.approved 
                },
                { 
                  key: 'rejected', 
                  label: 'Rejected', 
                  count: stats.rejected 
                },
                { 
                  key: 'blocked', 
                  label: 'Blocked', 
                  count: stats.blocked 
                }
              ]}
              activeTab={selectedStatus}
              onTabChange={setSelectedStatus}
            />
          </div>
        </Card>
      </div>

      {/* Sellers Table */}
      <div className="col-span-1">
        <SearchTableUsers
          tableData={filteredSellers}
          columns={sellersColumns}
          title={`Sellers - ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}`}
        />
      </div>

      {/* Rejection Modal */}
      {showRejectModal && selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <MdCancel className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                    Reject Seller Application
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide a reason for rejection
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedSeller(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seller Information
                </label>
                <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <p className="font-medium text-navy-700 dark:text-white">{selectedSeller?.businessName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedSeller?.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Rejection <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a detailed reason for rejecting this seller application. This will help the seller understand what needs to be improved..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-navy-600 dark:text-white resize-none"
                  rows={5}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Be specific and constructive in your feedback
                  </p>
                  <p className="text-xs text-gray-400">
                    {rejectionReason.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedSeller(null);
                }}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <MdCancel className="w-4 h-4" />
                    Reject Seller
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {showBlockModal && selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <MdBlock className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                    Block Seller
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide a reason for blocking
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setBlockReason('');
                  setSelectedSeller(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seller Information
                </label>
                <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <p className="font-medium text-navy-700 dark:text-white">{selectedSeller?.businessName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedSeller?.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Blocking <span className="text-orange-500">*</span>
                </label>
                <textarea
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="Please provide a detailed reason for blocking this seller. This will help the seller understand what needs to be addressed..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-navy-600 dark:text-white resize-none"
                  rows={5}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Be specific and constructive in your feedback
                  </p>
                  <p className="text-xs text-gray-400">
                    {blockReason.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setBlockReason('');
                  setSelectedSeller(null);
                }}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                disabled={actionLoading || !blockReason.trim()}
                className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <MdBlock className="w-4 h-4" />
                    Block Seller
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sellers; 