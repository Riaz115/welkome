import { useState, useCallback, useEffect } from "react";
import { MdAdd, MdClose, MdOutlineCloudUpload, MdBusiness, MdPerson, MdVideoLibrary } from "react-icons/md";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import DropZonefile from "../DropZonefile";
import VideoDropZonefile from "../VideoDropZonefile";
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
  const [showPrimeCategoryOptions, setShowPrimeCategoryOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showSubcategoryOptions, setShowSubcategoryOptions] = useState(false);
  const [primeCategorySearch, setPrimeCategorySearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [subcategorySearch, setSubcategorySearch] = useState('');




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

  useEffect(() => {
    // Initialize search fields with selected values
    if (data.primeCategory) {
      setPrimeCategorySearch(data.primeCategory);
    } else {
      setPrimeCategorySearch('');
    }
    if (data.category) {
      setCategorySearch(data.category);
    } else {
      setCategorySearch('');
    }
    if (data.subcategory) {
      setSubcategorySearch(data.subcategory);
    } else {
      setSubcategorySearch('');
    }
  }, [data.primeCategory, data.category, data.subcategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the dropdown or input
      if (event.target.closest('.category-dropdown') || event.target.closest('.category-input')) {
        return;
      }

      if (showPrimeCategoryOptions) {
        setShowPrimeCategoryOptions(false);
      }
      if (showCategoryOptions) {
        setShowCategoryOptions(false);
      }
      if (showSubcategoryOptions) {
        setShowSubcategoryOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPrimeCategoryOptions, showCategoryOptions, showSubcategoryOptions]);

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
      setPrimeCategorySearch('');
      setCategorySearch('');
      setSubcategorySearch('');
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
      setCategorySearch('');
      setSubcategorySearch('');
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
      setSubcategorySearch('');
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

  const onVideoDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const files = acceptedFiles.map(file => {
        // Check if file is actually a video and has allowed extension
        const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/ogg'];
        const allowedExtensions = ['.mp4', '.mov', '.avi', '.webm', '.ogg'];

        const isValidType = allowedTypes.includes(file.type);
        const isValidExtension = allowedExtensions.some(ext =>
          file.name.toLowerCase().endsWith(ext)
        );

        if (!isValidType || !isValidExtension) {
          toast.error('Please upload only video files (MP4, MOV, AVI, WebM, OGG)');
          return null;
        }

        return {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        };
      }).filter(Boolean); // Remove null values

      if (files.length > 0) {
        onDataChange({
          videos: [...(data.videos || []), ...files]
        });
      }
    }
  }, [data.videos, onDataChange]);

  const removeVideo = (indexToRemove) => {
    const updatedVideos = (data.videos || []).filter((_, index) => index !== indexToRemove);
    onDataChange({ videos: updatedVideos });
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

  const filteredPrimeCategories = (primeCategories || []).filter(prime =>
    !primeCategorySearch || prime.name.toLowerCase().includes(primeCategorySearch.toLowerCase())
  );

  const filteredCategories = (categories || []).filter(category =>
    !categorySearch || category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredSubcategories = (subcategories || []).filter(subcategory =>
    !subcategorySearch || subcategory.name.toLowerCase().includes(subcategorySearch.toLowerCase())
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

        {/* Brand Selection - Single Row */}
        <div className="relative">
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Brand
          </label>
          <div className="relative">
            <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white/0 p-3 dark:!border-white/10 dark:!bg-navy-800">
              {data.brand && (
                <div className="flex items-center gap-2 flex-shrink-0 w-32">
                  {brands.find(b => b.name === data.brand)?.image && (
                    <img
                      src={brands.find(b => b.name === data.brand)?.image}
                      alt={data.brand}
                      className="h-8 w-8 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="text-sm text-navy-700 dark:text-white font-medium truncate">{data.brand}</span>
                </div>
              )}
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => {
                  setBrandSearch(e.target.value);
                  setShowBrandOptions(true);
                  if (!e.target.value) {
                    onDataChange({ brand: '', brandId: '' });
                  }
                }}
                onFocus={() => setShowBrandOptions(true)}
                placeholder={data.brand ? "Change brand..." : "Search or select brand..."}
                className="flex-1 bg-transparent text-sm outline-none dark:text-white"
              />
            </div>

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

        {/* Prime Category and Category Row - 2 columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Prime Category */}
          <div className="relative category-dropdown">
            <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
              Prime Category *
            </label>
            <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white/0 p-3 dark:!border-white/10 dark:!bg-navy-800">
              {data.primeCategory && (
                <div className="flex items-center gap-2 flex-shrink-0 w-32">
                  {primeCategories.find(p => p.name === data.primeCategory)?.image && (
                    <img
                      src={primeCategories.find(p => p.name === data.primeCategory)?.image}
                      alt={data.primeCategory}
                      className="h-8 w-8 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="text-sm text-navy-700 dark:text-white font-medium truncate">{data.primeCategory}</span>
                </div>
              )}
              <input
                type="text"
                value={primeCategorySearch}
                onChange={(e) => {
                  setPrimeCategorySearch(e.target.value);
                  setShowPrimeCategoryOptions(true);
                }}
                onClick={() => {
                  setPrimeCategorySearch('');
                  setShowPrimeCategoryOptions(true);
                }}
                onFocus={() => setShowPrimeCategoryOptions(true)}
                placeholder="Search or select prime category..."
                className="flex-1 bg-transparent text-sm outline-none dark:text-white"
              />
            </div>

            {showPrimeCategoryOptions && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-800">
                {filteredPrimeCategories.length > 0 ? (
                  filteredPrimeCategories.map((prime) => (
                    <div
                      key={prime._id || prime.id}
                      onClick={() => {
                        handleCategoryChange('prime', prime._id || prime.id);
                        setShowPrimeCategoryOptions(false);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer"
                    >
                      {prime.image && <img src={prime.image} alt={prime.name} className="h-8 w-8 rounded object-cover" />}
                      <span className="text-sm text-navy-700 dark:text-white">{prime.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No prime categories found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="relative category-dropdown">
            <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
              Category *
            </label>
            <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white/0 p-3 dark:!border-white/10 dark:!bg-navy-800">
              {data.category && (
                <div className="flex items-center gap-2 flex-shrink-0 w-32">
                  {categories.find(c => c.name === data.category)?.image && (
                    <img
                      src={categories.find(c => c.name === data.category)?.image}
                      alt={data.category}
                      className="h-8 w-8 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="text-sm text-navy-700 dark:text-white font-medium truncate">{data.category}</span>
                </div>
              )}
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                  setShowCategoryOptions(true);
                }}
                onClick={() => {
                  setCategorySearch('');
                  setShowCategoryOptions(true);
                }}
                onFocus={() => setShowCategoryOptions(true)}
                placeholder="Search or select category..."
                className="flex-1 bg-transparent text-sm outline-none dark:text-white"
                disabled={!data.primeCategoryId}
              />
            </div>

            {showCategoryOptions && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-800">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category._id || category.id}
                      onClick={() => {
                        handleCategoryChange('category', category._id || category.id);
                        setShowCategoryOptions(false);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer"
                    >
                      {category.image && <img src={category.image} alt={category.name} className="h-8 w-8 rounded object-cover" />}
                      <span className="text-sm text-navy-700 dark:text-white">{category.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No categories found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subcategory and Description Row - 2 columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Subcategory */}
          <div className="relative category-dropdown">
            <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
              Subcategory
            </label>
            <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white/0 p-3 dark:!border-white/10 dark:bg-navy-800">
              {data.subcategory && (
                <div className="flex items-center gap-2 flex-shrink-0 w-32">
                  {subcategories.find(s => s.name === data.subcategory)?.image && (
                    <img
                      src={subcategories.find(s => s.name === data.subcategory)?.image}
                      alt={data.subcategory}
                      className="h-8 w-8 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="text-sm text-navy-700 dark:text-white font-medium truncate">{data.subcategory}</span>
                </div>
              )}
              <input
                type="text"
                value={subcategorySearch}
                onChange={(e) => {
                  setSubcategorySearch(e.target.value);
                  setShowSubcategoryOptions(true);
                }}
                onClick={() => {
                  setSubcategorySearch('');
                  setShowSubcategoryOptions(true);
                }}
                onFocus={() => setShowSubcategoryOptions(true)}
                placeholder="Search or select subcategory..."
                className="flex-1 bg-transparent text-sm outline-none dark:text-white"
                disabled={!data.categoryId}
              />
            </div>

            {showSubcategoryOptions && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-800">
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((subcategory) => (
                    <div
                      key={subcategory._id || subcategory.id}
                      onClick={() => {
                        handleCategoryChange('subcategory', subcategory._id || subcategory.id);
                        setShowSubcategoryOptions(false);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer"
                    >
                      {subcategory.image && <img src={subcategory.image} alt={subcategory.name} className="h-8 w-8 rounded object-cover" />}
                      <span className="text-sm text-navy-700 dark:text-white">{subcategory.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No subcategories found
                  </div>
                )}
              </div>
            )}
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

        {/* Product Videos */}
        <div>
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Product Videos
          </label>
          <div className="flex w-full items-center justify-center rounded-[20px] mb-4">
            <VideoDropZonefile
              onDrop={onVideoDrop}
              content={
                <div className="flex p-10 h-[200px] w-full flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700">
                  <p className="text-[60px] text-navy-700">
                    <MdVideoLibrary className="text-brand-500 dark:text-white" />
                  </p>
                  <p className="text-lg font-bold text-navy-700 dark:text-white">
                    Drop video files here, or{" "}
                    <span className="font-bold text-brand-500 dark:text-brand-400">
                      browse
                    </span>
                  </p>
                  <p className="pt-2 text-sm text-gray-600">
                    MP4, MOV, AVI, WebM, OGG files are allowed
                  </p>
                </div>
              }
            />
          </div>

          {/* Uploaded Videos Preview */}
          {data.videos && data.videos.length > 0 && (
            <div className="flex flex-col items-center">
              <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white text-center">
                Uploaded Videos ({data.videos.length})
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-2xl">
                {data.videos.map((videoData, index) => (
                  <div key={index} className="relative group">
                    <video
                      src={videoData.preview}
                      controls
                      className="h-32 w-64 rounded-lg object-cover shadow-sm"
                    />
                    <button
                      onClick={() => removeVideo(index)}
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

        {/* Product Tags & SEO Slug */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Product Tags */}
          <div>
            <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
              Product Tags
            </label>
            <div className="flex gap-2 mb-3">
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

            {/* Tags Display */}
            {(data.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
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
            )}
          </div>

          {/* SEO Slug */}
          <div>
            <InputField
              label="SEO Slug (Auto-generated)"
              placeholder="product-url-slug"
              id="seoSlug"
              type="text"
              value={data.seoSlug}
              disabled={true}
              extra="opacity-60 cursor-not-allowed"
            />

          </div>
        </div>

        {/* Variant Configuration */}
        <div>
          <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
            Variant Configuration
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-white mb-3">
                Product Variants
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="variantMode"
                    value="single"
                    checked={data.variantMode === 'single'}
                    onChange={(e) => onDataChange({
                      variantMode: e.target.value,
                      enableSizeMatrix: false
                    })}
                    className="text-brand-500"
                  />
                  <span className="text-sm text-navy-700 dark:text-white">Single Variant</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="variantMode"
                    value="multi"
                    checked={data.variantMode === 'multi'}
                    onChange={(e) => onDataChange({
                      variantMode: e.target.value,
                      enableSizeMatrix: false
                    })}
                    className="text-brand-500"
                  />
                  <span className="text-sm text-navy-700 dark:text-white">Multi Variant</span>
                </label>
              </div>
            </div>

            {data.variantMode === 'single' && (
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-white mb-3">
                  Size Matrix
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="enableSizeMatrix"
                      value="false"
                      checked={!data.enableSizeMatrix}
                      onChange={(e) => onDataChange({ enableSizeMatrix: false })}
                      className="text-brand-500"
                    />
                    <span className="text-sm text-navy-700 dark:text-white">Single Sizing</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="enableSizeMatrix"
                      value="true"
                      checked={data.enableSizeMatrix}
                      onChange={(e) => onDataChange({ enableSizeMatrix: true })}
                      className="text-brand-500"
                    />
                    <span className="text-sm text-navy-700 dark:text-white">Multiple Sizing</span>
                  </label>
                </div>
              </div>
            )}

            {data.variantMode === 'multi' && (
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-white mb-3">
                  Variant Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedVariantType"
                      value="color"
                      checked={data.selectedVariantType === 'color'}
                      onChange={(e) => onDataChange({ 
                        selectedVariantType: e.target.value,
                        // Reset other variant values when changing type
                        colorValues: [],
                        modelValues: [],
                        customVariantName: '',
                        customVariantValues: []
                      })}
                      className="text-brand-500"
                    />
                    <span className="text-sm text-navy-700 dark:text-white">🎨 Color Variants</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedVariantType"
                      value="model"
                      checked={data.selectedVariantType === 'model'}
                      onChange={(e) => onDataChange({ 
                        selectedVariantType: e.target.value,
                        // Reset other variant values when changing type
                        colorValues: [],
                        modelValues: [],
                        customVariantName: '',
                        customVariantValues: []
                      })}
                      className="text-brand-500"
                    />
                    <span className="text-sm text-navy-700 dark:text-white">🏷️ Model Variants</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedVariantType"
                      value="custom"
                      checked={data.selectedVariantType === 'custom'}
                      onChange={(e) => onDataChange({ 
                        selectedVariantType: e.target.value,
                        // Reset other variant values when changing type
                        colorValues: [],
                        modelValues: [],
                        customVariantName: '',
                        customVariantValues: []
                      })}
                      className="text-brand-500"
                    />
                    <span className="text-sm text-navy-700 dark:text-white">⚙️ Custom Variants</span>
                  </label>
                </div>
              </div>
            )}
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