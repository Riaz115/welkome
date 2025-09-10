import React, { useState, useEffect } from "react";
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { MdChevronRight, MdChevronLeft, MdFilterList, MdExpandMore, MdExpandLess, MdClear, MdCheck, MdClose, MdMoreVert } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useProductApiStore from "stores/useProductApiStore";
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

const ActionMenu = ({ product, canEdit, canDelete, canApproveReject, onViewClick, onEditClick, onDeleteClick, onApproveClick, onRejectClick, canEditProduct, canDeleteProduct }) => {
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
              onViewClick && onViewClick(product);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
          
          {canEdit && (
            <button
              onClick={() => {
                setShowMenu(false);
                onEditClick && onEditClick(product);
              }}
              className="w-full px-4 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Product
            </button>
          )}
          
          {canApproveReject && product.status === 'pending' && (
            <>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onApproveClick && onApproveClick(product);
                }}
                className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-2"
              >
                <MdCheck className="w-4 h-4" />
                Approve Product
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRejectClick && onRejectClick(product);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <MdClose className="w-4 h-4" />
                Reject Product
              </button>
            </>
          )}
          
          
          {canDelete && (
            <button
              onClick={() => {
                setShowMenu(false);
                onDeleteClick && onDeleteClick(product);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

function ProductTable(props) {
  const { tableData, onAddClick, onEditClick, onDeleteClick, onApproveClick, onRejectClick, onViewClick, initialFilters, clearFilters, canEditProduct, canDeleteProduct } = props;
  const { user } = useAuthStore();
  const [columnFilters, setColumnFilters] = React.useState([]);
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState(initialFilters?.search || "");
  
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

  const getUniqueValues = (key) => {
    const values = [...new Set(tableData.map(item => item[key]))].filter(Boolean);
    return values.sort();
  };

  const applyAdvancedFilters = () => {
  };

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
            const categoryTitle = renderPath(value) || renderPath(original.category);
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
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
          }
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
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
        const product = info.row.original;
        const canEdit = canEditProduct(product);
        const canDelete = canDeleteProduct(product);
        const canApproveReject = user?.role === 'admin';
        
        return (
          <ActionMenu 
            product={product}
            canEdit={canEdit}
            canDelete={canDelete}
            canApproveReject={canApproveReject}
            onViewClick={onViewClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onApproveClick={onApproveClick}
            onRejectClick={onRejectClick}
            canEditProduct={canEditProduct}
            canDeleteProduct={canDeleteProduct}
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
    pageSize: 5,
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
    
    if (advancedFilters.priceMin || advancedFilters.priceMax) {
      filteredData = filteredData.filter(item => {
        const price = parseFloat(item.price);
        const minPrice = advancedFilters.priceMin ? parseFloat(advancedFilters.priceMin) : 0;
        const maxPrice = advancedFilters.priceMax ? parseFloat(advancedFilters.priceMax) : Infinity;
        
        return price >= minPrice && price <= maxPrice;
      });
    }
    
    if (advancedFilters.discountedPriceMin || advancedFilters.discountedPriceMax) {
      filteredData = filteredData.filter(item => {
        const discountedPrice = parseFloat(item.discountedPrice || 0);
        const minDiscPrice = advancedFilters.discountedPriceMin ? parseFloat(advancedFilters.discountedPriceMin) : 0;
        const maxDiscPrice = advancedFilters.discountedPriceMax ? parseFloat(advancedFilters.discountedPriceMax) : Infinity;
        
        if (item.discountedPrice) {
          return discountedPrice >= minDiscPrice && discountedPrice <= maxDiscPrice;
        }
        return minDiscPrice === 0;
      });
    }
    
    if (advancedFilters.hasDiscount && advancedFilters.hasDiscount !== "") {
      filteredData = filteredData.filter(item => {
        const hasDiscount = item.discountedPrice && item.discountedPrice < item.price;
        if (advancedFilters.hasDiscount === "yes") return hasDiscount;
        if (advancedFilters.hasDiscount === "no") return !hasDiscount;
        return true;
      });
    }
    
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

        {showAdvancedFilters && (
          <div className="mt-4 p-6 bg-white/50 dark:bg-navy-800/30 rounded-xl border border-gray-100 dark:border-navy-700 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

const ProductManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentCategoryContext, setCurrentCategoryContext] = useState(null);
  const { user } = useAuthStore();

  const { products: apiProducts, getAllProducts, getSellerProducts, deleteProduct, approveProduct, rejectProduct, loading } = useProductApiStore();
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [productToReject, setProductToReject] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const getFirstImageUrl = (p) => {
    if (!p) return '';
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
    
    const basePrice = Number(p.price || p.pricing?.basePrice || 0) || 0;
    const discountPercent = Number(p.discount || p.pricing?.discountPercent || 0) || 0;
    const discountedPrice = discountPercent > 0 ? Number(p.finalPrice || (basePrice * (1 - discountPercent / 100)).toFixed(2)) : null;
    
    const totalStock = Array.isArray(p.variants) ? p.variants.reduce((sum, variant) => sum + Number(variant.stock || 0), 0) : 0;

    return {
      id: normalizeId(p._id) || p.id || normalizeId(p.id),
      sku: p.sku || '',
      name: p.title || p.name || '',
      description: p.description || '',
      image: getFirstImageUrl(p),
      category: (p.category && (p.category.category || p.category.name)) || p.category || '',
      primeCategory: (p.category && (p.category.primeCategory || p.category.primeCategory?.name)) || p.primeCategory || '',
      price: basePrice,
      discountedPrice,
      stock: totalStock,
      dateAdded: normalizeDate(p.createdAt || p.dateAdded),
      status: p.status || 'pending',
      rejectionReason: p.rejectionReason || '',
      creator: p.creator || null,
      brand: p.brand || '',
      tags: p.tags || [],
      variants: p.variants || [],
      originalData: p
    };
  };

  const canEditProduct = (product) => {
    if (!product) return false;
    
    const creatorId = product.creator?.id?.$oid || product.creator?.id;
    if (!creatorId) return false;
    
    const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id || currentUser._id;
    
    return creatorId === userId;
  };

  const canDeleteProduct = (product) => {
    if (!product) return false;
    
    const creatorId = product.creator?.id?.$oid || product.creator?.id;
    if (!creatorId) return false;
    
    const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id || currentUser._id;
    
    return creatorId === userId;
  };

  const canApproveReject = (product) => {
    return user?.role === 'admin';
  };

  const getFilteredProducts = () => {
    if (activeTab === 'all') return products;
    if (activeTab === 'admin') {
      return products.filter(product => {
        const creatorId = product.creator?.id?.$oid || product.creator?.id;
        const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
        const userId = currentUser.id || currentUser._id;
        return creatorId === userId;
      });
    }
    return products.filter(product => product.status === activeTab);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.role === 'seller') {
          const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
          const userId = currentUser.id || currentUser._id;
          await getSellerProducts(userId);
        } else {
          await getAllProducts();
        }
      } catch (error) {
        setProducts([]);
      }
    };
    
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (Array.isArray(apiProducts) && apiProducts.length >= 0) {
      const normalized = apiProducts.map(normalizeProduct);
      setProducts(normalized);
    }
  }, [apiProducts]);

  const categoryContext = location.state?.categoryContext;
  
  React.useEffect(() => {
    if (categoryContext) {
      setCurrentCategoryContext(categoryContext);
    }
  }, [categoryContext]);
  
  const getInitialFilters = () => {
    if (!currentCategoryContext) return null;
    
    const filters = {};
    
    if (currentCategoryContext.category) {
      filters.search = currentCategoryContext.category.name;
    }
    
    return Object.keys(filters).length > 0 ? filters : null;
  };

  const initialFilters = getInitialFilters();

  const clearFilters = () => {
    setCurrentCategoryContext(null);
    window.history.replaceState({}, '', location.pathname);
  };

  const handleEditProduct = (product) => {
    navigate(`/admin/main/marketsphere/product-settings/${product.id}`);
  };

  const handleOpenAddModal = () => {
    navigate('/admin/main/marketsphere/new-product');
  };

  const handleViewProduct = (product) => {
    navigate(`/admin/main/marketsphere/product-view/${product.id}`, { state: { product: product.originalData } });
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

  const handleApproveProduct = async (product) => {
    try {
      await approveProduct(product.id);
      setProducts((prev) => prev.map(p => 
        p.id === product.id ? { ...p, status: 'approved', rejectionReason: '' } : p
      ));
      toast.success('Product approved successfully');
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const handleRejectProduct = (product) => {
    setProductToReject(product);
    setRejectionReason('');
    setShowRejectModal(true);
  };


  const cancelReject = () => {
    setShowRejectModal(false);
    setProductToReject(null);
    setRejectionReason('');
    setIsRejecting(false);
  };

  const confirmReject = async () => {
    if (!productToReject || !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    try {
      setIsRejecting(true);
      await rejectProduct(productToReject.id, rejectionReason);
      setProducts((prev) => prev.map(p => 
        p.id === productToReject.id ? { ...p, status: 'rejected', rejectionReason } : p
      ));
      toast.success('Product rejected successfully');
    } catch (error) {
      toast.error('Failed to reject product');
    } finally {
      setIsRejecting(false);
      setShowRejectModal(false);
      setProductToReject(null);
      setRejectionReason('');
    }
  };

  React.useEffect(() => {
    if (location.state?.newProduct) {
      const normalized = normalizeProduct(location.state.newProduct);
      setProducts(prevProducts => [normalized, ...prevProducts]);
      if (location.state.message) {
        window.history.replaceState({}, '', location.pathname);
      }
    }
  }, [location.state]);

  const tableKey = currentCategoryContext 
    ? `${currentCategoryContext.primeCategory?.id}-${currentCategoryContext.category?.id}`
    : 'no-filter';

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
          {user?.role === 'seller' ? 'My Products' : 'Product Management'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {user?.role === 'seller' 
            ? 'Manage your product listings and inventory' 
            : 'Manage all products in the marketplace'
          }
        </p>
      </div>
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

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-navy-700 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All Products', count: products.length },
            { key: 'pending', label: 'Pending', count: products.filter(p => p.status === 'pending').length },
            { key: 'approved', label: 'Approved', count: products.filter(p => p.status === 'approved').length },
            { key: 'rejected', label: 'Rejected', count: products.filter(p => p.status === 'rejected').length },
            ...(user?.role === 'admin' ? [{ key: 'admin', label: 'Admin Products', count: products.filter(p => {
              const creatorId = p.creator?.id?.$oid || p.creator?.id;
              const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
              const userId = currentUser.id || currentUser._id;
              return creatorId === userId;
            }).length }] : []),
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-navy-600 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {getFilteredProducts().length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-navy-700 mb-4">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activeTab === 'all' ? 'No products found' : 
             activeTab === 'admin' ? 'No admin products found' : 
             `No ${activeTab} products`}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {activeTab === 'all' 
              ? 'Get started by adding your first product to the marketplace.'
              : activeTab === 'admin'
              ? 'You haven\'t created any products yet.'
              : `There are currently no products with ${activeTab} status.`
            }
          </p>
          {user?.role === 'admin' && (
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Product
            </button>
          )}
        </div>
      ) : (
        <ProductTable 
          key={tableKey}
          tableData={getFilteredProducts()} 
          onAddClick={handleOpenAddModal}
          onEditClick={handleEditProduct}
          onDeleteClick={handleRequestDelete}
          onApproveClick={handleApproveProduct}
          onRejectClick={handleRejectProduct}
          onViewClick={handleViewProduct}
          initialFilters={initialFilters}
          clearFilters={clearFilters}
          canEditProduct={canEditProduct}
          canDeleteProduct={canDeleteProduct}
        />
      )}

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

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                <MdClose className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Reject Product</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Please provide a reason for rejecting this product.</p>
              </div>
            </div>
            {productToReject && (
              <div className="mb-6 rounded-xl border border-gray-200 p-4 text-sm dark:border-white/10">
                <div className="font-semibold text-navy-700 dark:text-white">{productToReject.name || 'Untitled'}</div>
                <div className="mt-1 text-gray-600 dark:text-gray-300">SKU: {productToReject.sku || '-'}</div>
                <div className="text-gray-600 dark:text-gray-300">ID: {productToReject.id}</div>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejecting this product..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelReject} 
                disabled={isRejecting} 
                className={`rounded-xl px-5 py-3 text-sm ${isRejecting ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}
              >
                Cancel
              </button>
              <button 
                onClick={confirmReject} 
                disabled={isRejecting || !rejectionReason.trim()} 
                className={`inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 ${isRejecting || !rejectionReason.trim() ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isRejecting && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isRejecting ? 'Rejecting...' : 'Reject Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
