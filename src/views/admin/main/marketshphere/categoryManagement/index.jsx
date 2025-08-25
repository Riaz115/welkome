import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCategoryApiStore } from "../../../../../stores/useCategoryApiStore";
import { MdMoreVert, MdEdit, MdDelete, MdArrowForward } from 'react-icons/md';
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

const columnHelper = createColumnHelper();

// Function to generate random serial number
const generateSerialNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  // Generate 2-3 random letters
  let serialLetters = '';
  const letterCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 letters
  for (let i = 0; i < letterCount; i++) {
    serialLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Generate 4-6 random numbers
  let serialNumbers = '';
  const numberCount = Math.floor(Math.random() * 3) + 4; // 4 to 6 numbers
  for (let i = 0; i < numberCount; i++) {
    serialNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return serialLetters + serialNumbers;
};

function CategoryTable(props) {
  const { 
    tableData, 
    onAddClick, 
    onRowClick, 
    onDelete, 
    title, 
    tableType = "prime", 
    navigate, 
    categoryContext,
    // Edit modal props
    setItemToEdit,
    setIsEditMode,
    setModalType,
    setFormData,
    setImagePreview,
    setShowAddModal,
    selectedPrimeCategory,
    selectedCategory
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (rowIndex) => {
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  };



  const [columnFilters, setColumnFilters] = React.useState([]);
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState("");
  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  // Define columns based on table type
  const getColumns = () => {
    if (tableType === "subcategory")
    {
      return [
        columnHelper.accessor("serialNumber", {
          id: "serialNumber",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              SERIAL NO.
            </p>
          ),
          cell: (info) => (
            <div
                onClick={() => {
                  if (navigate) {
                    navigate('/admin/main/marketsphere/product-management', {
                      state: { categoryContext }
                    });
                  }
                }}
                className="text-sm font-bold text-navy-700 dark:text-white hover:underline cursor-pointer">
              {info.getValue()}
            </div>
          ),
        }),
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
                alt="Product"
                className="h-12 w-12 rounded-lg object-cover shadow-sm"
              />
            </div>
          ),
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              TITLE
            </p>
          ),
          cell: (info) => (
            <div
                onClick={() => {
                  if (navigate) {
                    navigate('/admin/main/marketsphere/product-management', {
                      state: { categoryContext }
                    });
                  }
                }}
                className="font-medium text-navy-700 dark:text-white hover:underline cursor-pointer">
              {info.getValue()}
            </div>
          ),
        }),
        columnHelper.accessor("totalProducts", {
          id: "totalProducts",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">PRODUCT COUNT</p>
          ),
          cell: (info) => (
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
          ),
        }),
        columnHelper.accessor("stockStatus", {
          id: "stockStatus",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">STOCK STATUS</p>
          ),
          cell: (info) => (
            <div
              className={`flex h-7 w-[110px] items-center justify-center text-sm ${
                info.getValue() === "In Stock"
                  ? "bg-green-100 dark:bg-green-50"
                  : "bg-red-100 dark:bg-red-50"
              } rounded-[10px] text-base font-bold `}
            >
              <div
                className={`${
                  info.getValue() === "In Stock"
                    ? "text-green-500 "
                    : "text-red-500"
                } uppercase `}
              >
                {info.getValue()}
              </div>
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
          cell: (info) => (
            <div
              className={`flex h-7 w-[110px] items-center justify-center text-sm ${
                info.getValue() === "Active"
                  ? "bg-green-100 dark:bg-green-50"
                  : "bg-red-100 dark:bg-red-50"
              } rounded-[10px] text-base font-bold `}
            >
              <div
                className={`${
                  info.getValue() === "Active"
                    ? "text-green-500 "
                    : "text-red-500"
                } uppercase `}
              >
                {info.getValue()}
              </div>
            </div>
          ),
        }),
        // columnHelper.accessor("actions", {
        //   id: "actions",
        //   header: () => (
        //     <p className="text-sm font-bold text-gray-600 dark:text-white">
        //       ACTIONS
        //     </p>
        //   ),
        //   cell: (info) => (
        //     <div className="flex items-center gap-2">
        //       <button
        //         onClick={() => {
        //           // Open edit modal with pre-filled data
        //           const item = info.row.original;
        //           setItemToEdit(item);
        //           setIsEditMode(true);
        //           setModalType('subcategory');
        //           setFormData({
        //             name: item.name || '',
        //             serialNumber: item.serialNumber || '',
        //             price: item.totalProducts || '',
        //             stockStatus: item.stockStatus || 'In Stock'
        //           });
        //           setImagePreview(item.image || null);
        //           setShowAddModal(true);
        //         }}
        //         className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-150"
        //         title="Edit Subcategory"
        //       >
        //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        //         </svg>
        //       </button>
        //       <button
        //         onClick={() => {
        //           if (onDelete) {
        //             onDelete(info.row.original, 'subcategory');
        //           } else {
        //             console.log("Delete subcategory:", info.row.original);
        //           }
        //         }}
        //         className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150"
        //         title="Delete Subcategory"
        //       >
        //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        //         </svg>
        //       </button>
        //       <button
        //         onClick={() => {
        //           if (navigate) {
        //             navigate('/admin/main/marketsphere/product-management', { state: { categoryContext } });
        //           }
        //         }}
        //         className="inline-flex items-center justify-center w-8 h-8 text-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-150"
        //         title="View Products"
        //       >
        //         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        //         </svg>
        //       </button>
        //     </div>
        //   ),
        // }),
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
                    <div className="absolute left-0 top-10 z-50 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-navy-800">
                      <div className="px-0.5">
                        <button
                            className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                            onClick={() => {
                              const item = info.row.original;
                              setItemToEdit(item);
                              setIsEditMode(true);
                              setModalType('subcategory');
                              setFormData({
                                name: item.name || '',
                                serialNumber: item.serialNumber || '',
                                price: item.totalProducts || '',
                                stockStatus: item.stockStatus || 'In Stock'
                              });
                              setImagePreview(item.image || null);
                              setShowAddModal(true);
                            }}
                        >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                <MdEdit className="h-3 w-3" />
              </span>
                          Update
                        </button>

                        <button
                            className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            onClick={() => {
                              if (onDelete) {
                                onDelete(info.row.original, 'subcategory');
                              } else {
                                console.log("Delete subcategory:", info.row.original);
                              }
                            }}
                        >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                <MdDelete className="h-3 w-3" />
              </span>
                          Delete
                        </button>

                        <div className="mx-2 my-0.5 h-px bg-gray-200 dark:bg-gray-600"></div>

                        <button
                            className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                            onClick={() => {
                              if (navigate) {
                                navigate('/admin/main/marketsphere/product-management', {
                                  state: { categoryContext }
                                });
                              }
                            }}
                        >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                <MdArrowForward className="h-3 w-3" />
              </span>
                          Go to Products
                        </button>
                      </div>
                    </div>
                )}
              </div>
          )
        }),
    ];
    }
    else {
      return [
        columnHelper.accessor("serialNumber", {
          id: "serialNumber",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              SERIAL NO.
            </p>
          ),
          cell: (info) => (
            <p
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(info.row.original);
                  }
                }}
                className="text-sm font-bold text-navy-700 dark:text-white hover:underline cursor-pointer">
              {info.getValue()}
            </p>
          ),
        }),
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
                alt="Category"
                className="h-12 w-12 rounded-lg object-cover shadow-sm"
              />
            </div>
          ),
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              TITLE
            </p>
          ),
          cell: (info) => (
            <div
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(info.row.original);
                  }
                }}
                className="font-medium text-navy-700 dark:text-white hover:underline cursor-pointer">
              {info.getValue()}
            </div>
          ),
        }),
        columnHelper.accessor("categoryCount", {
          id: "categoryCount",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">
              {tableType === "prime" ? "CATEGORY COUNT" : "SUB-CATEGORY COUNT"}
            </p>
          ),
          cell: (info) => (
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
          ),
        }),
        columnHelper.accessor("totalProducts", {
          id: "totalProducts",
          header: () => (
            <p className="text-sm font-bold text-gray-600 dark:text-white">TOTAL PRODUCTS</p>
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
          cell: (info) => (
            <div
              className={`flex h-7 w-[110px] items-center justify-center text-sm ${
                info.getValue() === "Active"
                  ? "bg-green-100 dark:bg-green-50"
                  : "bg-red-100 dark:bg-red-50"
              } rounded-[10px] text-base font-bold `}
            >
              <div
                className={`${
                  info.getValue() === "Active"
                    ? "text-green-500 "
                    : "text-red-500"
                } uppercase `}
              >
                {info.getValue()}
              </div>
            </div>
          ),
        }),
        // columnHelper.accessor("actions", {
        //   id: "actions",
        //   header: () => (
        //     <p className="text-sm font-bold text-gray-600 dark:text-white">
        //       ACTIONS
        //     </p>
        //   ),
        //   cell: (info) => (
        //     <div className="flex items-center gap-2">
        //       <button
        //         onClick={() => {
        //           if (tableType === "subcategory" && navigate) {
        //             navigate('/admin/main/marketsphere/product-management', { state: { categoryContext } });
        //           } else {
        //             // Open edit modal with pre-filled data
        //             const item = info.row.original;
        //             setItemToEdit(item);
        //             setIsEditMode(true);
        //             setModalType(tableType);
        //             setFormData({
        //               name: item.name || '',
        //               serialNumber: item.serialNumber || '',
        //               price: '',
        //               stockStatus: 'In Stock'
        //             });
        //             setImagePreview(item.image || null);
        //             setShowAddModal(true);
        //           }
        //         }}
        //         className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-150"
        //         title="Edit Category"
        //       >
        //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        //         </svg>
        //       </button>
        //       <button
        //         onClick={() => {
        //           if (onDelete) {
        //             onDelete(info.row.original, tableType === 'prime' ? 'prime' : 'category');
        //           } else {
        //             console.log("Delete category:", info.row.original);
        //           }
        //         }}
        //         className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150"
        //         title="Delete Category"
        //       >
        //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        //         </svg>
        //       </button>
        //       {tableType !== "subcategory" && (
        //         <button
        //           onClick={() => onRowClick && onRowClick(info.row.original)}
        //           className="inline-flex items-center justify-center w-8 h-8 text-brand-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-150"
        //           title={`View ${tableType === "prime" ? "Categories" : "Subcategories"}`}
        //         >
        //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        //           </svg>
        //         </button>
        //       )}
        //     </div>
        //   ),
        // }),

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
                    <div className="absolute left-0 top-10 z-50 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-navy-800">
                      <div className="px-0.5">
                        <button
                            className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                            onClick={() => {
                              const item = info.row.original;
                              if (tableType === "subcategory" && navigate) {
                                navigate('/admin/main/marketsphere/product-management', {
                                  state: { categoryContext }
                                });
                              } else {
                                setItemToEdit(item);
                                setIsEditMode(true);
                                setModalType(tableType);
                                setFormData({
                                  name: item.name || '',
                                  serialNumber: item.serialNumber || '',
                                  price: '',
                                  stockStatus: 'In Stock'
                                });
                                setImagePreview(item.image || null);
                                setShowAddModal(true);
                              }
                            }}
                        >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                <MdEdit className="h-3 w-3" />
              </span>
                          Update
                        </button>

                        <button
                            className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            onClick={() => {
                              if (onDelete) {
                                const type = tableType === 'prime' ? 'prime' : 'category';
                                onDelete(info.row.original, type);
                              } else {
                                console.log("Delete category:", info.row.original);
                              }
                            }}
                        >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                <MdDelete className="h-3 w-3" />
              </span>
                          Delete
                        </button>

                        {tableType !== "subcategory" && (
                            <>
                              <div className="mx-2 my-0.5 h-px bg-gray-200 dark:bg-gray-600"></div>
                              <button
                                  className="group flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                                  onClick={() => {
                                    if (onRowClick) {
                                      console.log(info.row.original)
                                      onRowClick(info.row.original);
                                    }
                                  }}
                              >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                    <MdArrowForward className="h-3 w-3" />
                  </span>
                                View {tableType === "prime" ? "Categories" : "Subcategories"}
                              </button>
                            </>
                        )}
                      </div>
                    </div>
                )}
              </div>
          )
        }),

    ];
    }
  };

  const columns = getColumns();
  
  const [data, setData] = React.useState(() => {
    // Add serial numbers to each item in the tableData
    return tableData.map(item => ({
      ...item,
      serialNumber: item.serialNumber || generateSerialNumber()
    }));
  });
  
  // Update data when tableData prop changes
  React.useEffect(() => {
    const dataWithSerials = tableData.map(item => ({
      ...item,
      serialNumber: item.serialNumber || generateSerialNumber()
    }));
    setData(dataWithSerials);
  }, [tableData]);
  
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
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
      {title && (
        <h2 className="text-xl font-semibold text-navy-700 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        <div className="flex w-full items-center justify-between pt-[20px]">
          <div className="flex h-[38px] w-[400px] items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
            <SearchIcon />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              type="text"
              placeholder="Search...."
              className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white"
            />
          </div>
          
          {onAddClick && (
            <button
              onClick={onAddClick}
              className="flex items-center justify-center w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Add Category"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-3H6l-2 3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No {tableType === 'prime' ? 'Prime Categories' : tableType === 'category' ? 'Categories' : 'Subcategories'} Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Get started by creating your first {tableType === 'prime' ? 'prime category' : tableType === 'category' ? 'category' : 'subcategory'}.
              </p>
              {onAddClick && (
                <button
                  onClick={onAddClick}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add {tableType === 'prime' ? 'Prime Category' : tableType === 'category' ? 'Category' : 'Subcategory'}
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
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
                  .rows.slice(0, 7)
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
                              className="min-w-[150px] border-white/0 py-3  pr-4"
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
          )}
          {/* pagination */}
          {data.length > 0 && (
          <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
            {/* left side */}
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-700">
                Showing 6 rows per page
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
          )}
        </div>
      </Card>
    </div>
  );
}

const CategoryManagement = () => {
  const navigate = useNavigate();
  
  // API Store
  const {
    primeCategories: apiPrimeCategories,
    categories: apiCategories,
    subcategories: apiSubcategories,
    loading,
    error,
    fetchPrimeCategories,
    fetchCategoriesByPrimeCategory,
    fetchSubcategoriesByCategory,
    createPrimeCategory,
    createCategory,
    createSubcategory,
    updatePrimeCategory,
    updateCategory,
    updateSubcategory,
    deletePrimeCategory,
    deleteCategory,
    deleteSubcategory,
    generateSerialNumber,
    clearError,
    resetCategories,
    resetSubcategories,
  } = useCategoryApiStore();

  const [selectedPrimeCategory, setSelectedPrimeCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'prime', 'category', 'subcategory'
  const [modalType, setModalType] = useState('prime'); // 'prime', 'category', 'subcategory'
  const [isEditMode, setIsEditMode] = useState(false); // Track if we're editing or adding
  const [itemToEdit, setItemToEdit] = useState(null); // Track which item is being edited
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  
  // Form state for add modal
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    price: '',
    stockStatus: 'In Stock'
  });

  // Initialize API data on mount
  useEffect(() => {
    fetchPrimeCategories().catch(err => {
      console.error('Failed to fetch prime categories:', err);
    });
  }, []);







  const handlePrimeCategoryClick = async (primeCategory) => {
    setSelectedPrimeCategory(primeCategory);
    setSelectedCategory(null); // Reset category selection
    resetSubcategories(); // Clear subcategories
    
    // Fetch categories for this prime category from API
    if (primeCategory._id || primeCategory.id) {
      try {
        await fetchCategoriesByPrimeCategory(primeCategory._id || primeCategory.id);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    
    // Fetch subcategories for this category from API
    if (category._id || category.id) {
      try {
        await fetchSubcategoriesByCategory(category._id || category.id);
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      }
    }
  };

  // IMAGE FLAG 1

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setModalType('prime');
    setIsEditMode(false);
    setItemToEdit(null);
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({
      name: '',
      serialNumber: '',
      price: '',
      stockStatus: 'In Stock'
    });
  };

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };


  // Handle adding new items or editing existing ones
  const handleAddItem = async (formData) => {
    try {
      
      // Generate serial number if not provided
      const serialNumber = formData.serialNumber.trim() || await generateSerialNumber();
      
      // Prepare form data for API
      const apiFormData = new FormData();
      apiFormData.append('name', formData.name);
      apiFormData.append('serialNumber', serialNumber);

      if (selectedImage) {

        apiFormData.append('image', selectedImage);
      }

      // Use API
      if (isEditMode && itemToEdit) {
        // Edit existing item
        const id = itemToEdit._id || itemToEdit.id;
        
        // Add type-specific fields for subcategory
        if (modalType === 'subcategory') {
          if (formData.price) {
            apiFormData.append('productCount', formData.price);
          }
          if (formData.stockStatus) {
            apiFormData.append('stockStatus', formData.stockStatus);
          }
        }

        switch (modalType) {
          case 'prime':
            await updatePrimeCategory(id, apiFormData);
            break;
          case 'category':
            await updateCategory(id, apiFormData, selectedPrimeCategory._id || selectedPrimeCategory.id);
            break;
          case 'subcategory':
            await updateSubcategory(id, apiFormData, selectedCategory._id || selectedCategory.id);
            break;
        }
      } else {
        // Create new item
        
        // Add type-specific fields for subcategory
        if (modalType === 'subcategory') {
          if (formData.price) {
            apiFormData.append('productCount', formData.price);
          }
          if (formData.stockStatus) {
            apiFormData.append('stockStatus', formData.stockStatus);
          }
        }

        switch (modalType) {
          case 'prime':
            await createPrimeCategory(apiFormData);
            // for (let pair of apiFormData.entries()) {
            //   console.log(pair[0] + ':', pair[1]);
            // }
            break;
          case 'category':
            await createCategory(apiFormData, selectedPrimeCategory._id || selectedPrimeCategory.id);
            break;
          case 'subcategory':
            await createSubcategory(apiFormData, selectedCategory._id || selectedCategory.id);
            break;
        }
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Error saving item: ' + error.message);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = async () => {
    try {
      const id = itemToDelete._id || itemToDelete.id;
      
      switch (deleteType) {
        case 'prime':
          await deletePrimeCategory(id);
          // Reset selections if deleted prime category was selected
          if (selectedPrimeCategory && (selectedPrimeCategory._id === id || selectedPrimeCategory.id === id)) {
            setSelectedPrimeCategory(null);
            setSelectedCategory(null);
            resetCategories();
            resetSubcategories();
          }
          break;
          
        case 'category':
          await deleteCategory(id, selectedPrimeCategory._id || selectedPrimeCategory.id);
          // Reset category selection if deleted category was selected
          if (selectedCategory && (selectedCategory._id === id || selectedCategory.id === id)) {
            setSelectedCategory(null);
            resetSubcategories();
          }
          break;
          
        case 'subcategory':
          await deleteSubcategory(id, selectedCategory._id || selectedCategory.id);
          break;
      }
      
      setShowDeleteModal(false);
      setItemToDelete(null);
      setDeleteType('');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error deleting item: ' + error.message);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
    setDeleteType('');
  };

  const getModalTitle = () => {
    const action = isEditMode ? 'Edit' : 'Add New';
    switch (modalType) {
      case 'prime':
        return `${action} Prime Category`;
      case 'category':
        return isEditMode ? `Edit Category` : `Add New Category to ${selectedPrimeCategory?.name}`;
      case 'subcategory':
        return isEditMode ? `Edit Product` : `Add New Subcategory to ${selectedCategory?.name}`;
      default:
        return `${action} Item`;
    }
  };

  const getModalFields = () => {
    switch (modalType) {
      case 'prime':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                placeholder="Enter serial number (optional - auto-generated if empty)"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to auto-generate (e.g., ABC12345)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prime Category Name
              </label>
              <input
                type="text"
                placeholder="Enter prime category name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
            </div>
          </>
        );
      case 'category':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                placeholder="Enter serial number (optional - auto-generated if empty)"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to auto-generate (e.g., ABC12345)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prime Category
              </label>
              <input
                type="text"
                value={selectedPrimeCategory?.name || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </>
        );
      case 'subcategory':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                placeholder="Enter serial number (optional - auto-generated if empty)"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to auto-generate (e.g., ABC12345)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Count
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stock Status
                </label>
                <select 
                  value={formData.stockStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, stockStatus: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={selectedCategory?.name || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Get data from API
  const categories = apiCategories;
  const subCategories = apiSubcategories;
  const finalPrimeCategories = apiPrimeCategories;

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      {/* API Connection Status */}
      <div className="mb-4 p-3 rounded-lg">
        {loading.primeCategories && (
          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            🔄 Loading data from API...
          </div>
        )}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 flex justify-between items-center">
            <span>❌ API Error: {error}</span>
            <button 
              onClick={() => {
                clearError();
                fetchPrimeCategories();
              }}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}
        {!loading.primeCategories && !error && apiPrimeCategories.length > 0 && (
          <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
            ✅ Connected to API - Live data ({apiPrimeCategories.length} prime categories)
          </div>
        )}
        {!loading.primeCategories && !error && apiPrimeCategories.length === 0 && (
          <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
            📋 No prime categories found. Click the + button to add your first category.
          </div>
        )}
      </div>
      
      {/* Prime Categories Table */}
      <CategoryTable 
        title="Prime Categories"
        tableData={finalPrimeCategories} 
        onAddClick={() => openAddModal('prime')}
        onRowClick={handlePrimeCategoryClick}
        onDelete={handleDeleteClick}
        tableType="prime"
        navigate={navigate}
        setItemToEdit={setItemToEdit}
        setIsEditMode={setIsEditMode}
        setModalType={setModalType}
        setFormData={setFormData}
        setImagePreview={setImagePreview}
        setShowAddModal={setShowAddModal}
        selectedPrimeCategory={selectedPrimeCategory}
        selectedCategory={selectedCategory}
      />

      {/* Categories Table */}
      {selectedPrimeCategory && (
        <CategoryTable 
          title={`Categories in ${selectedPrimeCategory.name}`}
          tableData={categories} 
          onAddClick={() => openAddModal('category')}
          onRowClick={handleCategoryClick}
          onDelete={handleDeleteClick}
          tableType="category"
          navigate={navigate}
          setItemToEdit={setItemToEdit}
          setIsEditMode={setIsEditMode}
          setModalType={setModalType}
          setFormData={setFormData}
          setImagePreview={setImagePreview}
          setShowAddModal={setShowAddModal}
          selectedPrimeCategory={selectedPrimeCategory}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Subcategories Table */}
      {selectedCategory && (
        <CategoryTable 
          title={`Subcategories in ${selectedCategory.name}`}
          tableData={subCategories} 
          onAddClick={() => openAddModal('subcategory')}
          onDelete={handleDeleteClick}
          tableType="subcategory"
          navigate={navigate}
          categoryContext={{
            primeCategory: selectedPrimeCategory,
            category: selectedCategory
          }}
          setItemToEdit={setItemToEdit}
          setIsEditMode={setIsEditMode}
          setModalType={setModalType}
          setFormData={setFormData}
          setImagePreview={setImagePreview}
          setShowAddModal={setShowAddModal}
          selectedPrimeCategory={selectedPrimeCategory}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                {getModalTitle()}
            </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {modalType === 'subcategory' ? 'Product Image' : 'Category Image'}
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex justify-start w-full">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 dark:border-white/20">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center px-2">
                          <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            <span className="font-semibold">Upload</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Image</p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        name="image" // ✅ Add this just in case backend expects this key
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              {getModalFields()}
              </div>
              
            <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                // onClick={() => {
                //   if (formData.name.trim()) {
                //     handleAddItem(formData);
                //   } else {
                //     alert('Please enter a name');
                //   }
                  //  }
                    onClick={() => {
                      if (formData.name.trim()) {
                        handleAddItem(formData);
                      } else {
                        toast.error('Please enter a name');
                      }
                    }
                }
                disabled={loading.creating || loading.updating}
                className="flex-1 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading.creating || loading.updating ? 'Saving...' : 
                  (isEditMode 
                    ? `Update ${modalType === 'prime' ? 'Prime Category' : modalType === 'category' ? 'Category' : 'Product'}`
                    : `Add ${modalType === 'prime' ? 'Prime Category' : modalType === 'category' ? 'Category' : 'Product'}`
                  )
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                Confirm Delete
              </h3>
              <button
                onClick={handleCloseDeleteModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-navy-700 dark:text-white">
                    Delete {deleteType === 'prime' ? 'Prime Category' : deleteType === 'category' ? 'Category' : 'Product'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete "{itemToDelete.name}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCloseDeleteModal}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={loading.deleting}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading.deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement; 