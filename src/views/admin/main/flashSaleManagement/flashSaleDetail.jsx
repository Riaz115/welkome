import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdToggleOn, 
  MdToggleOff,
  MdAccessTime,
  MdLocalOffer,
  MdCategory,
  MdBrandingWatermark,
  MdPeople,
  MdTrendingUp,
  MdVisibility,
  MdCalendarToday,
  MdTimer
} from "react-icons/md";
import useFlashSaleApiStore from "stores/useFlashSaleApiStore";
import { toast } from "react-toastify";
import PageHeader from "components/common/PageHeader";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";

const FlashSaleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getFlashSaleById, deleteFlashSale, toggleFlashSaleStatus } = useFlashSaleApiStore();
  
  const [flashSale, setFlashSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    flashSaleId: null,
    flashSaleTitle: ""
  });

  useEffect(() => {
    if (id) {
      fetchFlashSaleData();
    }
  }, [id]);

  const fetchFlashSaleData = async () => {
    try {
      setLoading(true);
      const response = await getFlashSaleById(id);
      const flashSaleData = response.flashSale || response;
      setFlashSale(flashSaleData);
    } catch (error) {
      toast.error("Failed to fetch flash sale data");
      navigate("/admin/main/flashSaleManagement");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isActive, startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (!isActive) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    } else if (now < start) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    } else if (now > end) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    } else {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getStatusText = (isActive, startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (!isActive) {
      return 'Inactive';
    } else if (now < start) {
      return 'Upcoming';
    } else if (now > end) {
      return 'Expired';
    } else {
      return 'Active';
    }
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours`;
    if (hours > 0) return `${hours} hours, ${minutes} minutes`;
    return `${minutes} minutes`;
  };

  const getTimeUntilStart = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = start - now;
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours`;
    if (hours > 0) return `${hours} hours, ${minutes} minutes`;
    return `${minutes} minutes`;
  };

  const handleEdit = () => {
    navigate(`/admin/main/flashSaleManagement/edit-flashsale/${id}`);
  };

  const handleDelete = () => {
    setDeleteModal({
      isOpen: true,
      flashSaleId: id,
      flashSaleTitle: flashSale.title
    });
  };

  const handleToggleStatus = async () => {
    try {
      await toggleFlashSaleStatus(id);
      toast.success("Flash sale status updated successfully");
      await fetchFlashSaleData();
    } catch (error) {
      toast.error("Failed to update flash sale status");
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.flashSaleId) return;

    setIsDeleting(true);
    try {
      await deleteFlashSale(deleteModal.flashSaleId);
      toast.success("Flash sale deleted successfully");
      navigate("/admin/main/flashSaleManagement");
    } catch (error) {
      toast.error("Failed to delete flash sale");
    } finally {
      setIsDeleting(false);
      handleCloseDeleteModal();
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      flashSaleId: null,
      flashSaleTitle: ""
    });
  };

  const handleBack = () => {
    navigate("/admin/main/flashSaleManagement");
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

  if (!flashSale) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Flash Sale Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The flash sale you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Flash Sales
          </button>
        </div>
      </div>
    );
  }

  const statusText = getStatusText(flashSale.isActive, flashSale.startTime, flashSale.endTime);
  const timeRemaining = getTimeRemaining(flashSale.endTime);
  const timeUntilStart = getTimeUntilStart(flashSale.startTime);

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title="Flash Sale Details"
        subtitle={`Viewing details for "${flashSale.title}"`}
        showBackButton={true}
        onBackClick={handleBack}
        backButtonText="Back to Flash Sales"
        primaryAction={{
          label: "Edit Flash Sale",
          icon: <MdEdit className="w-4 h-4" />,
          onClick: handleEdit
        }}
        secondaryActions={[
          {
            label: flashSale.isActive ? "Deactivate" : "Activate",
            icon: flashSale.isActive ? <MdToggleOff className="w-4 h-4" /> : <MdToggleOn className="w-4 h-4" />,
            onClick: handleToggleStatus,
            variant: "secondary"
          },
          {
            label: "Delete",
            icon: <MdDelete className="w-4 h-4" />,
            onClick: handleDelete,
            variant: "danger"
          }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flash Sale Image */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdVisibility className="w-5 h-5" />
                Flash Sale Image
              </h3>
              <div className="relative">
                <img
                  src={flashSale.image}
                  alt={flashSale.title}
                  className="w-full h-64 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "/img/default-flashsale.png";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flashSale.isActive, flashSale.startTime, flashSale.endTime)}`}>
                    {statusText}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Basic Information */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdLocalOffer className="w-5 h-5" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {flashSale.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">
                    {flashSale.description || "No description provided"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Flash Sale Type
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    {flashSale.flashSaleType}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Position
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.position}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Discount Information */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdTrendingUp className="w-5 h-5" />
                Discount Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount Type
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {flashSale.discountType}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount Value
                  </label>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {flashSale.discountValue}
                    {flashSale.discountType === "percentage" ? "%" : " Rs"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Order Amount
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.minOrderAmount ? `${flashSale.minOrderAmount} Rs` : "No minimum"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Discount Amount
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.maxDiscountAmount ? `${flashSale.maxDiscountAmount} Rs` : "No limit"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Usage Information */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdPeople className="w-5 h-5" />
                Usage Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Usage Limit
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.usageLimit ? flashSale.usageLimit : "Unlimited"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Used Count
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.usedCount || 0}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    User Usage Limit
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {flashSale.userUsageLimit || 1} per user
                  </p>
                </div>
              </div>
              {flashSale.usageLimit && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Usage Progress
                  </label>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((flashSale.usedCount / flashSale.usageLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {flashSale.usedCount} of {flashSale.usageLimit} uses
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Applicable Categories */}
          {(flashSale.applicablePrimeCategories?.length > 0 || flashSale.applicableCategories?.length > 0 || flashSale.applicableSubcategories?.length > 0 || flashSale.applicableBrands?.length > 0) && (
            <Card extra="w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MdCategory className="w-5 h-5" />
                  Applicable Categories & Brands
                </h3>
                <div className="space-y-4">
                  {flashSale.applicablePrimeCategories?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Prime Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {flashSale.applicablePrimeCategories.map((primeCategory, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm">
                            {primeCategory}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {flashSale.applicableCategories?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {flashSale.applicableCategories.map((category, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {flashSale.applicableSubcategories?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subcategories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {flashSale.applicableSubcategories.map((subcategory, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">
                            {subcategory}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {flashSale.applicableBrands?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brands
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {flashSale.applicableBrands.map((brand, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Time */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdAccessTime className="w-5 h-5" />
                Status & Timing
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Status
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flashSale.isActive, flashSale.startTime, flashSale.endTime)}`}>
                    {statusText}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Time
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(flashSale.startTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Time
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(flashSale.endTime).toLocaleString()}
                  </p>
                </div>
                {statusText === 'Active' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time Remaining
                    </label>
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      {timeRemaining}
                    </p>
                  </div>
                )}
                {statusText === 'Upcoming' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Starts In
                    </label>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {timeUntilStart}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MdTrendingUp className="w-5 h-5" />
                Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Click Count
                  </label>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {flashSale.clickCount || 0}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Created At
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(flashSale.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {flashSale.lastUsedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Used
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(flashSale.lastUsedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card extra="w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MdEdit className="w-4 h-4" />
                  Edit Flash Sale
                </button>
                <button
                  onClick={handleToggleStatus}
                  className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    flashSale.isActive 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {flashSale.isActive ? (
                    <>
                      <MdToggleOff className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <MdToggleOn className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MdDelete className="w-4 h-4" />
                  Delete Flash Sale
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Flash Sale"
        message="Are you sure you want to delete this flash sale? This action cannot be undone."
        itemName={deleteModal.flashSaleTitle}
        itemType="flash sale"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FlashSaleDetail;
