import React, { useState, useEffect } from "react";
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { CarouselTabs } from "components/carousel";
import { MdChevronRight, MdChevronLeft, MdFilterList, MdExpandMore, MdExpandLess, MdClear, MdMoreVert, MdVisibility, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useOrderApiStore from "stores/useOrderApiStore";
import { useAuthStore } from "stores/useAuthStore";
import { toast } from "react-toastify";

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

const ActionMenu = ({ order, onViewClick, onEditClick }) => {
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
              onViewClick && onViewClick(order);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdVisibility className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onEditClick && onEditClick(order);
            }}
            className="w-full px-4 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2"
          >
            <MdEdit className="w-4 h-4" />
            Update Status
          </button>
        </div>
      )}
    </div>
  );
};

function OrderTable(props) {
  const { tableData, onViewClick, onEditClick, initialFilters, clearFilters } = props;
  const [columnFilters, setColumnFilters] = React.useState([]);
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState(initialFilters?.search || "");
  
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [advancedFilters, setAdvancedFilters] = React.useState({
    status: "",
    paymentStatus: "",
    orderSource: "",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: ""
  });

  React.useEffect(() => {
    if (initialFilters) {
      if (initialFilters.search) {
        setGlobalFilter(initialFilters.search);
      }
    }
  }, [initialFilters]);

  React.useEffect(() => {
    if (clearFilters && !initialFilters) {
      setGlobalFilter("");
      setColumnFilters([]);
      setAdvancedFilters({
        status: "",
        paymentStatus: "",
        orderSource: "",
        dateFrom: "",
        dateTo: "",
        amountMin: "",
        amountMax: ""
      });
    }
  }, [clearFilters, initialFilters]);

  const getUniqueValues = (key) => {
    const values = [...new Set(tableData.map(item => item[key]))].filter(Boolean);
    return values.sort();
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      status: "",
      paymentStatus: "",
      orderSource: "",
      dateFrom: "",
      dateTo: "",
      amountMin: "",
      amountMax: ""
    });
    setColumnFilters([]);
  };

  const createPages = (count) => {
    let arrPageCount = [];
    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }
    return arrPageCount;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const columns = [
    columnHelper.accessor("orderNumber", {
      id: "orderNumber",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ORDER NUMBER
        </p>
      ),
      cell: (info) => (
        <div className="text-sm font-mono text-brand-600 dark:text-brand-400 font-medium">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("customer", {
      id: "customer",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CUSTOMER
        </p>
      ),
      cell: (info) => {
        const customer = info.getValue();
        return (
          <div>
            <p className="text-sm font-semibold text-navy-700 dark:text-white">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {customer?.email}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("items", {
      id: "items",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ITEMS
        </p>
      ),
      cell: (info) => {
        const items = info.getValue();
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        return (
          <div>
            <p className="text-sm font-semibold text-navy-700 dark:text-white">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {items.length} product{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("totalAmount", {
      id: "totalAmount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TOTAL AMOUNT
        </p>
      ),
      cell: (info) => (
        <div className="text-sm font-bold text-navy-700 dark:text-white">
          ${info.getValue()}
        </div>
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
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
          </span>
        );
      },
    }),
    columnHelper.accessor("paymentStatus", {
      id: "paymentStatus",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PAYMENT
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(status)}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
          </span>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DATE
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
    columnHelper.accessor("actions", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => {
        const order = info.row.original;
        return (
          <ActionMenu 
            order={order}
            onViewClick={onViewClick}
            onEditClick={onEditClick}
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
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === advancedFilters.status.toLowerCase()
      );
    }
    
    if (advancedFilters.paymentStatus && advancedFilters.paymentStatus !== "") {
      filteredData = filteredData.filter(item => 
        item.paymentStatus.toLowerCase() === advancedFilters.paymentStatus.toLowerCase()
      );
    }
    
    if (advancedFilters.orderSource && advancedFilters.orderSource !== "") {
      filteredData = filteredData.filter(item => 
        item.orderSource.toLowerCase() === advancedFilters.orderSource.toLowerCase()
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
    
    if (advancedFilters.amountMin || advancedFilters.amountMax) {
      filteredData = filteredData.filter(item => {
        const amount = parseFloat(item.totalAmount);
        const minAmount = advancedFilters.amountMin ? parseFloat(advancedFilters.amountMin) : 0;
        const maxAmount = advancedFilters.amountMax ? parseFloat(advancedFilters.amountMax) : Infinity;
        
        return amount >= minAmount && amount <= maxAmount;
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
        <div className="flex w-full items-center justify-between pt-[20px]">
          <div className="flex items-center gap-4">
            <div className="flex h-[38px] w-[400px] items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
              <SearchIcon />
              <input
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                type="text"
                placeholder="Search orders...."
                className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white"
              />
            </div>
            
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-white rounded-lg transition-all duration-200"
              title="Advanced Filters"
            >
              <MdFilterList className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {showAdvancedFilters ? <MdExpandLess className="w-4 h-4" /> : <MdExpandMore className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showAdvancedFilters && (
          <div className="mt-4 p-6 bg-white/50 dark:bg-navy-800/30 rounded-xl border border-gray-100 dark:border-navy-700 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Status
                </label>
                <select
                  value={advancedFilters.status}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Status</option>
                  {getUniqueValues('status').map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Payment Status
                </label>
                <select
                  value={advancedFilters.paymentStatus}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Payment Status</option>
                  {getUniqueValues('paymentStatus').map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Order Source
                </label>
                <select
                  value={advancedFilters.orderSource}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, orderSource: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Sources</option>
                  {getUniqueValues('orderSource').map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={advancedFilters.dateFrom}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={advancedFilters.dateTo}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Min Amount ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.amountMin}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, amountMin: e.target.value }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Max Amount ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.amountMax}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, amountMax: e.target.value }))}
                  placeholder="999999"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-navy-700">
              <button
                onClick={clearAdvancedFilters}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <MdClear className="w-4 h-4" />
                Clear All
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {Object.values(advancedFilters).filter(value => value && value !== "").length > 0 && (
                  <span>
                    {Object.values(advancedFilters).filter(value => value && value !== "").length} filter
                    {Object.values(advancedFilters).filter(value => value && value !== "").length > 1 ? 's' : ''} applied
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

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

const AdminOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders, getUserOrders, updateOrderStatus, updatePaymentStatus, loading } = useOrderApiStore();
  const [processedOrders, setProcessedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const normalizeOrder = (order) => {
    return {
      _id: order._id,
      orderNumber: order.orderNumber,
      customer: order.userId,
      items: order.items || [],
      totalAmount: order.pricing?.totalAmount || 0,
      status: order.status,
      paymentStatus: order.paymentDetails?.paymentStatus,
      orderSource: order.orderSource,
      createdAt: order.createdAt,
      originalData: order
    };
  };

  const getFilteredOrders = () => {
    return processedOrders.filter(order => order.status === activeTab);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await getUserOrders();
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };
    
    fetchOrders();
  }, []);

  useEffect(() => {
    if (Array.isArray(orders) && orders.length >= 0) {
      const normalized = orders.map(normalizeOrder);
      setProcessedOrders(normalized);
    }
  }, [orders]);

  const handleViewOrder = (order) => {
    navigate(`/admin/main/orderManagement/order-detail/${order._id}`);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setNewPaymentStatus(order.paymentStatus);
    setNotes('');
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    
    try {
      setIsUpdating(true);
      
      if (newStatus !== selectedOrder.status) {
        await updateOrderStatus(selectedOrder._id, newStatus, notes);
      }
      
      if (newPaymentStatus !== selectedOrder.paymentStatus) {
        await updatePaymentStatus(selectedOrder._id, newPaymentStatus);
      }
      
      toast.success('Order status updated successfully');
      setShowStatusModal(false);
      setSelectedOrder(null);
      setNewStatus('');
      setNewPaymentStatus('');
      setNotes('');
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelUpdate = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    setNewStatus('');
    setNewPaymentStatus('');
    setNotes('');
    setIsUpdating(false);
  };

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
          Admin Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage and update order statuses (Admin only)
        </p>
      </div>

      <div className="mb-6">
        <CarouselTabs
          tabs={[
            { key: 'pending', label: 'Pending', count: processedOrders.filter(o => o.status === 'pending').length },
            { key: 'confirmed', label: 'Confirmed', count: processedOrders.filter(o => o.status === 'confirmed').length },
            { key: 'processing', label: 'Processing', count: processedOrders.filter(o => o.status === 'processing').length },
            { key: 'shipped', label: 'Shipped', count: processedOrders.filter(o => o.status === 'shipped').length },
            { key: 'delivered', label: 'Delivered', count: processedOrders.filter(o => o.status === 'delivered').length },
            { key: 'cancelled', label: 'Cancelled', count: processedOrders.filter(o => o.status === 'cancelled').length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {getFilteredOrders().length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-navy-700 mb-4">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No orders found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            There are currently no orders to display.
          </p>
        </div>
      ) : (
        <OrderTable 
          tableData={getFilteredOrders()} 
          onViewClick={handleViewOrder}
          onEditClick={handleEditOrder}
        />
      )}

      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                <MdEdit className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Update Order Status</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Update the status and payment status for this order.</p>
              </div>
            </div>
            
            <div className="mb-6 rounded-xl border border-gray-200 p-4 text-sm dark:border-white/10">
              <div className="font-semibold text-navy-700 dark:text-white">Order: {selectedOrder.orderNumber}</div>
              <div className="mt-1 text-gray-600 dark:text-gray-300">Customer: {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</div>
              <div className="text-gray-600 dark:text-gray-300">Amount: ${selectedOrder.totalAmount}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Status
              </label>
              <select
                value={newPaymentStatus}
                onChange={(e) => setNewPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this status update..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelUpdate} 
                disabled={isUpdating} 
                className={`rounded-xl px-5 py-3 text-sm ${isUpdating ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateStatus} 
                disabled={isUpdating} 
                className={`inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 ${isUpdating ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isUpdating && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
