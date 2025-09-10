import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdToggleOn, 
  MdToggleOff,
  MdCalendarToday,
  MdPeople,
  MdShoppingCart,
  MdPercent,
  MdAttachMoney
} from "react-icons/md";
import useCouponApiStore from "stores/useCouponApiStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";
import PageHeader from "components/common/PageHeader";

const CouponDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCouponById, deleteCoupon, toggleCouponStatus, loading } = useCouponApiStore();
  
  const [coupon, setCoupon] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await getCouponById(id);
        console.log('Fetched coupon data for detail:', response); // Debug log
        
        // Handle both direct coupon object and nested data structure
        const couponData = response.coupon || response;
        setCoupon(couponData);
      } catch (error) {
        console.error('Error fetching coupon for detail:', error); // Debug log
        toast.error('Failed to fetch coupon details');
        navigate('/admin/main/couponManagement');
      }
    };

    if (id) {
      fetchCoupon();
    }
  }, [id, getCouponById, navigate]);

  const handleEdit = () => {
    navigate(`/admin/main/couponManagement/edit-coupon/${id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCoupon(id);
      toast.success('Coupon deleted successfully');
      navigate('/admin/main/couponManagement');
    } catch (error) {
      toast.error('Failed to delete coupon');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      await toggleCouponStatus(id);
      setCoupon(prev => ({ ...prev, isActive: !prev.isActive }));
      toast.success(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to toggle coupon status');
    } finally {
      setIsToggling(false);
    }
  };

  const getStatusColor = (isActive, validUntil) => {
    const now = new Date();
    const expiryDate = new Date(validUntil);
    
    if (!isActive) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    } else if (expiryDate < now) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    } else {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getStatusText = (isActive, validUntil) => {
    const now = new Date();
    const expiryDate = new Date(validUntil);
    
    if (!isActive) {
      return 'Inactive';
    } else if (expiryDate < now) {
      return 'Expired';
    } else {
      return 'Active';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  if (!coupon) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Coupon not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The requested coupon could not be found.
          </p>
          <button
            onClick={() => navigate('/admin/main/couponManagement')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all duration-200"
          >
            <MdArrowBack className="w-4 h-4" />
            Back to Coupons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title="Coupon Details"
        subtitle="View and manage coupon information"
        showBackButton={true}
        onBackClick={() => navigate('/admin/main/couponManagement')}
        backButtonText="Back"
        secondaryActions={[
          {
            label: coupon.isActive ? "Deactivate" : "Activate",
            icon: coupon.isActive ? <MdToggleOff className="w-4 h-4" /> : <MdToggleOn className="w-4 h-4" />,
            onClick: handleToggleStatus,
            disabled: isToggling,
            variant: coupon.isActive ? "danger" : "secondary"
          },
          {
            label: "Edit",
            icon: <MdEdit className="w-4 h-4" />,
            onClick: handleEdit,
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card extra="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-2">
                  {coupon.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400">
                    {coupon.code}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(coupon.isActive, coupon.validUntil)}`}>
                    {getStatusText(coupon.isActive, coupon.validUntil)}
                  </span>
                </div>
              </div>
            </div>

            {coupon.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {coupon.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                {coupon.discountType === 'percentage' ? (
                  <MdPercent className="w-6 h-6 text-blue-500" />
                ) : (
                  <MdAttachMoney className="w-6 h-6 text-green-500" />
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Discount</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {coupon.discountType === 'percentage' 
                      ? `${coupon.discountValue}%` 
                      : formatCurrency(coupon.discountValue)
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <MdShoppingCart className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Min Order</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(coupon.minOrderAmount || 0)}
                  </p>
                </div>
              </div>

              {coupon.maxDiscountAmount && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                  <MdAttachMoney className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Max Discount</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(coupon.maxDiscountAmount)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <MdPeople className="w-6 h-6 text-indigo-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usage</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {coupon.usedCount || 0}/{coupon.usageLimit || '∞'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Validity Period */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Validity Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <MdCalendarToday className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Valid From</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(coupon.validFrom)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                <MdCalendarToday className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Valid Until</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(coupon.validUntil)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Usage Statistics */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Usage Statistics
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Usage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {coupon.usedCount || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Usage Limit</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {coupon.usageLimit || 'Unlimited'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Per User Limit</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {coupon.userUsageLimit || 1}
                </p>
              </div>
              {coupon.lastUsedAt && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Used</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDate(coupon.lastUsedAt)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Created Information */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Created Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created At</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(coupon.createdAt)}
                </p>
              </div>
              {coupon.createdBy && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created By</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {coupon.createdBy.name || coupon.createdBy.email || 'Unknown'}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
        itemName={coupon?.code}
        itemType="Coupon Code"
        isLoading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CouponDetail;
