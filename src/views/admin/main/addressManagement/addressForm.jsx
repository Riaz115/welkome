import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdSave, MdCancel } from "react-icons/md";
import useAddressApiStore from "stores/useAddressApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";

const AddressForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { getAddressById, createAddress, updateAddress } = useAddressApiStore();

  const [formData, setFormData] = useState({
    contactName: "",
    contactPhone: "",
    country: "",
    state: "",
    city: "",
    area: "",
    streetAddress: "",
    buildingName: "",
    houseNumber: "",
    apartmentNumber: "",
    postalCode: "",
    landmark: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    isDefault: false,
    deliveryInstructions: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchAddressData();
    }
  }, [isEdit, id]);

  const fetchAddressData = async () => {
    try {
      const response = await getAddressById(id);
      const address = response;
      
      setFormData({
        contactName: address.contactName || "",
        contactPhone: address.contactPhone || "",
        country: address.country || "",
        state: address.state || "",
        city: address.city || "",
        area: address.area || "",
        streetAddress: address.streetAddress || "",
        buildingName: address.buildingName || "",
        houseNumber: address.houseNumber || "",
        apartmentNumber: address.apartmentNumber || "",
        postalCode: address.postalCode || "",
        landmark: address.landmark || "",
        coordinates: {
          latitude: address.coordinates?.latitude || "",
          longitude: address.coordinates?.longitude || ""
        },
        isDefault: address.isDefault || false,
        deliveryInstructions: address.deliveryInstructions || ""
      });
    } catch (error) {
      toast.error("Failed to fetch address data");
      navigate("/admin/main/addressManagement");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "Phone number must contain only numbers, +, -, spaces, and parentheses";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (formData.coordinates.latitude && (isNaN(formData.coordinates.latitude) || formData.coordinates.latitude < -90 || formData.coordinates.latitude > 90)) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (formData.coordinates.longitude && (isNaN(formData.coordinates.longitude) || formData.coordinates.longitude < -180 || formData.coordinates.longitude > 180)) {
      newErrors.longitude = "Longitude must be between -180 and 180";
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
      
      if (submitData.coordinates.latitude === "") {
        delete submitData.coordinates.latitude;
      }
      if (submitData.coordinates.longitude === "") {
        delete submitData.coordinates.longitude;
      }
      if (Object.keys(submitData.coordinates).length === 0) {
        delete submitData.coordinates;
      }

      if (isEdit) {
        const response = await updateAddress(id, submitData);
        if (response) {
          toast.success("Address updated successfully");
          navigate("/admin/main/addressManagement");
        }
      } else {
        const response = await createAddress(submitData);
        if (response) {
          toast.success("Address created successfully");
          navigate("/admin/main/addressManagement");
        }
      }
    } catch (error) {
      toast.error(isEdit ? "Failed to update address" : "Failed to create address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/main/addressManagement");
  };

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title={isEdit ? 'Edit Address' : 'Create New Address'}
        subtitle={isEdit ? 'Update address details' : 'Add a new address'}
        showBackButton={true}
        onBackClick={handleCancel}
        backButtonText="Back"
      />

      <Card extra="w-full">
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* Contact Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.contactName ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter contact name"
                />
                {errors.contactName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.contactName}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.contactPhone ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter phone number"
                />
                {errors.contactPhone && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.contactPhone}
                </p>}
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.country ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter country"
                />
                {errors.country && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.country}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.city ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.city}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Area
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address Details</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Street Address *
                </label>
                <textarea
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.streetAddress ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none`}
                  placeholder="Enter street address"
                />
                {errors.streetAddress && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.streetAddress}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Building Name
                </label>
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter building name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  House Number
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter house number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Apartment Number
                </label>
                <input
                  type="text"
                  name="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter apartment number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter nearby landmark"
                />
              </div>
            </div>
          </div>

          {/* Coordinates Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Coordinates (Optional)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="coordinates.latitude"
                  value={formData.coordinates.latitude}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.latitude ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="e.g., 40.7128"
                />
                {errors.latitude && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.latitude}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="coordinates.longitude"
                  value={formData.coordinates.longitude}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.longitude ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-navy-600"
                  } bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="e.g., -74.0060"
                />
                {errors.longitude && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.longitude}
                </p>}
              </div>
            </div>
          </div>

          {/* Additional Settings Section */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-navy-700 dark:to-navy-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Set as default address
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Delivery Instructions
                </label>
                <textarea
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-navy-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Enter any special delivery instructions"
                />
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
                    {isEdit ? "Update Address" : "Create Address"}
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

export default AddressForm;
