import React, { useState, useEffect } from "react";
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { MdChevronRight, MdChevronLeft, MdFilterList, MdExpandMore, MdExpandLess, MdClear } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useProductApiStore from "stores/useProductApiStore";
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

// using backend only; removed dummy data

function ProductTable(props) {
  const { tableData, onAddClick, onEditClick, onDeleteClick, initialFilters, clearFilters } = props;
  const [columnFilters, setColumnFilters] = React.useState([]);
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState(initialFilters?.search || "");
  
  // Advanced filter states
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [advancedFilters, setAdvancedFilters] = React.useState({
    category: "",
    primeCategory: "",
    dateFrom: "",
    dateTo: "",
    priceMin: "",
    priceMax: "",
    discountedPriceMin: "",
    discountedPriceMax: "",
    sku: "",
    status: "",
    hasDiscount: ""
  });
  
  // Apply initial filters when component mounts
  React.useEffect(() => {
    if (initialFilters) {
      if (initialFilters.search) {
        setGlobalFilter(initialFilters.search);
      }
      if (initialFilters.category) {
        setColumnFilters([
          { id: 'category', value: initialFilters.category }
        ]);
      }
    }
  }, [initialFilters]);

  // Clear filters when clearFilters is called
  React.useEffect(() => {
    if (clearFilters && !initialFilters) {
      setGlobalFilter("");
      setColumnFilters([]);
      setAdvancedFilters({
        category: "",
        primeCategory: "",
        dateFrom: "",
        dateTo: "",
        priceMin: "",
        priceMax: "",
        discountedPriceMin: "",
        discountedPriceMax: "",
        sku: "",
        status: "",
        hasDiscount: ""
      });
    }
  }, [clearFilters, initialFilters]);

  // Get unique values for filter dropdowns
  const getUniqueValues = (key) => {
    const values = [...new Set(tableData.map(item => item[key]))].filter(Boolean);
    return values.sort();
  };

  // Apply advanced filters (this will trigger the useMemo above)
  const applyAdvancedFilters = () => {
    // The filtering is automatically applied via useMemo dependency on advancedFilters
    // This function can be used for additional actions if needed
  };

  // Clear advanced filters
  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      category: "",
      primeCategory: "",
      dateFrom: "",
      dateTo: "",
      priceMin: "",
      priceMax: "",
      discountedPriceMin: "",
      discountedPriceMax: "",
      sku: "",
      status: "",
      hasDiscount: ""
    });
    setColumnFilters([]);
  };

  // Custom filter function
  const customFilterFn = (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    
    switch (columnId) {
      case 'dateAdded':
        const rowDate = new Date(value);
        const dateFrom = advancedFilters.dateFrom ? new Date(advancedFilters.dateFrom) : null;
        const dateTo = advancedFilters.dateTo ? new Date(advancedFilters.dateTo) : null;
        
        if (dateFrom && dateTo) {
          return rowDate >= dateFrom && rowDate <= dateTo;
        } else if (dateFrom) {
          return rowDate >= dateFrom;
        } else if (dateTo) {
          return rowDate <= dateTo;
        }
        return true;
        
      case 'price':
        const price = parseFloat(value);
        const priceMin = advancedFilters.priceMin ? parseFloat(advancedFilters.priceMin) : null;
        const priceMax = advancedFilters.priceMax ? parseFloat(advancedFilters.priceMax) : null;
        
        if (priceMin && priceMax) {
          return price >= priceMin && price <= priceMax;
        } else if (priceMin) {
          return price >= priceMin;
        } else if (priceMax) {
          return price <= priceMax;
        }
        return true;
        
      case 'discountedPrice':
        const discountedPrice = parseFloat(value || 0);
        const discPriceMin = advancedFilters.discountedPriceMin ? parseFloat(advancedFilters.discountedPriceMin) : null;
        const discPriceMax = advancedFilters.discountedPriceMax ? parseFloat(advancedFilters.discountedPriceMax) : null;
        
        if (discPriceMin && discPriceMax) {
          return discountedPrice >= discPriceMin && discountedPrice <= discPriceMax;
        } else if (discPriceMin) {
          return discountedPrice >= discPriceMin;
        } else if (discPriceMax) {
          return discountedPrice <= discPriceMax;
        }
        return true;
        
      case 'hasDiscount':
        const hasDiscount = row.original.discountedPrice && row.original.discountedPrice < row.original.price;
        if (filterValue === "yes") return hasDiscount;
        if (filterValue === "no") return !hasDiscount;
        return true;
        
      case 'sku':
        return value.toLowerCase().includes(filterValue.toLowerCase());
        
      default:
        return value.toLowerCase().includes(filterValue.toLowerCase());
    }
  };

  const createPages = (count) => {
    let arrPageCount = [];
    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }
    return arrPageCount;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" };
    if (stock < 10) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" };
    return { text: "In Stock", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" };
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PRODUCT ID
        </p>
      ),
      cell: (info) => {
        const value = info.getValue();
        const fullId = value != null ? String(value) : '';
        const truncatedId = fullId.length > 8 ? `${fullId.substring(0, 8)}...` : (fullId || '-');
        
        const copyToClipboard = () => {
          navigator.clipboard.writeText(fullId);
          // You could add a toast notification here
        };

        return (
          <div className="flex items-center gap-2">
            <span 
              className="text-sm font-mono text-brand-600 dark:text-brand-400 cursor-pointer hover:text-brand-700 dark:hover:text-brand-300"
              onClick={fullId ? copyToClipboard : undefined}
              title={fullId ? `Full ID: ${fullId} (Click to copy)` : 'No ID'}
            >
              {truncatedId}
            </span>
            <button
              onClick={copyToClipboard}
              className="opacity-50 hover:opacity-100 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy full ID"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        );
      },
    }),
    columnHelper.accessor("sku", {
      id: "sku",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SKU
        </p>
      ),
      cell: (info) => (
        <div className="text-sm font-mono text-navy-700 dark:text-white font-medium">
          {info.getValue()}
      </div>
      ),
    }),
    columnHelper.accessor("image", {
      id: "image",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PRODUCT IMAGE
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <img
            src={info.getValue()}
            alt="Product"
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PRODUCT TITLE
        </p>
      ),
      cell: (info) => (
        <div className="max-w-xs">
          <div className="text-sm font-semibold text-navy-700 dark:text-white leading-5 line-clamp-3">
            {info.getValue()}
          </div>
      </div>
      ),
    }),
    columnHelper.accessor("category", {
      id: "category",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">CATEGORY</p>
      ),
      cell: (info) => (
        <div>
          {(() => {
            const value = info.getValue();
            const original = info.row.original;
            const renderPath = (val) => {
              if (!val) return '';
              if (typeof val === 'string') return val;
              if (typeof val === 'object') {
                const pc = val.primeCategory?.name || val.primeCategory || '';
                const c = val.category?.name || val.category || '';
                const sc = val.subCategory?.name || val.subCategory || val.subcategory || '';
                const parts = [c].filter(Boolean);
                return parts.join('');
              }
              return String(val);
            };
            const renderPrime = (val) => {
              if (!val) return '';
              if (typeof val === 'string') return val;
              if (typeof val === 'object') {
                return val.name || '';
              }
              return String(val);
            };
            // category title
            const categoryTitle = renderPath(value) || renderPath(original.category);
            // primeCategory subtitle
            const primeSubtitle = renderPrime(original.primeCategory) || (typeof value === 'object' ? renderPrime(value.primeCategory) : '');
            return (
              <>
                <p className="text-sm font-bold text-navy-700 dark:text-white">{categoryTitle || '-'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{primeSubtitle}</p>
              </>
            );
          })()}
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PRICE</p>
      ),
      cell: (info) => (
        <div>
          {info.row.original.discountedPrice ? (
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                ${info.row.original.discountedPrice}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 line-through">
                ${info.getValue()}
              </p>
                          </div>
          ) : (
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              ${info.getValue()}
            </p>
          )}
                          </div>
      ),
    }),
   
    columnHelper.accessor("stock", {
      id: "stock",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STOCK</p>
      ),
      cell: (info) => {
        const stock = info.getValue();
        const stockStatus = getStockStatus(stock);
        return (
          <div>
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {stock} units
            </p>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
              {stockStatus.text}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("dateAdded", {
      id: "dateAdded",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE ADDED</p>
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
      cell: (info) => (
                          <div className="flex items-center gap-2">
                            <button
            onClick={() => {
              onEditClick(info.row.original);
            }}
                              className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-150"
                              title="Edit Product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
            onClick={() => onDeleteClick && onDeleteClick(info.row.original)}
                              className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150"
                              title="Delete Product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <button
                              className="inline-flex items-center justify-center w-8 h-8 text-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-150"
                              title="View Details"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
      ),
    }),
  ];
  
  const [data, setData] = React.useState(() => [...defaultData]);
  
  // Update data when tableData prop changes
  React.useEffect(() => {
    setData([...tableData]);
  }, [tableData]);
  
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // Custom filter function for complex filters
  React.useMemo(() => {
    // Apply complex filters manually to the data
    let filteredData = [...defaultData];
    
    // Apply advanced filters
    if (advancedFilters.category && advancedFilters.category !== "") {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase().includes(advancedFilters.category.toLowerCase())
      );
    }
    
    if (advancedFilters.primeCategory && advancedFilters.primeCategory !== "") {
      filteredData = filteredData.filter(item => 
        item.primeCategory.toLowerCase().includes(advancedFilters.primeCategory.toLowerCase())
      );
    }
    
    if (advancedFilters.sku && advancedFilters.sku !== "") {
      filteredData = filteredData.filter(item => 
        item.sku.toLowerCase().includes(advancedFilters.sku.toLowerCase())
      );
    }
    
    if (advancedFilters.status && advancedFilters.status !== "") {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === advancedFilters.status.toLowerCase()
      );
    }
    
    // Date range filter
    if (advancedFilters.dateFrom || advancedFilters.dateTo) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.dateAdded);
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
    
    // Price range filter
    if (advancedFilters.priceMin || advancedFilters.priceMax) {
      filteredData = filteredData.filter(item => {
        const price = parseFloat(item.price);
        const minPrice = advancedFilters.priceMin ? parseFloat(advancedFilters.priceMin) : 0;
        const maxPrice = advancedFilters.priceMax ? parseFloat(advancedFilters.priceMax) : Infinity;
        
        return price >= minPrice && price <= maxPrice;
      });
    }
    
    // Discounted price range filter
    if (advancedFilters.discountedPriceMin || advancedFilters.discountedPriceMax) {
      filteredData = filteredData.filter(item => {
        const discountedPrice = parseFloat(item.discountedPrice || 0);
        const minDiscPrice = advancedFilters.discountedPriceMin ? parseFloat(advancedFilters.discountedPriceMin) : 0;
        const maxDiscPrice = advancedFilters.discountedPriceMax ? parseFloat(advancedFilters.discountedPriceMax) : Infinity;
        
        if (item.discountedPrice) {
          return discountedPrice >= minDiscPrice && discountedPrice <= maxDiscPrice;
        }
        return minDiscPrice === 0; // Show items without discount only if min is 0
      });
    }
    
    // Has discount filter
    if (advancedFilters.hasDiscount && advancedFilters.hasDiscount !== "") {
      filteredData = filteredData.filter(item => {
        const hasDiscount = item.discountedPrice && item.discountedPrice < item.price;
        if (advancedFilters.hasDiscount === "yes") return hasDiscount;
        if (advancedFilters.hasDiscount === "no") return !hasDiscount;
        return true;
      });
    }
    
    // Stock status filter
    if (advancedFilters.stockStatus && advancedFilters.stockStatus !== "") {
      filteredData = filteredData.filter(item => {
        const stock = item.stock;
        const status = advancedFilters.stockStatus;
        
        if (status === "out-of-stock") return stock === 0;
        if (status === "low-stock") return stock > 0 && stock < 10;
        if (status === "in-stock") return stock >= 10;
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
        <div className="flex w-full items-center justify-between pt-[20px]">
          <div className="flex items-center gap-4">
            <div className="flex h-[38px] w-[400px] items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
              <SearchIcon />
              <input
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                type="text"
                placeholder="Search products...."
                className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white"
              />
            </div>
            
            {/* Advanced Filter Toggle */}
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
          
          {onAddClick && (
            <button
              onClick={onAddClick}
              className="flex items-center justify-center w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Add Product"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="mt-4 p-6 bg-white/50 dark:bg-navy-800/30 rounded-xl border border-gray-100 dark:border-navy-700 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Category
                </label>
                <select
                  value={advancedFilters.category}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Categories</option>
                  {getUniqueValues('category').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Prime Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Prime Category
                </label>
                <select
                  value={advancedFilters.primeCategory}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, primeCategory: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Prime Categories</option>
                  {getUniqueValues('primeCategory').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* SKU Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={advancedFilters.sku}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Enter SKU..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Status Filter */}
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

              {/* Date From */}
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

              {/* Date To */}
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

              {/* Price Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Min Price ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.priceMin}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Price Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.priceMax}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                  placeholder="999999"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Discounted Price Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Min Discounted Price ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.discountedPriceMin}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, discountedPriceMin: e.target.value }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Discounted Price Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Max Discounted Price ($)
                </label>
                <input
                  type="number"
                  value={advancedFilters.discountedPriceMax}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, discountedPriceMax: e.target.value }))}
                  placeholder="999999"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Has Discount Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Has Discount
                </label>
                <select
                  value={advancedFilters.hasDiscount}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, hasDiscount: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Products</option>
                  <option value="yes">With Discount</option>
                  <option value="no">Without Discount</option>
                </select>
              </div>

              {/* Stock Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Stock Status
                </label>
                <select
                  value={advancedFilters.stockStatus}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, stockStatus: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                >
                  <option value="">All Stock Levels</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-navy-700">
              <button
                onClick={applyAdvancedFilters}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                Apply Filters
              </button>
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
          {/* pagination */}
          <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
            {/* left side */}
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-700">
                Showing {pageSize} rows per page
              </p>
            </div>
            {/* right side */}
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

const ProductManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentCategoryContext, setCurrentCategoryContext] = useState(null);

  const { products: apiProducts, getAllProducts, deleteProduct, loading } = useProductApiStore();
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getFirstImageUrl = (p) => {
    if (!p) return '';
    // New backend shape: media: { coverImage, images: [] }
    if (p.media) {
      if (typeof p.media.coverImage === 'string' && p.media.coverImage) return p.media.coverImage;
      const img0 = Array.isArray(p.media.images) ? p.media.images[0] : null;
      if (typeof img0 === 'string' && img0) return img0;
      if (img0 && typeof img0 === 'object') {
        return img0.url || img0.location || img0.secure_url || img0.path || img0.preview || '';
      }
    }
    if (typeof p.image === 'string' && p.image) return p.image;
    if (typeof p.coverImage === 'string' && p.coverImage) return p.coverImage;
    if (typeof p.thumbnail === 'string' && p.thumbnail) return p.thumbnail;
    const img = Array.isArray(p.images) ? p.images[0] : null;
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.url || img.location || img.secure_url || img.path || img.preview || '';
  };

  const normalizeProduct = (p) => {
    const normalizeId = (val) => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object' && val.$oid) return val.$oid;
      return String(val);
    };
    const normalizeDate = (val) => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object' && val.$date) return val.$date;
      return String(val);
    };
    const basePrice = Number((p.pricing && (p.pricing.basePrice ?? p.pricing.price)) ?? p.price ?? 0) || 0;
    const discountPercent = Number(p.pricing?.discountPercent ?? 0) || 0;
    const discountedPrice = discountPercent > 0 ? Number((basePrice * (1 - discountPercent / 100)).toFixed(2)) : null;

    return {
      id: normalizeId(p._id) || p.id || normalizeId(p.id),
      sku: p.sku || '',
      name: p.name || p.title || '',
      description: p.description || '',
      image: getFirstImageUrl(p),
      category: (p.category && (p.category.category || p.category.name)) || p.category || '',
      primeCategory: (p.category && (p.category.primeCategory || p.category.primeCategory?.name)) || p.primeCategory || '',
      price: basePrice,
      discountedPrice,
      stock: Array.isArray(p.variants) ? p.variants.length : (p.stock || 0),
      dateAdded: normalizeDate(p.dateAdded || p.createdAt),
      status: p.status || 'Active',
    };
  };

  useEffect(() => {
    getAllProducts().catch(() => {
      setProducts([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep products in sync with API store
  useEffect(() => {
    if (Array.isArray(apiProducts) && apiProducts.length >= 0) {
      const normalized = apiProducts.map(normalizeProduct);
      setProducts(normalized);
    }
  }, [apiProducts]);

  // Extract category context from navigation state
  const categoryContext = location.state?.categoryContext;
  
  // Set initial category context
  React.useEffect(() => {
    if (categoryContext) {
      setCurrentCategoryContext(categoryContext);
    }
  }, [categoryContext]);
  
  // Create initial filters based on category context
  const getInitialFilters = () => {
    if (!currentCategoryContext) return null;
    
    const filters = {};
    
    // Set search filter to category name for easier filtering
    if (currentCategoryContext.category) {
      filters.search = currentCategoryContext.category.name;
    }
    
    return Object.keys(filters).length > 0 ? filters : null;
  };

  const initialFilters = getInitialFilters();

  // Function to clear all filters
  const clearFilters = () => {
    setCurrentCategoryContext(null);
    // Clear browser history state as well
    window.history.replaceState({}, '', location.pathname);
  };

  // Function to handle edit product navigation
  const handleEditProduct = (product) => {
    navigate(`/admin/main/marketsphere/product-settings/${product.id}`);
  };

  // Function to handle opening add product modal
  const handleOpenAddModal = () => {
    navigate('/admin/main/marketsphere/new-product');
  };

  const handleRequestDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      setIsDeleting(true);
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      toast.success('Product deleted successfully');
    } catch (e) {
      toast.error(e?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Check for new product from navigation state
  React.useEffect(() => {
    if (location.state?.newProduct) {
      const normalized = normalizeProduct(location.state.newProduct);
      setProducts(prevProducts => [normalized, ...prevProducts]);
      if (location.state.message) {
        // Optional: Clear the state to prevent re-adding on refresh
        window.history.replaceState({}, '', location.pathname);
      }
    }
  }, [location.state]);

  // Create a unique key to force ProductTable re-render when context changes
  const tableKey = currentCategoryContext 
    ? `${currentCategoryContext.primeCategory?.id}-${currentCategoryContext.category?.id}`
    : 'no-filter';

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      {/* Filter Context Header */}
      {currentCategoryContext && (
        <div className="mb-4 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
              Filtered by: {currentCategoryContext.primeCategory?.name} → {currentCategoryContext.category?.name}
            </span>
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Clear Filter
            </button>
        </div>
      </div>
      )}

      {/* Products Table */}
      <ProductTable 
        key={tableKey}
        tableData={products} 
        onAddClick={handleOpenAddModal}
        onEditClick={handleEditProduct}
        onDeleteClick={handleRequestDelete}
        initialFilters={initialFilters}
        clearFilters={clearFilters}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-7 0h8l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7h1"/></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Delete Product</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Are you sure you want to delete this product? This action cannot be undone.</p>
              </div>
            </div>
            {productToDelete && (
              <div className="mb-6 rounded-xl border border-gray-200 p-4 text-sm dark:border-white/10">
                <div className="font-semibold text-navy-700 dark:text-white">{productToDelete.name || 'Untitled'}</div>
                <div className="mt-1 text-gray-600 dark:text-gray-300">SKU: {productToDelete.sku || '-'}</div>
                <div className="text-gray-600 dark:text-gray-300">ID: {productToDelete.id}</div>
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} disabled={isDeleting} className={`rounded-xl px-5 py-3 text-sm ${isDeleting ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}>Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className={`inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 ${isDeleting ? 'cursor-not-allowed opacity-80' : ''}`}>
                {isDeleting && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
