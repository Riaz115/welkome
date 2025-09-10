import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdEdit, MdDelete, MdLocationOn, MdHome, MdBusiness, MdStar, MdPhone, MdEmail, MdMap, MdDirections } from "react-icons/md";
import useAddressApiStore from "stores/useAddressApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";
import Card from "components/card";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";

const AddressDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAddressById, deleteAddress, setDefaultAddress } = useAddressApiStore();

  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: null,
    addressTitle: ""
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAddressData();
    }
  }, [id]);

  const fetchAddressData = async () => {
    try {
      setLoading(true);
      const response = await getAddressById(id);
      setAddress(response);
    } catch (error) {
      toast.error("Failed to fetch address details");
      navigate("/admin/main/addressManagement");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/main/addressManagement/edit-address/${id}`);
  };

  const handleDelete = () => {
    setDeleteModal({
      isOpen: true,
      addressId: id,
      addressTitle: address?.contactName || "Address"
    });
  };

  const handleSetDefault = async () => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated successfully");
      await fetchAddressData();
    } catch (error) {
      toast.error("Failed to update default address");
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.addressId) return;

    setIsDeleting(true);
    try {
      await deleteAddress(deleteModal.addressId);
      toast.success("Address deleted successfully");
      navigate("/admin/main/addressManagement");
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

  const getAddressTypeIcon = () => {
    if (!address) return <MdLocationOn className="w-6 h-6 text-gray-500" />;
    
    const buildingName = address.buildingName?.toLowerCase() || "";
    const streetAddress = address.streetAddress?.toLowerCase() || "";
    
    if (buildingName.includes("home") || buildingName.includes("house") || streetAddress.includes("home")) {
      return <MdHome className="w-6 h-6 text-green-500" />;
    } else if (buildingName.includes("office") || buildingName.includes("building") || streetAddress.includes("office")) {
      return <MdBusiness className="w-6 h-6 text-blue-500" />;
    } else {
      return <MdLocationOn className="w-6 h-6 text-gray-500" />;
    }
  };

  const getAddressType = () => {
    if (!address) return "Other";
    
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

  const formatFullAddress = () => {
    if (!address) return "";
    
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

  const getGoogleMapsUrl = () => {
    if (!address) return "";
    
    const addressString = formatFullAddress();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
  };

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-12">
          <MdLocationOn className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Address not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            The address you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title="Address Details"
        subtitle={`View details for ${address.contactName}'s address`}
        showBackButton={true}
        onBackClick={() => navigate("/admin/main/addressManagement")}
        backButtonText="Back to Addresses"
        actions={[
          {
            label: "Set as Default",
            icon: <MdStar className="w-4 h-4" />,
            onClick: handleSetDefault,
            variant: "secondary",
            disabled: address.isDefault
          },
          {
            label: "Edit Address",
            icon: <MdEdit className="w-4 h-4" />,
            onClick: handleEdit,
            variant: "primary"
          },
          {
            label: "Delete Address",
            icon: <MdDelete className="w-4 h-4" />,
            onClick: handleDelete,
            variant: "danger"
          }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Address Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card extra="w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <MdPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">Name:</span>
                  <span className="text-gray-900 dark:text-white">{address.contactName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">Phone:</span>
                  <span className="text-gray-900 dark:text-white">{address.contactPhone}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Address Details */}
          <Card extra="w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  {getAddressTypeIcon()}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Full Address:</span>
                  <p className="text-gray-900 dark:text-white leading-relaxed">{formatFullAddress()}</p>
                </div>
                
                {address.landmark && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">Landmark:</span>
                    <span className="text-gray-900 dark:text-white">{address.landmark}</span>
                  </div>
                )}
                
                {address.deliveryInstructions && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Delivery Instructions:</span>
                    <p className="text-gray-900 dark:text-white leading-relaxed">{address.deliveryInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Location Breakdown */}
          <Card extra="w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <MdMap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location Breakdown</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Country:</span>
                    <span className="text-gray-900 dark:text-white">{address.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">State:</span>
                    <span className="text-gray-900 dark:text-white">{address.state || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">City:</span>
                    <span className="text-gray-900 dark:text-white">{address.city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Area:</span>
                    <span className="text-gray-900 dark:text-white">{address.area || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Building:</span>
                    <span className="text-gray-900 dark:text-white">{address.buildingName || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">House #:</span>
                    <span className="text-gray-900 dark:text-white">{address.houseNumber || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Apt #:</span>
                    <span className="text-gray-900 dark:text-white">{address.apartmentNumber || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Postal:</span>
                    <span className="text-gray-900 dark:text-white">{address.postalCode || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{getAddressType()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Default:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    address.isDefault 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}>
                    {address.isDefault ? "Yes" : "No"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    address.isActive 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {address.isActive ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Coordinates Card */}
          {address.coordinates && (address.coordinates.latitude || address.coordinates.longitude) && (
            <Card extra="w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coordinates</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Latitude:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {address.coordinates.latitude || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Longitude:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {address.coordinates.longitude || "N/A"}
                    </span>
                  </div>
                </div>
                
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <MdDirections className="w-4 h-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </Card>
          )}

          {/* Timestamps Card */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timestamps</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Created:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(address.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Updated:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(address.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        itemName={deleteModal.addressTitle}
        itemType="address"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AddressDetail;
