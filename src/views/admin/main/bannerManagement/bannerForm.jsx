import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdSave, MdCancel, MdOutlineCloudUpload } from "react-icons/md";
import useBannerApiStore from "stores/useBannerApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";
import DropZonefile from "views/admin/main/ecommerce/settingsProduct/components/DropZonefile";
import axiosInstance from "lib/axios";

const BannerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { getBannerById, createBanner, updateBanner } = useBannerApiStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    validFrom: "",
    validUntil: "",
    applicablePrimeCategories: [],
    applicableCategories: [],
    applicableSubcategories: [],
    applicableBrands: [],
    bannerType: "general",
    position: 0
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [primeCategories, setPrimeCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchAllCategories();
    fetchBrands();

    if (isEdit && id) {
      fetchBannerData();
    }
  }, [isEdit, id]);

  const fetchAllCategories = async () => {
    try {
      const [primeResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
        axiosInstance.get("/categories/all-prime"),
        axiosInstance.get("/categories/all-categories"),
        axiosInstance.get("/categories/all-subcategories")
      ]);
      
      setPrimeCategories(primeResponse.data.data || []);
      setCategories(categoriesResponse.data.data || []);
      setSubcategories(subcategoriesResponse.data.data || []);
    } catch (error) {
      console.warn("Failed to fetch categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brands");
      setBrands(response.data.data || []);
    } catch (error) {
      console.warn("Failed to fetch brands:", error);
    }
  };

  const fetchBannerData = async () => {
    try {
      const response = await getBannerById(id);
      const banner = response.banner || response;
      
      setFormData({
        title: banner.title || "",
        description: banner.description || "",
        image: banner.image || null,
        discountType: banner.discountType || "percentage",
        discountValue: banner.discountValue || "",
        minOrderAmount: banner.minOrderAmount || "",
        maxDiscountAmount: banner.maxDiscountAmount || "",
        validFrom: banner.validFrom ? new Date(banner.validFrom).toISOString().split('T')[0] : "",
        validUntil: banner.validUntil ? new Date(banner.validUntil).toISOString().split('T')[0] : "",
        applicablePrimeCategories: banner.applicablePrimeCategories || [],
        applicableCategories: banner.applicableCategories || [],
        applicableSubcategories: banner.applicableSubcategories || [],
        applicableBrands: banner.applicableBrands || [],
        bannerType: banner.bannerType || "general",
        position: banner.position || 0
      });

      if (banner.image) {
        setImagePreview(banner.image);
      }
    } catch (error) {
      toast.error("Failed to fetch banner data");
      navigate("/admin/main/bannerManagement");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const { checked } = e.target;
      const fieldName = name.split('_')[0];
      const fieldValue = name.split('_')[1];
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: checked 
          ? [...prev[fieldName], fieldValue]
          : prev[fieldName].filter(item => item !== fieldValue)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageDrop = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.image && !imagePreview) {
      newErrors.image = "Image is required";
    }

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }

    if (formData.discountType === "percentage" && formData.discountValue > 100) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%";
    }

    if (!formData.validFrom) {
      newErrors.validFrom = "Valid from date is required";
    }

    if (!formData.validUntil) {
      newErrors.validUntil = "Valid until date is required";
    }

    if (formData.validFrom && formData.validUntil && new Date(formData.validFrom) >= new Date(formData.validUntil)) {
      newErrors.validUntil = "Valid until date must be after valid from date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = { ...formData };
      
      if (isEdit) {
        const response = await updateBanner(id, submitData);
        if (response) {
          toast.success("Banner updated successfully");
          navigate("/admin/main/bannerManagement");
        }
      } else {
        const response = await createBanner(submitData);
        if (response) {
          toast.success("Banner created successfully");
          navigate("/admin/main/bannerManagement");
        }
      }
    } catch (error) {
      toast.error(isEdit ? "Failed to update banner" : "Failed to create banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/main/bannerManagement");
  };

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title={isEdit ? 'Edit Banner' : 'Create New Banner'}
        subtitle={isEdit ? 'Update banner details' : 'Add a new promotional banner'}
        showBackButton={true}
        onBackClick={handleCancel}
        backButtonText="Back"
      />

      <Card extra="w-full">
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* Basic Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Banner Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter an attractive banner title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.title}
                </p>}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Describe your banner offer or promotion"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Banner Image</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Upload Banner Image *
                </label>
              <div className="flex w-full items-center justify-center rounded-[20px]">
                <div className="relative flex h-[200px] w-full max-w-[500px] flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Banner preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('banner-image-input').click()}
                        className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <MdOutlineCloudUpload className="text-gray-700 text-2xl" />
                        </div>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => document.getElementById('banner-image-input').click()}
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      <p className="text-[60px] text-navy-700">
                        <MdOutlineCloudUpload className="text-brand-500 dark:text-white" />
                      </p>
                      <p className="text-base font-bold text-navy-700 dark:text-white">
                        Drop your files here, or{" "}
                        <span className="font-bold text-brand-500 dark:text-brand-400">
                          browse
                        </span>
                      </p>
                      <p className="pt-1 text-sm text-gray-600">
                        PNG, JPG and GIF files are allowed
                      </p>
                    </button>
                  )}
                  <input
                    id="banner-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageDrop}
                    className="hidden"
                  />
                </div>
              </div>
                {errors.image && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.image}
                </p>}
              </div>
            </div>
          </div>

          {/* Discount Settings Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discount Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Discount Type *
                </label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
                >
                  <option value="percentage">Percentage Discount</option>
                  <option value="fixed">Fixed Amount Discount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Discount Value *
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.discountType === "percentage" ? "100" : undefined}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.discountValue ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder={formData.discountType === "percentage" ? "e.g., 20" : "e.g., 50"}
                />
                {errors.discountValue && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.discountValue}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Minimum Order Amount
                </label>
                <input
                  type="number"
                  name="minOrderAmount"
                  value={formData.minOrderAmount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Maximum Discount Amount
                </label>
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Valid From *
                </label>
                <input
                  type="date"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.validFrom ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white`}
                />
                {errors.validFrom && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.validFrom}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Valid Until *
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.validUntil ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white`}
                />
                {errors.validUntil && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.validUntil}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Banner Type
                </label>
                <select
                  name="bannerType"
                  value={formData.bannerType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
                >
                  <option value="general">General Banner</option>
                  <option value="homepage">Homepage Banner</option>
                  <option value="category">Category Banner</option>
                  <option value="product">Product Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Display Position
                </label>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 1"
                />
              </div>
            </div>
          </div>

          {/* Category Selection Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Selection</h3>
            </div>
            
            <div className="space-y-8">
              {/* Prime Categories */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Prime Categories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {primeCategories.map((primeCategory) => (
                    <label key={primeCategory._id || primeCategory.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-orange-300 dark:hover:border-orange-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicablePrimeCategories_${primeCategory.name}`}
                        checked={formData.applicablePrimeCategories.includes(primeCategory.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {primeCategory.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Categories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <label key={category._id || category.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-orange-300 dark:hover:border-orange-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableCategories_${category.name}`}
                        checked={formData.applicableCategories.includes(category.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Subcategories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {subcategories.map((subcategory) => (
                    <label key={subcategory._id || subcategory.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-orange-300 dark:hover:border-orange-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableSubcategories_${subcategory.name}`}
                        checked={formData.applicableSubcategories.includes(subcategory.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {subcategory.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Brands
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {brands.map((brand) => (
                    <label key={brand._id || brand.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-orange-300 dark:hover:border-orange-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableBrands_${brand.name}`}
                        checked={formData.applicableBrands.includes(brand.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 dark:border-navy-500 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
              >
                <MdCancel className="text-lg" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <MdSave className="text-lg" />
                    {isEdit ? "Update Banner" : "Create Banner"}
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default BannerForm;
