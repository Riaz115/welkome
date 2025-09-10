import React, { useState, useEffect } from "react";
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { CarouselTabs } from "components/carousel";
import { 
  MdChevronRight, 
  MdChevronLeft, 
  MdFilterList, 
  MdExpandMore, 
  MdExpandLess, 
  MdClear, 
  MdMoreVert, 
  MdVisibility, 
  MdEdit, 
  MdDelete, 
  MdAdd,
  MdToggleOn,
  MdToggleOff
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useCouponApiStore from "stores/useCouponApiStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";
import SearchAndFilter from "components/common/SearchAndFilter";
import PageHeader from "components/common/PageHeader";

import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const ActionMenu = ({ coupon, onViewClick, onEditClick, onDeleteClick, onToggleClick }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
        title="Actions"
      >
        <MdMoreVert className="w-4 h-4" />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-8 z-50 w-48 bg-white dark:bg-navy-700 rounded-lg shadow-lg border border-gray-200 dark:border-navy-600 py-1">
          <button
            onClick={() => {
              setShowMenu(false);
              onViewClick && onViewClick(coupon);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdVisibility className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onEditClick && onEditClick(coupon);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdEdit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onToggleClick && onToggleClick(coupon);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            {coupon.isActive ? (
              <>
                <MdToggleOff className="w-4 h-4" />
                Deactivate
              </>
            ) : (
              <>
                <MdToggleOn className="w-4 h-4" />
                Activate
              </>
            )}
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onDeleteClick && onDeleteClick(coupon);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <MdDelete className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

function CouponTable(props) {
  const { tableData, onViewClick, onEditClick, onDeleteClick, onToggleClick, searchValue, onSearchChange, advancedFilters, onAdvancedFilterChange, onClearFilters } = props;
  const [columnFilters, setColumnFilters] = React.useState([]);
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState(searchValue || "");

  React.useEffect(() => {
    setGlobalFilter(searchValue || "");
  }, [searchValue]);

  const getUniqueValues = (key) => {
    const values = [...new Set(tableData.map(item => item[key]))].filter(Boolean);
    return values.sort();
  };


  const createPages = (count) => {
    let arrPageCount = [];
    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }
    return arrPageCount;
  };

  const getStatusColor = (isActive, validUntil) => {
    const now = new Date();
    const expiryDate = new Date(validUntil);
    
    if (!isActive) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    } else if (expiryDate < now) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    } else {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getStatusText = (isActive, validUntil) => {
    const now = new Date();
    const expiryDate = new Date(validUntil);
    
    if (!isActive) {
      return 'Inactive';
    } else if (expiryDate < now) {
      return 'Expired';
    } else {
      return 'Active';
    }
  };

  const columns = [
    columnHelper.accessor("code", {
      id: "code",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          COUPON CODE
        </p>
      ),
      cell: (info) => (
        <div className="text-sm font-mono text-brand-600 dark:text-brand-400 font-medium">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          NAME
        </p>
      ),
      cell: (info) => (
        <div>
          <p className="text-sm font-semibold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("discountType", {
      id: "discountType",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DISCOUNT TYPE
        </p>
      ),
      cell: (info) => {
        const type = info.getValue();
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            type === 'percentage' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
          }`}>
            {type?.charAt(0).toUpperCase() + type?.slice(1) || 'Unknown'}
          </span>
        );
      },
    }),
    columnHelper.accessor("discountValue", {
      id: "discountValue",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DISCOUNT VALUE
        </p>
      ),
      cell: (info) => {
        const value = info.getValue();
        const type = info.row.original.discountType;
        return (
          <div className="text-sm font-bold text-navy-700 dark:text-white">
            {type === 'percentage' ? `${value}%` : `$${value}`}
          </div>
        );
      },
    }),
    columnHelper.accessor("minOrderAmount", {
      id: "minOrderAmount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          MIN ORDER
        </p>
      ),
      cell: (info) => (
        <div className="text-sm text-navy-700 dark:text-white">
          ${info.getValue() || 0}
        </div>
      ),
    }),
    columnHelper.accessor("usageLimit", {
      id: "usageLimit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          USAGE
        </p>
      ),
      cell: (info) => {
        const limit = info.getValue();
        const used = info.row.original.usedCount || 0;
        return (
          <div>
            <p className="text-sm text-navy-700 dark:text-white">
              {used}/{limit || '∞'}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("validUntil", {
      id: "validUntil",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          EXPIRES
        </p>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        return (
          <p className="text-sm text-navy-700 dark:text-white">
            {formattedDate}
          </p>
        );
      },
    }),
    columnHelper.accessor("isActive", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const isActive = info.getValue();
        const validUntil = info.row.original.validUntil;
        const statusText = getStatusText(isActive, validUntil);
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(isActive, validUntil)}`}>
            {statusText}
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
      cell: (info) => {
        const coupon = info.row.original;
        return (
          <ActionMenu 
            coupon={coupon}
            onViewClick={onViewClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onToggleClick={onToggleClick}
          />
        );
      },
    }),
  ];
  
  const [data, setData] = React.useState(() => [...defaultData]);
  
  React.useEffect(() => {
    setData([...tableData]);
  }, [tableData]);
  
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useMemo(() => {
    let filteredData = [...defaultData];
    
    if (advancedFilters.status && advancedFilters.status !== "") {
      if (advancedFilters.status === 'active') {
        const now = new Date();
        filteredData = filteredData.filter(item => 
          item.isActive && new Date(item.validUntil) > now
        );
      } else if (advancedFilters.status === 'inactive') {
        filteredData = filteredData.filter(item => !item.isActive);
      } else if (advancedFilters.status === 'expired') {
        const now = new Date();
        filteredData = filteredData.filter(item => 
          new Date(item.validUntil) < now
        );
      }
    }
    
    if (advancedFilters.discountType && advancedFilters.discountType !== "") {
      filteredData = filteredData.filter(item => 
        item.discountType.toLowerCase() === advancedFilters.discountType.toLowerCase()
      );
    }
    
    if (advancedFilters.dateFrom || advancedFilters.dateTo) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.createdAt);
        const fromDate = advancedFilters.dateFrom ? new Date(advancedFilters.dateFrom) : null;
        const toDate = advancedFilters.dateTo ? new Date(advancedFilters.dateTo) : null;
        
        if (fromDate && toDate) {
          return itemDate >= fromDate && itemDate <= toDate;
        } else if (fromDate) {
          return itemDate >= fromDate;
        } else if (toDate) {
          return itemDate <= toDate;
        }
        return true;
      });
    }
    
    setData(filteredData);
  }, [defaultData, advancedFilters, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="mb-8">
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
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
                .rows.slice(0, pageSize)
                .map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-200 dark:border-white/30"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-4 pr-4 align-top"
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
          <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-700">
                Showing {pageSize} rows per page
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
              >
                <MdChevronLeft />
              </button>

              {createPages(table.getPageCount()).map((pageNumber, index) => {
                return (
                  <button
                    className={`linear flex h-10 w-10 items-center justify-center rounded-full p-2 text-sm transition duration-200 ${
                      pageNumber === pageIndex + 1
                        ? "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                        : "border-[1px] border-gray-400 bg-[transparent] dark:border-white dark:text-white"
                    }`}
                    onClick={() => table.setPageIndex(pageNumber - 1)}
                    key={index}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 `}
              >
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const columnHelper = createColumnHelper();

const CouponList = () => {
  const navigate = useNavigate();
  const { coupons, getAllCoupons, deleteCoupon, toggleCouponStatus, loading } = useCouponApiStore();
  const [processedCoupons, setProcessedCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState({
    status: "",
    discountType: "",
    dateFrom: "",
    dateTo: ""
  });

  const normalizeCoupon = (coupon) => {
    return {
      _id: coupon._id,
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscountAmount: coupon.maxDiscountAmount,
      usageLimit: coupon.usageLimit,
      usedCount: coupon.usedCount,
      userUsageLimit: coupon.userUsageLimit,
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
      isActive: coupon.isActive,
      applicableCategories: coupon.applicableCategories,
      applicableProducts: coupon.applicableProducts,
      excludedProducts: coupon.excludedProducts,
      applicableBrands: coupon.applicableBrands,
      firstTimeUserOnly: coupon.firstTimeUserOnly,
      newUserOnly: coupon.newUserOnly,
      createdBy: coupon.createdBy,
      lastUsedAt: coupon.lastUsedAt,
      createdAt: coupon.createdAt,
      originalData: coupon
    };
  };

  const getFilteredCoupons = () => {
    if (activeTab === 'active') {
      const now = new Date();
      return processedCoupons.filter(coupon => 
        coupon.isActive && new Date(coupon.validUntil) > now
      );
    } else if (activeTab === 'inactive') {
      return processedCoupons.filter(coupon => !coupon.isActive);
    } else if (activeTab === 'expired') {
      const now = new Date();
      return processedCoupons.filter(coupon => 
        new Date(coupon.validUntil) < now
      );
    }
    return processedCoupons;
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getAllCoupons();
        console.log('Fetched coupons result:', result); // Debug log
      } catch (error) {
        toast.error('Failed to fetch coupons');
      }
    };
    
    fetchCoupons();
  }, []);

  useEffect(() => {
    console.log('Coupons data received:', coupons); // Debug log
    if (Array.isArray(coupons) && coupons.length >= 0) {
      const normalized = coupons.map(normalizeCoupon);
      console.log('Normalized coupons:', normalized); // Debug log
      setProcessedCoupons(normalized);
    }
  }, [coupons]);

  const handleViewCoupon = (coupon) => {
    navigate(`/admin/main/couponManagement/coupon-detail/${coupon._id}`);
  };

  const handleEditCoupon = (coupon) => {
    navigate(`/admin/main/couponManagement/edit-coupon/${coupon._id}`);
  };

  const handleDeleteCoupon = (coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteModal(true);
  };

  const confirmDeleteCoupon = async () => {
    if (!couponToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteCoupon(couponToDelete._id);
      toast.success('Coupon deleted successfully');
      setShowDeleteModal(false);
      setCouponToDelete(null);
    } catch (error) {
      toast.error('Failed to delete coupon');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCouponToDelete(null);
  };

  const handleToggleCoupon = async (coupon) => {
    try {
      await toggleCouponStatus(coupon._id);
      toast.success(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to toggle coupon status');
    }
  };

  const handleAddCoupon = () => {
    navigate('/admin/main/couponManagement/add-coupon');
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleAdvancedFilterChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setAdvancedFilters({
      status: "",
      discountType: "",
      dateFrom: "",
      dateTo: ""
    });
  };

  const filterConfig = [
    {
      field: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'expired', label: 'Expired' }
      ]
    },
    {
      field: 'discountType',
      label: 'Discount Type',
      type: 'select',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed Amount' }
      ]
    },
    {
      field: 'dateFrom',
      label: 'Date From',
      type: 'date'
    },
    {
      field: 'dateTo',
      label: 'Date To',
      type: 'date'
    }
  ];

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title="Coupon Management"
        subtitle="Manage all discount coupons"
        primaryAction={{
          label: "Add Coupon",
          icon: <MdAdd className="w-4 h-4" />,
          onClick: handleAddCoupon
        }}
      />

      <div className="mb-6">
        <SearchAndFilter
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          placeholder="Search coupons..."
          enableAdvancedFilters={true}
          advancedFilters={advancedFilters}
          onAdvancedFilterChange={handleAdvancedFilterChange}
          onClearFilters={handleClearFilters}
          filterConfig={filterConfig}
        />
      </div>

      <div className="mb-6">
        <CarouselTabs
          tabs={[
            { 
              key: 'active', 
              label: 'Active', 
              count: processedCoupons.filter(c => 
                c.isActive && new Date(c.validUntil) > new Date()
              ).length 
            },
            { 
              key: 'inactive', 
              label: 'Inactive', 
              count: processedCoupons.filter(c => !c.isActive).length 
            },
            { 
              key: 'expired', 
              label: 'Expired', 
              count: processedCoupons.filter(c => 
                new Date(c.validUntil) < new Date()
              ).length 
            },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {getFilteredCoupons().length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-navy-700 mb-4">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No coupons found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            There are currently no coupons to display.
          </p>
          <button
            onClick={handleAddCoupon}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all duration-200"
          >
            <MdAdd className="w-4 h-4" />
            Create First Coupon
          </button>
        </div>
      ) : (
        <CouponTable 
          tableData={getFilteredCoupons()} 
          onViewClick={handleViewCoupon}
          onEditClick={handleEditCoupon}
          onDeleteClick={handleDeleteCoupon}
          onToggleClick={handleToggleCoupon}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          advancedFilters={advancedFilters}
          onAdvancedFilterChange={handleAdvancedFilterChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteCoupon}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
        itemName={couponToDelete?.code}
        itemType="Coupon Code"
        isLoading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CouponList;
