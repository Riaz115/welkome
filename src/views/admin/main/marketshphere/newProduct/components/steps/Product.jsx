import { useState, useCallback, useEffect } from "react";
import { MdAdd, MdClose, MdOutlineCloudUpload, MdBusiness, MdPerson } from "react-icons/md";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import DropZonefile from "../DropZonefile";
import { useCategoryApiStore } from "stores/useCategoryApiStore";
import { toast } from "react-toastify";

const Product = ({ data, onDataChange }) => {
  const [newTag, setNewTag] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandForm, setBrandForm] = useState({ name: '' });
  const [brandSelectedImage, setBrandSelectedImage] = useState(null);
  const [brandImagePreview, setBrandImagePreview] = useState(null);
  const [savingBrand, setSavingBrand] = useState(false);

  // API store for brands and categories
  const {
    primeCategories,
    categories,
    subcategories,
    brands,
    loading,
    fetchPrimeCategories,
    fetchCategoriesByPrimeCategory,
    fetchSubcategoriesByCategory,
    fetchBrands,
    createBrand,
    resetCategories,
    resetSubcategories,
  } = useCategoryApiStore();

  useEffect(() => {
    // Load initial data
    fetchPrimeCategories();
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
    
    // Auto-generate SEO slug from title
    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      onDataChange({ seoSlug: slug });
    }
  };

  const handleCategoryChange = (level, value) => {
    if (level === 'prime') {
      const selected = primeCategories.find((p) => p.id === value || p._id === value);
      onDataChange({ 
        primeCategory: selected?.name || '',
        primeCategoryId: selected?._id || selected?.id || value,
        category: '',
        categoryId: '',
        subcategory: '',
        subcategoryId: ''
      });
      resetCategories();
      resetSubcategories();
      if (selected?._id || selected?.id || value) {
        fetchCategoriesByPrimeCategory(selected?._id || selected?.id || value);
      }
    } else if (level === 'category') {
      const selected = categories.find((c) => c.id === value || c._id === value);
      onDataChange({ 
        category: selected?.name || '',
        categoryId: selected?._id || selected?.id || value,
        subcategory: '',
        subcategoryId: ''
      });
      resetSubcategories();
      if (selected?._id || selected?.id || value) {
        fetchSubcategoriesByCategory(selected?._id || selected?.id || value);
      }
    } else if (level === 'subcategory') {
      const selected = subcategories.find((s) => s.id === value || s._id === value);
      onDataChange({ 
        subcategory: selected?.name || '',
        subcategoryId: selected?._id || selected?.id || value
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !(data.tags || []).includes(newTag.trim())) {
      onDataChange({ 
        tags: [...(data.tags || []), newTag.trim()] 
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onDataChange({ 
      tags: (data.tags || []).filter(tag => tag !== tagToRemove) 
    });
  };

  const onImageDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const files = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));
      
      onDataChange({
        images: [...(data.images || []), ...files]
      });
    }
  }, [data.images, onDataChange]);

  const removeImage = (indexToRemove) => {
    const updatedImages = (data.images || []).filter((_, index) => index !== indexToRemove);
    onDataChange({ images: updatedImages });
  };

  const handleBrandSelect = (brand) => {
    onDataChange({ 
      brand: brand.name,
      brandId: brand._id || brand.id
    });
    setShowBrandOptions(false);
    setBrandSearch('');
  };

  const filteredBrands = (brands || []).filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const openAddBrandModal = () => {
    setBrandForm({ name: '' });
    setBrandSelectedImage(null);
    setBrandImagePreview(null);
    setShowBrandModal(true);
  };

  const handleBrandImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setBrandImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBrand = async () => {
    try {
      setSavingBrand(true);
      const fd = new FormData();
      fd.append('name', brandForm.name);
      if (brandSelectedImage) fd.append('image', brandSelectedImage);
      const created = await createBrand(fd);
      toast.success('Brand created');
      setShowBrandModal(false);
      // Refresh and select the new brand
      await fetchBrands();
      const createdId = created?._id || created?.id;
      const createdName = created?.name;
      const match = (brands || []).find(b => (b._id || b.id) === createdId) || (brands || []).find(b => b.name === createdName);
      if (match) {
        handleBrandSelect(match);
      } else if (createdId || createdName) {
        onDataChange({ brand: createdName || '', brandId: createdId || '' });
      }
    } catch (e) {
      toast.error(e.message || 'Failed to create brand');
    } finally {
      setSavingBrand(false);
    }
  };

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Basic Product Details
      </h4>

      {/* content */}
      <div className="mt-6 space-y-6">
        {/* Product Title & Subtitle */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Product Title *"
            placeholder="eg. Elegant Wireless Headphones"
            id="title"
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            extra="col-span-1"
          />
          <InputField
            label="Product Subtitle"
            placeholder="eg. Premium Sound Quality"
            id="subtitle"
            type="text"
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            extra="col-span-1"
          />
        </div>

        {/* Brand Selection */}
        <div className="relative">
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Brand
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.brand || brandSearch}
              onChange={(e) => {
                setBrandSearch(e.target.value);
                setShowBrandOptions(true);
                if (!e.target.value) {
                  onDataChange({ brand: '', brandId: '' });
                }
              }}
              onFocus={() => setShowBrandOptions(true)}
              placeholder="Search or select brand..."
              className="w-full rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
            />
            
            {showBrandOptions && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-800">
                {filteredBrands.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer"
                  >
                    <img src={brand.image} alt={brand.name} className="h-8 w-8 rounded object-cover" />
                    <span className="text-sm text-navy-700 dark:text-white">{brand.name}</span>
                  </div>
                ))}
                <div 
                  onClick={openAddBrandModal}
                  className="flex items-center gap-3 p-3 border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer"
                >
                  <div className="h-8 w-8 rounded bg-gray-200 dark:bg-navy-600 flex items-center justify-center">
                    <MdAdd className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-brand-500">Add New Brand</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Path - Cascading Select */}
        <div>
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Category Path *
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Prime Category */}
            <div>
              <select
                value={data.primeCategoryId || ''}
                onChange={(e) => handleCategoryChange('prime', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              >
                <option value="">Select Prime Category</option>
                {(primeCategories || []).map((prime) => (
                  <option key={prime._id || prime.id} value={prime._id || prime.id}>{prime.name}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={data.categoryId || ''}
                onChange={(e) => handleCategoryChange('category', e.target.value)}
                disabled={!data.primeCategoryId}
                className="w-full rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none disabled:opacity-50 dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              >
                <option value="">Select Category</option>
                {(categories || []).map((category) => (
                  <option key={category._id || category.id} value={category._id || category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <select
                value={data.subcategoryId || ''}
                onChange={(e) => handleCategoryChange('subcategory', e.target.value)}
                disabled={!data.categoryId}
                className="w-full rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none disabled:opacity-50 dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              >
                <option value="">Select Subcategory</option>
                {(subcategories || []).map((subcategory) => (
                  <option key={subcategory._id || subcategory.id} value={subcategory._id || subcategory.id}>{subcategory.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div>
          <TextField
            label="Product Description"
            placeholder="Detailed description of your product features, benefits, and specifications..."
            id="description"
            cols="30"
            rows="6"
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        {/* Product Images */}
        <div>
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Product Images
          </label>
          <div className="flex w-full items-center justify-center rounded-[20px] mb-4">
            <DropZonefile
              onDrop={onImageDrop}
              content={
                <div className="flex p-10 h-[240px] w-full flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700">
                  <p className="text-[80px] text-navy-700">
                    <MdOutlineCloudUpload className="text-brand-500 dark:text-white" />
                  </p>
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    Drop product images here, or{" "}
                    <span className="font-bold text-brand-500 dark:text-brand-400">
                      browse
                    </span>
                  </p>
                  <p className="pt-2 text-sm text-gray-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                </div>
              }
            />
          </div>

          {/* Uploaded Images Preview */}
          {data.images && data.images.length > 0 && (
            <div className="flex flex-col items-center">
              <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white text-center">
                Uploaded Images ({data.images.length})
              </h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center max-w-2xl">
                {data.images.map((imageData, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageData.preview}
                      alt={`Product ${index + 1}`}
                      className="h-24 w-24 rounded-lg object-cover shadow-sm"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Video */}
        <div>
          <InputField
            label="Product Video URL (Optional)"
            placeholder="https://youtube.com/watch?v=..."
            id="video"
            type="url"
            value={data.video}
            onChange={(e) => handleInputChange('video', e.target.value)}
          />
        </div>

        {/* Tags & SEO Slug */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Tags */}
          <div>
            <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
              Product Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(data.tags || []).map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
                  >
                    <MdClose className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                <MdAdd className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* SEO Slug */}
          <div>
            <InputField
              label="SEO Slug (Auto-generated)"
              placeholder="product-url-slug"
              id="seoSlug"
              type="text"
              value={data.seoSlug}
              onChange={(e) => handleInputChange('seoSlug', e.target.value)}
            />
          </div>
        </div>

        {/* Product Visibility */}
        <div>
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Product Visibility
          </label>
          <div className="flex gap-4">
            {[
              { value: 'public', label: 'Public', desc: 'Visible to all customers' },
              { value: 'draft', label: 'Draft', desc: 'Only visible to admins' },
              { value: 'private', label: 'Private', desc: 'Completely hidden' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value={option.value}
                  checked={data.visibility === option.value}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="text-brand-500"
                />
                <div>
                  <span className="text-sm font-medium text-navy-700 dark:text-white">
                    {option.label}
                  </span>
                  <p className="text-xs text-gray-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    {/* Add Brand Modal */}
    {showBrandModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-navy-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-navy-700 dark:text-white">Add New Brand</h3>
            <button onClick={() => setShowBrandModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
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
                    {brandImagePreview ? (
                      <img src={brandImagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="flex flex-col items-center justify-center px-2">
                        <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Upload</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Image</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleBrandImageChange} className="hidden" name="image" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Name</label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={brandForm.name}
                onChange={(e) => setBrandForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowBrandModal(false)} className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors">Cancel</button>
            <button onClick={handleSaveBrand} disabled={savingBrand} className="flex-1 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{savingBrand ? 'Saving...' : 'Add Brand'}</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Product; 