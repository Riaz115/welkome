import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdSave, MdCancel } from "react-icons/md";
import useCouponApiStore from "stores/useCouponApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";

const CouponForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { createCoupon, updateCoupon, getCouponById, loading } = useCouponApiStore();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    userUsageLimit: "1",
    validFrom: "",
    validUntil: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const fetchCoupon = async () => {
        try {
          const response = await getCouponById(id);
          console.log('Fetched coupon data:', response); // Debug log
          
          // Handle both direct coupon object and nested data structure
          const coupon = response.coupon || response;
          
          if (coupon) {
            setFormData({
              code: coupon.code || "",
              name: coupon.name || "",
              description: coupon.description || "",
              discountType: coupon.discountType || "percentage",
              discountValue: coupon.discountValue || "",
              minOrderAmount: coupon.minOrderAmount || "",
              maxDiscountAmount: coupon.maxDiscountAmount || "",
              usageLimit: coupon.usageLimit || "",
              userUsageLimit: coupon.userUsageLimit || "1",
              validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().split('T')[0] : "",
              validUntil: coupon.validUntil ? new Date(coupon.validUntil).toISOString().split('T')[0] : ""
            });
          }
        } catch (error) {
          console.error('Error fetching coupon:', error); // Debug log
          toast.error('Failed to fetch coupon details');
          navigate('/admin/main/couponManagement');
        }
      };
      fetchCoupon();
    }
  }, [isEdit, id, getCouponById, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Coupon code must be at least 3 characters";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Coupon name is required";
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

    if (formData.validFrom && formData.validUntil) {
      const fromDate = new Date(formData.validFrom);
      const untilDate = new Date(formData.validUntil);
      if (fromDate >= untilDate) {
        newErrors.validUntil = "Valid until date must be after valid from date";
      }
    }

    if (formData.minOrderAmount && formData.minOrderAmount < 0) {
      newErrors.minOrderAmount = "Minimum order amount cannot be negative";
    }

    if (formData.maxDiscountAmount && formData.maxDiscountAmount < 0) {
      newErrors.maxDiscountAmount = "Maximum discount amount cannot be negative";
    }

    if (formData.usageLimit && formData.usageLimit < 0) {
      newErrors.usageLimit = "Usage limit cannot be negative";
    }

    if (formData.userUsageLimit && formData.userUsageLimit < 1) {
      newErrors.userUsageLimit = "User usage limit must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        code: formData.code.toUpperCase().trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        discountType: formData.discountType,
        discountValue: parseFloat(formData.discountValue),
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
        userUsageLimit: parseInt(formData.userUsageLimit),
        validFrom: new Date(formData.validFrom).toISOString(),
        validUntil: new Date(formData.validUntil).toISOString()
      };

      if (isEdit) {
        await updateCoupon(id, submitData);
        toast.success('Coupon updated successfully');
      } else {
        await createCoupon(submitData);
        toast.success('Coupon created successfully');
      }

      navigate('/admin/main/couponManagement');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to save coupon';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/main/couponManagement');
  };

  if (loading && isEdit) {
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
        title={isEdit ? 'Edit Coupon' : 'Create New Coupon'}
        subtitle={isEdit ? 'Update coupon details' : 'Add a new discount coupon'}
        showBackButton={true}
        onBackClick={handleCancel}
        backButtonText="Back"
      />

      <Card extra="w-full">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Coupon Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.code ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                placeholder="e.g., SAVE20"
                disabled={isEdit}
              />
              {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Coupon Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                placeholder="e.g., 20% Off Sale"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                placeholder="Describe the coupon offer..."
              />
            </div>

            {/* Discount Configuration */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Discount Configuration
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Discount Type *
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Discount Value *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  min="0"
                  step={formData.discountType === "percentage" ? "0.01" : "0.01"}
                  max={formData.discountType === "percentage" ? "100" : undefined}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.discountValue ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                  } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                  placeholder={formData.discountType === "percentage" ? "20" : "10"}
                />
                <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
                  {formData.discountType === "percentage" ? "%" : "$"}
                </span>
              </div>
              {errors.discountValue && <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Minimum Order Amount ($)
              </label>
              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.minOrderAmount ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                placeholder="0"
              />
              {errors.minOrderAmount && <p className="text-red-500 text-sm mt-1">{errors.minOrderAmount}</p>}
            </div>

            {formData.discountType === "percentage" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Maximum Discount Amount ($)
                </label>
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.maxDiscountAmount ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                  } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                  placeholder="No limit"
                />
                {errors.maxDiscountAmount && <p className="text-red-500 text-sm mt-1">{errors.maxDiscountAmount}</p>}
              </div>
            )}

            {/* Usage Limits */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Usage Limits
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Total Usage Limit
              </label>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.usageLimit ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                placeholder="Unlimited"
              />
              {errors.usageLimit && <p className="text-red-500 text-sm mt-1">{errors.usageLimit}</p>}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Leave empty for unlimited usage
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Per User Usage Limit
              </label>
              <input
                type="number"
                name="userUsageLimit"
                value={formData.userUsageLimit}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.userUsageLimit ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
                placeholder="1"
              />
              {errors.userUsageLimit && <p className="text-red-500 text-sm mt-1">{errors.userUsageLimit}</p>}
            </div>

            {/* Validity Period */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Validity Period
              </h3>
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.validFrom ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
              />
              {errors.validFrom && <p className="text-red-500 text-sm mt-1">{errors.validFrom}</p>}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.validUntil ? 'border-red-500' : 'border-gray-300 dark:border-navy-600'
                } bg-white dark:bg-navy-800 text-gray-900 dark:text-white`}
              />
              {errors.validUntil && <p className="text-red-500 text-sm mt-1">{errors.validUntil}</p>}
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-navy-700">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-all duration-200"
            >
              <MdCancel className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200"
            >
              <MdSave className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Coupon' : 'Create Coupon')}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CouponForm;
