import React, { useState, useEffect, useMemo } from "react";
import Card from "components/card";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender,
} from "@tanstack/react-table";
import { CarouselTabs } from "components/carousel";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdToggleOn,
  MdToggleOff,
  MdMoreVert,
  MdChevronLeft,
  MdChevronRight,
  MdAccessTime
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFlashSaleApiStore from "stores/useFlashSaleApiStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";
import SearchAndFilter from "components/common/SearchAndFilter";
import PageHeader from "components/common/PageHeader";

const ActionMenu = ({ flashSale, onViewClick, onEditClick, onDeleteClick, onToggleClick }) => {
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
              onViewClick && onViewClick(flashSale);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdVisibility className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onEditClick && onEditClick(flashSale);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdEdit className="w-4 h-4" />
            Edit Flash Sale
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onToggleClick && onToggleClick(flashSale);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            {flashSale.isActive ? (
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
              onDeleteClick && onDeleteClick(flashSale);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <MdDelete className="w-4 h-4" />
            Delete Flash Sale
          </button>
        </div>
      )}
    </div>
  );
};

function FlashSaleTable(props) {
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

  const getStatusColor = (isActive, startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (!isActive) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    } else if (now < start) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    } else if (now > end) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    } else {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getStatusText = (isActive, startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (!isActive) {
      return 'Inactive';
    } else if (now < start) {
      return 'Upcoming';
    } else if (now > end) {
      return 'Expired';
    } else {
      return 'Active';
    }
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        id: "image",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            IMAGE
          </p>
        ),
        cell: (info) => (
          <div className="flex items-center">
            <img
              src={info.getValue()}
              alt="Flash Sale"
              className="w-12 h-8 object-cover rounded"
              onError={(e) => {
                e.target.src = "/img/default-flashsale.png";
              }}
            />
          </div>
        ),
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            TITLE
          </p>
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {info.row.original.description}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("flashSaleType", {
        id: "flashSaleType",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            TYPE
          </p>
        ),
        cell: (info) => (
          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("discountType", {
        id: "discountType",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            DISCOUNT
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-navy-700 dark:text-white">
                {row.discountValue}
                {row.discountType === "percentage" ? "%" : " Rs"}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {row.discountType}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("startTime", {
        id: "timePeriod",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            TIME PERIOD
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 dark:text-gray-300">
                From: {new Date(row.startTime).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                To: {new Date(row.endTime).toLocaleDateString()}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("endTime", {
        id: "timeRemaining",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            TIME LEFT
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          const timeRemaining = getTimeRemaining(row.endTime);
          const isActive = row.isActive && new Date() >= new Date(row.startTime) && new Date() <= new Date(row.endTime);
          
          return (
            <div className="flex items-center gap-1">
              <MdAccessTime className="w-3 h-3 text-gray-500" />
              <span className={`text-xs font-medium ${
                isActive ? 'text-green-600 dark:text-green-400' : 
                timeRemaining === 'Expired' ? 'text-red-600 dark:text-red-400' : 
                'text-blue-600 dark:text-blue-400'
              }`}>
                {timeRemaining}
              </span>
            </div>
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
          const row = info.row.original;
          const isActive = row.isActive;
          const startTime = row.startTime;
          const endTime = row.endTime;
          const statusText = getStatusText(isActive, startTime, endTime);
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(isActive, startTime, endTime)}`}>
              {statusText}
            </span>
          );
        },
      }),
      columnHelper.accessor("position", {
        id: "position",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            POSITION
          </p>
        ),
        cell: (info) => (
          <span className="text-sm text-navy-700 dark:text-white">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            ACTIONS
          </p>
        ),
        cell: (info) => {
          const flashSale = info.row.original;
          return (
            <ActionMenu 
              flashSale={flashSale}
              onViewClick={onViewClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onToggleClick={onToggleClick}
            />
          );
        },
      }),
    ],
    []
  );
  
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
          item.isActive && new Date(item.startTime) <= now && new Date(item.endTime) >= now
        );
      } else if (advancedFilters.status === 'inactive') {
        filteredData = filteredData.filter(item => !item.isActive);
      } else if (advancedFilters.status === 'expired') {
        const now = new Date();
        filteredData = filteredData.filter(item => 
          new Date(item.endTime) < now
        );
      } else if (advancedFilters.status === 'upcoming') {
        const now = new Date();
        filteredData = filteredData.filter(item => 
          item.isActive && new Date(item.startTime) > now
        );
      }
    }
    
    if (advancedFilters.flashSaleType && advancedFilters.flashSaleType !== "") {
      filteredData = filteredData.filter(item => 
        item.flashSaleType.toLowerCase() === advancedFilters.flashSaleType.toLowerCase()
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
                    key={pageNumber}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
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

const FlashSaleList = () => {
  const navigate = useNavigate();
  const { getAllFlashSales, deleteFlashSale, toggleFlashSaleStatus, loading, flashSales } = useFlashSaleApiStore();
  const [searchValue, setSearchValue] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [activeTab, setActiveTab] = useState("active");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    flashSaleId: null,
    flashSaleTitle: ""
  });

  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      await getAllFlashSales();
    } catch (error) {
      toast.error("Failed to fetch flash sales");
    }
  };

  const getFilteredFlashSales = () => {
    let filtered = flashSales;

    if (activeTab === "active") {
      const now = new Date();
      filtered = filtered.filter(flashSale => 
        flashSale.isActive && 
        new Date(flashSale.startTime) <= now && 
        new Date(flashSale.endTime) >= now
      );
    } else if (activeTab === "inactive") {
      filtered = filtered.filter(flashSale => !flashSale.isActive);
    } else if (activeTab === "expired") {
      filtered = filtered.filter(flashSale => new Date(flashSale.endTime) < new Date());
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter(flashSale => 
        flashSale.isActive && new Date(flashSale.startTime) > new Date()
      );
    }

    if (searchValue) {
      filtered = filtered.filter(flashSale =>
        flashSale.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        flashSale.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (advancedFilters.flashSaleType) {
      filtered = filtered.filter(flashSale => flashSale.flashSaleType === advancedFilters.flashSaleType);
    }

    if (advancedFilters.discountType) {
      filtered = filtered.filter(flashSale => flashSale.discountType === advancedFilters.discountType);
    }

    if (advancedFilters.dateFrom) {
      filtered = filtered.filter(flashSale => 
        new Date(flashSale.startTime) >= new Date(advancedFilters.dateFrom)
      );
    }

    if (advancedFilters.dateTo) {
      filtered = filtered.filter(flashSale => 
        new Date(flashSale.endTime) <= new Date(advancedFilters.dateTo)
      );
    }

    return filtered;
  };

  const filteredFlashSales = useMemo(() => getFilteredFlashSales(), [flashSales, searchValue, advancedFilters, activeTab]);

  const getFlashSaleCounts = () => {
    const now = new Date();
    return {
      active: flashSales.filter(flashSale => 
        flashSale.isActive && 
        new Date(flashSale.startTime) <= now && 
        new Date(flashSale.endTime) >= now
      ).length,
      inactive: flashSales.filter(flashSale => !flashSale.isActive).length,
      expired: flashSales.filter(flashSale => new Date(flashSale.endTime) < now).length,
      upcoming: flashSales.filter(flashSale => 
        flashSale.isActive && new Date(flashSale.startTime) > now
      ).length
    };
  };

  const handleAddFlashSale = () => {
    navigate("/admin/main/flashSaleManagement/add-flashsale");
  };

  const handleEditFlashSale = (flashSale) => {
    navigate(`/admin/main/flashSaleManagement/edit-flashsale/${flashSale._id}`);
  };

  const handleViewFlashSale = (flashSale) => {
    navigate(`/admin/main/flashSaleManagement/flashsale-detail/${flashSale._id}`);
  };

  const handleDeleteFlashSale = (flashSale) => {
    setDeleteModal({
      isOpen: true,
      flashSaleId: flashSale._id,
      flashSaleTitle: flashSale.title
    });
  };

  const handleToggleStatus = async (flashSale) => {
    try {
      await toggleFlashSaleStatus(flashSale._id);
      toast.success("Flash sale status updated successfully");
      await fetchFlashSales();
    } catch (error) {
      toast.error("Failed to update flash sale status");
    }
  };

  const confirmDeleteFlashSale = async () => {
    if (!deleteModal.flashSaleId) return;

    setIsDeleting(true);
    try {
      await deleteFlashSale(deleteModal.flashSaleId);
      toast.success("Flash sale deleted successfully");
      await fetchFlashSales();
    } catch (error) {
      toast.error("Failed to delete flash sale");
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal();
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      flashSaleId: null,
      flashSaleTitle: ""
    });
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
    setAdvancedFilters({});
    setSearchValue("");
  };

  const filterConfig = [
    {
      field: "flashSaleType",
      label: "Flash Sale Type",
      type: "select",
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "special", label: "Special" }
      ]
    },
    {
      field: "discountType",
      label: "Discount Type",
      type: "select",
      options: [
        { value: "percentage", label: "Percentage" },
        { value: "fixed", label: "Fixed" }
      ]
    },
    {
      field: "dateFrom",
      label: "Start From",
      type: "date"
    },
    {
      field: "dateTo",
      label: "End Until",
      type: "date"
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
        title="Flash Sale Management"
        subtitle="Manage all flash sale promotions"
        primaryAction={{
          label: "Add Flash Sale",
          icon: <MdAdd className="w-4 h-4" />,
          onClick: handleAddFlashSale
        }}
      />

      <div className="mb-6">
        <SearchAndFilter
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          placeholder="Search flash sales..."
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
              count: getFlashSaleCounts().active 
            },
            { 
              key: 'upcoming', 
              label: 'Upcoming', 
              count: getFlashSaleCounts().upcoming 
            },
            { 
              key: 'inactive', 
              label: 'Inactive', 
              count: getFlashSaleCounts().inactive 
            },
            { 
              key: 'expired', 
              label: 'Expired', 
              count: getFlashSaleCounts().expired 
            }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <FlashSaleTable
        tableData={filteredFlashSales}
        onViewClick={handleViewFlashSale}
        onEditClick={handleEditFlashSale}
        onDeleteClick={handleDeleteFlashSale}
        onToggleClick={handleToggleStatus}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        advancedFilters={advancedFilters}
        onAdvancedFilterChange={handleAdvancedFilterChange}
        onClearFilters={handleClearFilters}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteFlashSale}
        title="Delete Flash Sale"
        message="Are you sure you want to delete this flash sale? This action cannot be undone."
        itemName={deleteModal.flashSaleTitle}
        itemType="flash sale"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FlashSaleList;
