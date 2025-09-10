import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdSave, MdCancel, MdOutlineCloudUpload } from "react-icons/md";
import useFlashSaleApiStore from "stores/useFlashSaleApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";
import axiosInstance from "lib/axios";

const FlashSaleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { getFlashSaleById, createFlashSale, updateFlashSale } = useFlashSaleApiStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    startTime: "",
    endTime: "",
    applicablePrimeCategories: [],
    applicableCategories: [],
    applicableSubcategories: [],
    applicableBrands: [],
    usageLimit: "",
    userUsageLimit: 1,
    flashSaleType: "special",
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
      fetchFlashSaleData();
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

  const fetchFlashSaleData = async () => {
    try {
      const response = await getFlashSaleById(id);
      const flashSale = response.flashSale || response;
      
      setFormData({
        title: flashSale.title || "",
        description: flashSale.description || "",
        image: flashSale.image || null,
        discountType: flashSale.discountType || "percentage",
        discountValue: flashSale.discountValue || "",
        minOrderAmount: flashSale.minOrderAmount || "",
        maxDiscountAmount: flashSale.maxDiscountAmount || "",
        startTime: flashSale.startTime ? new Date(flashSale.startTime).toISOString().slice(0, 16) : "",
        endTime: flashSale.endTime ? new Date(flashSale.endTime).toISOString().slice(0, 16) : "",
        applicablePrimeCategories: flashSale.applicablePrimeCategories || [],
        applicableCategories: flashSale.applicableCategories || [],
        applicableSubcategories: flashSale.applicableSubcategories || [],
        applicableBrands: flashSale.applicableBrands || [],
        usageLimit: flashSale.usageLimit || "",
        userUsageLimit: flashSale.userUsageLimit || 1,
        flashSaleType: flashSale.flashSaleType || "special",
        position: flashSale.position || 0
      });

      if (flashSale.image) {
        setImagePreview(flashSale.image);
      }
    } catch (error) {
      toast.error("Failed to fetch flash sale data");
      navigate("/admin/main/flashSaleManagement");
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

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (formData.startTime && formData.endTime && new Date(formData.startTime) >= new Date(formData.endTime)) {
      newErrors.endTime = "End time must be after start time";
    }

    if (formData.startTime && new Date(formData.startTime) <= new Date()) {
      newErrors.startTime = "Start time must be in the future";
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
        const response = await updateFlashSale(id, submitData);
        if (response) {
          toast.success("Flash sale updated successfully");
          navigate("/admin/main/flashSaleManagement");
        }
      } else {
        const response = await createFlashSale(submitData);
        if (response) {
          toast.success("Flash sale created successfully");
          navigate("/admin/main/flashSaleManagement");
        }
      }
    } catch (error) {
      toast.error(isEdit ? "Failed to update flash sale" : "Failed to create flash sale");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/main/flashSaleManagement");
  };

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title={isEdit ? 'Edit Flash Sale' : 'Create New Flash Sale'}
        subtitle={isEdit ? 'Update flash sale details' : 'Add a new flash sale promotion'}
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
                  Flash Sale Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter an attractive flash sale title"
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
                  placeholder="Describe your flash sale offer or promotion"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flash Sale Image</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Upload Flash Sale Image *
                </label>
              <div className="flex w-full items-center justify-center rounded-[20px]">
                <div className="relative flex h-[200px] w-full max-w-[500px] flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Flash Sale preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('flashsale-image-input').click()}
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
                      onClick={() => document.getElementById('flashsale-image-input').click()}
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
                    id="flashsale-image-input"
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
                  Usage Limit
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 100 (leave empty for unlimited)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  User Usage Limit
                </label>
                <input
                  type="number"
                  name="userUsageLimit"
                  value={formData.userUsageLimit}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 1"
                />
              </div>
            </div>
          </div>

          {/* Time Settings Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Time Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.startTime ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white`}
                />
                {errors.startTime && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.startTime}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.endTime ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white`}
                />
                {errors.endTime && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.endTime}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Flash Sale Type
                </label>
                <select
                  name="flashSaleType"
                  value={formData.flashSaleType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
                >
                  <option value="daily">Daily Flash Sale</option>
                  <option value="weekly">Weekly Flash Sale</option>
                  <option value="monthly">Monthly Flash Sale</option>
                  <option value="special">Special Flash Sale</option>
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., 1"
                />
              </div>
            </div>
          </div>

          {/* Category Selection Section */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Selection</h3>
            </div>
            
            <div className="space-y-8">
              {/* Prime Categories */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Prime Categories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {primeCategories.map((primeCategory) => (
                    <label key={primeCategory._id || primeCategory.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-teal-300 dark:hover:border-teal-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicablePrimeCategories_${primeCategory.name}`}
                        checked={formData.applicablePrimeCategories.includes(primeCategory.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-teal-500 focus:ring-teal-500 focus:ring-2"
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
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Categories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <label key={category._id || category.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-teal-300 dark:hover:border-teal-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableCategories_${category.name}`}
                        checked={formData.applicableCategories.includes(category.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-teal-500 focus:ring-teal-500 focus:ring-2"
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
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Subcategories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {subcategories.map((subcategory) => (
                    <label key={subcategory._id || subcategory.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-teal-300 dark:hover:border-teal-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableSubcategories_${subcategory.name}`}
                        checked={formData.applicableSubcategories.includes(subcategory.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-teal-500 focus:ring-teal-500 focus:ring-2"
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
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Brands
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {brands.map((brand) => (
                    <label key={brand._id || brand.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-navy-600 rounded-lg border border-gray-200 dark:border-navy-500 hover:border-teal-300 dark:hover:border-teal-400 transition-colors duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`applicableBrands_${brand.name}`}
                        checked={formData.applicableBrands.includes(brand.name)}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-teal-500 focus:ring-teal-500 focus:ring-2"
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
                    {isEdit ? "Update Flash Sale" : "Create Flash Sale"}
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

export default FlashSaleForm;
