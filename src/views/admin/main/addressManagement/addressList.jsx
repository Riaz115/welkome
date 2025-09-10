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
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdLocationOn,
  MdHome,
  MdBusiness,
  MdStar,
  MdStarBorder,
  MdMoreVert,
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAddressApiStore from "stores/useAddressApiStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";
import SearchAndFilter from "components/common/SearchAndFilter";
import PageHeader from "components/common/PageHeader";

const ActionMenu = ({ address, onViewClick, onEditClick, onDeleteClick, onSetDefaultClick }) => {
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
              onViewClick && onViewClick(address);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdVisibility className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onEditClick && onEditClick(address);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
          >
            <MdEdit className="w-4 h-4" />
            Edit Address
          </button>
          {!address.isDefault && (
            <button
              onClick={() => {
                setShowMenu(false);
                onSetDefaultClick && onSetDefaultClick(address);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-600 flex items-center gap-2"
            >
              <MdStarBorder className="w-4 h-4" />
              Set as Default
            </button>
          )}
          <button
            onClick={() => {
              setShowMenu(false);
              onDeleteClick && onDeleteClick(address);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <MdDelete className="w-4 h-4" />
            Delete Address
          </button>
        </div>
      )}
    </div>
  );
};

function AddressTable(props) {
  const { tableData, onViewClick, onEditClick, onDeleteClick, onSetDefaultClick, searchValue, onSearchChange, advancedFilters, onAdvancedFilterChange, onClearFilters } = props;
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

  const getAddressTypeIcon = (address) => {
    const buildingName = address.buildingName?.toLowerCase() || "";
    const streetAddress = address.streetAddress?.toLowerCase() || "";
    
    if (buildingName.includes("home") || buildingName.includes("house") || streetAddress.includes("home")) {
      return <MdHome className="w-4 h-4 text-green-500" />;
    } else if (buildingName.includes("office") || buildingName.includes("building") || streetAddress.includes("office")) {
      return <MdBusiness className="w-4 h-4 text-blue-500" />;
    } else {
      return <MdLocationOn className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAddressType = (address) => {
    const buildingName = address.buildingName?.toLowerCase() || "";
    const streetAddress = address.streetAddress?.toLowerCase() || "";
    
    if (buildingName.includes("home") || buildingName.includes("house") || streetAddress.includes("home")) {
      return "Home";
    } else if (buildingName.includes("office") || buildingName.includes("building") || streetAddress.includes("office")) {
      return "Office";
    } else {
      return "Other";
    }
  };

  const formatAddress = (address) => {
    const parts = [
      address.houseNumber,
      address.apartmentNumber,
      address.buildingName,
      address.streetAddress,
      address.area,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    
    return parts.join(", ");
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("contactName", {
        id: "contact",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            CONTACT INFO
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex flex-col">
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                {row.contactName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {row.contactPhone}
              </p>
            </div>
          );
        },
      }),
      columnHelper.accessor("streetAddress", {
        id: "address",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            ADDRESS
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="max-w-xs">
              <p className="text-sm text-navy-700 dark:text-white line-clamp-2">
                {formatAddress(row)}
              </p>
              {row.landmark && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Near: {row.landmark}
                </p>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("buildingName", {
        id: "type",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            TYPE
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-2">
              {getAddressTypeIcon(row)}
              <span className="text-sm text-navy-700 dark:text-white">
                {getAddressType(row)}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("isDefault", {
        id: "status",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            STATUS
          </p>
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex flex-col gap-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                row.isDefault 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}>
                {row.isDefault ? (
                  <>
                    <MdStar className="w-3 h-3 mr-1" />
                    Default
                  </>
                ) : (
                  "Regular"
                )}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                row.isActive 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}>
                {row.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        id: "created",
        header: () => (
          <p className="text-sm font-bold text-gray-600 dark:text-white">
            CREATED
          </p>
        ),
        cell: (info) => (
          <span className="text-sm text-navy-700 dark:text-white">
            {new Date(info.getValue()).toLocaleDateString()}
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
          const address = info.row.original;
          return (
            <ActionMenu 
              address={address}
              onViewClick={onViewClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onSetDefaultClick={onSetDefaultClick}
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

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
  });

  return (
    <div className="w-full">
      <Card extra="w-full overflow-hidden px-6 pb-6 sm:overflow-x-auto">
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <tr key={index} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th
                        key={index}
                        colSpan={header.colSpan}
                        className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                      >
                        <div className="flex items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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

const AddressList = () => {
  const navigate = useNavigate();
  const { 
    addresses, 
    loading, 
    getAllAddresses, 
    deleteAddress, 
    setDefaultAddress
  } = useAddressApiStore();

  const [searchValue, setSearchValue] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: null,
    addressTitle: ""
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      await getAllAddresses();
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleAddAddress = () => {
    navigate("/admin/main/addressManagement/add-address");
  };

  const handleEditAddress = (address) => {
    navigate(`/admin/main/addressManagement/edit-address/${address._id}`);
  };

  const handleViewAddress = (address) => {
    navigate(`/admin/main/addressManagement/address-detail/${address._id}`);
  };

  const handleDeleteAddress = (address) => {
    setDeleteModal({
      isOpen: true,
      addressId: address._id,
      addressTitle: address.contactName || "Address"
    });
  };

  const handleSetDefault = async (address) => {
    try {
      await setDefaultAddress(address._id);
      toast.success("Default address updated successfully");
      await fetchAddresses();
    } catch (error) {
      toast.error("Failed to update default address");
    }
  };

  const confirmDeleteAddress = async () => {
    if (!deleteModal.addressId) return;

    setIsDeleting(true);
    try {
      await deleteAddress(deleteModal.addressId);
      toast.success("Address deleted successfully");
      await fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal();
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      addressId: null,
      addressTitle: ""
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
      field: "country",
      label: "Country",
      type: "text"
    },
    {
      field: "city",
      label: "City",
      type: "text"
    },
    {
      field: "state",
      label: "State",
      type: "text"
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
        title="Address Management"
        subtitle="Manage all user addresses"
        primaryAction={{
          label: "Add Address",
          icon: <MdAdd className="w-4 h-4" />,
          onClick: handleAddAddress
        }}
      />

      <div className="mb-6">
        <SearchAndFilter
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          placeholder="Search addresses..."
          advancedFilters={advancedFilters}
          onAdvancedFilterChange={handleAdvancedFilterChange}
          onClearFilters={handleClearFilters}
          filterConfig={filterConfig}
        />
      </div>

      <AddressTable
        tableData={addresses}
        onViewClick={handleViewAddress}
        onEditClick={handleEditAddress}
        onDeleteClick={handleDeleteAddress}
        onSetDefaultClick={handleSetDefault}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        advancedFilters={advancedFilters}
        onAdvancedFilterChange={handleAdvancedFilterChange}
        onClearFilters={handleClearFilters}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteAddress}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        itemName={deleteModal.addressTitle}
        itemType="address"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AddressList;
