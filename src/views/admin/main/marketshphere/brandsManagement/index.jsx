import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Card from 'components/card';
import SearchIcon from 'components/icons/SearchIcon';
import { MdMoreVert, MdEdit, MdDelete, MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { useCategoryApiStore } from '../../../../../stores/useCategoryApiStore';
import { toast } from 'react-toastify';

const columnHelper = createColumnHelper();

const BrandsManagement = () => {
  const { brands, fetchBrands, createBrand, updateBrand, deleteBrand, loading } = useCategoryApiStore();

  const [globalFilter, setGlobalFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const fetchedRef = useRef(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchBrands()
      .then(() => {})
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);

  const data = useMemo(() => brands.map((b, idx) => ({ ...b, index: idx + 1 })), [brands]);

  const handleDropdownToggle = useCallback((rowIndex) => {
    setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex);
  }, [dropdownOpen]);

  const columns = useMemo(() => [
    columnHelper.accessor('index', {
      id: 'index',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">#</p>,
      cell: (info) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor('image', {
      id: 'image',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">IMAGE</p>,
      cell: (info) => (
        <div className="flex items-center">
          <img src={info.getValue()} alt="Brand" className="h-12 w-12 rounded-lg object-cover shadow-sm" />
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>,
      cell: (info) => <div className="font-medium text-navy-700 dark:text-white">{info.getValue()}</div>,
    }),
    columnHelper.accessor('actions', {
      id: 'actions',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">ACTIONS</p>,
      cell: (info) => (
        <div className="relative">
          <button className="flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400" onClick={() => handleDropdownToggle(info.row.index)}>
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
                    setFormData({ name: item.name || '' });
                    setImagePreview(item.image || null);
                    setShowModal(true);
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
                    setItemToDelete(info.row.original);
                    setShowDeleteModal(true);
                  }}
                >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-md bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                    <MdDelete className="h-3 w-3" />
                  </span>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    }),
  ], [handleDropdownToggle]);

  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setItemToEdit(null);
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({ name: '' });
  };

  const handleSave = async () => {
    console.log('[Brands] Save clicked, isEditMode:', isEditMode, 'item:', itemToEdit);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      if (selectedImage) fd.append('image', selectedImage);
      if (isEditMode && itemToEdit) {
        await updateBrand(itemToEdit._id || itemToEdit.id, fd);
        toast.success('Brand updated');
      } else {
        await createBrand(fd);
        toast.success('Brand created');
      }
      handleCloseModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        <div className="flex w-full items-center justify-between pt-[20px]">
          <div className="flex h-[38px] w-[400px] items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
            <SearchIcon />
            <input value={globalFilter ?? ""} onChange={(e) => setGlobalFilter(e.target.value)} type="text" placeholder="Search brands..." className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white" />
          </div>
          <button onClick={() => { setShowModal(true); }} className="flex items-center justify-center w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl" title="Add Brand">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Brands Found</h3>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="!border-px !border-gray-400">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} colSpan={header.colSpan} className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30">
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 dark:border-white/30">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="min-w-[150px] border-white/0 py-3  pr-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data.length > 0 && (
            <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-700">Showing {pageSize} rows per page</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}>
                  <MdChevronLeft />
                </button>
                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((num, idx) => (
                  <button
                    key={idx}
                    className={`linear flex h-10 w-10 items-center justify-center rounded-full p-2 text-sm transition duration-200 ${
                      num === pageIndex + 1
                        ? "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                        : "border-[1px] border-gray-400 bg-[transparent] dark:border-white dark:text-white"
                    }`}
                    onClick={() => table.setPageIndex(num - 1)}
                  >
                    {num}
                  </button>
                ))}
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 `}>
                  <MdChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">Confirm Delete</h3>
              <button onClick={() => { setShowDeleteModal(false); setItemToDelete(null); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete "{itemToDelete?.name}"?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setItemToDelete(null); }} className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors">Cancel</button>
              <button onClick={async () => {
                try {
                  await deleteBrand(itemToDelete._id || itemToDelete.id);
                  toast.success('Brand deleted');
                  setShowDeleteModal(false);
                  setItemToDelete(null);
                } catch (e) {
                  toast.error(e.message);
                }
              }} className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">{isEditMode ? 'Edit Brand' : 'Add New Brand'}</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Image</label>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex justify-start w-full">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 dark:border-white/20">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <div className="flex flex-col items-center justify-center px-2">
                          <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Upload</span></p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Image</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" name="image" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Name</label>
                <input type="text" placeholder="Enter brand name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleCloseModal} className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={loading.creating || loading.updating} className="flex-1 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{loading.creating || loading.updating ? 'Saving...' : isEditMode ? 'Update Brand' : 'Add Brand'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsManagement;


