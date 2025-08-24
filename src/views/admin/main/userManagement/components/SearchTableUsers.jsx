import React, { useState } from "react";
import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import { MdChevronRight, MdChevronLeft, MdClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

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

function SearchTableUsers(props) {
  const { tableData, columns, title = "Users", onAddClick } = props;
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: "",
    status: "Active"
  });
  let defaultData = tableData;

  const createPages = (count) => {
    let arrPageCount = [];
    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }
    return arrPageCount;
  };

  const [data, setData] = useState(() => [...defaultData]);
  
  // Update data when tableData prop changes
  React.useEffect(() => {
    setData([...tableData]);
  }, [tableData]);
  
  const [{ pageIndex, pageSize }, setPagination] = useState({
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
    columns: columns,
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      role: "",
      permissions: "",
      status: "Active"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new subadmin:", formData);
    // Here you would typically call an API to add the subadmin
    if (onAddClick) {
      onAddClick(formData);
    }
    handleCloseModal();
  };

  const roleOptions = [
    "Super Admin",
    "User Manager", 
    "Content Moderator",
    "Finance Admin",
    "Technical Admin",
    "Marketing Admin",
    "Support Admin",
    "Analytics Admin"
  ];

  const permissionOptions = [
    "Full Access",
    "User Management",
    "Content Management", 
    "Financial Management",
    "System Management",
    "Marketing Tools",
    "Customer Support",
    "Analytics & Reports"
  ];

  return (
    <Card extra={"w-full h-full px-6"}>
      {/* Header with search and add button */}
      <div className="flex w-full items-center justify-between pt-[20px]">
        <div className="flex w-[400px] max-w-full items-center rounded-xl">
          <div className="flex h-[38px] w-[400px] flex-grow items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
            <SearchIcon />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              type="text"
              placeholder="Search...."
              className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white"
            />
          </div>
        </div>
        
        {/* Add Button - Only show for Sub Admins */}
        {onAddClick && title === "Sub Admins" && (
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-center w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl dark:bg-brand-400 dark:hover:bg-brand-300"
            title={`Add ${title.slice(0, -1)}`}
          >
            <IoMdAdd className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
        <table className="w-full min-w-[800px]">
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
                  <tr key={row.id} className="border-b border-gray-200 dark:border-white/30">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[120px] border-white/0 py-3  pr-4"
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
      </div>

      {/* Add Subadmin Modal - Only show for Sub Admins */}
      {showModal && title === "Sub Admins" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-navy-800 dark:to-navy-700 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-600 p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-1">
                  Add New Sub Admin
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a new sub admin account with specific permissions
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-navy-600 border border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all duration-200 shadow-sm"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-navy-600 border border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all duration-200 shadow-sm"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Role Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-navy-600 border border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all duration-200 shadow-sm"
                  >
                    <option value="">Select a role</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white dark:bg-navy-600 border border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all duration-200 shadow-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Permissions Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Permissions
                  </label>
                  <select
                    name="permissions"
                    value={formData.permissions}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-navy-600 border border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all duration-200 shadow-sm"
                  >
                    <option value="">Select permissions</option>
                    {permissionOptions.map((permission) => (
                      <option key={permission} value={permission}>
                        {permission}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 dark:from-brand-400 dark:to-brand-500 dark:hover:from-brand-300 dark:hover:to-brand-400 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Add Sub Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}

export default SearchTableUsers; 