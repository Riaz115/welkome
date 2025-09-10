import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdToggleOn,
  MdToggleOff,
  MdImage,
  MdPercent,
  MdAttachMoney,
  MdCalendarToday,
  MdCategory,
  MdBrandingWatermark,
  MdVisibility
} from "react-icons/md";
import useBannerApiStore from "stores/useBannerApiStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "components/modals/DeleteConfirmationModal";
import PageHeader from "components/common/PageHeader";

const BannerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBannerById, deleteBanner, toggleBannerStatus, loading } = useBannerApiStore();

  const [banner, setBanner] = useState(null);
  const [isToggling, setIsToggling] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    bannerId: null,
    bannerTitle: ""
  });

  useEffect(() => {
    if (id) {
      fetchBannerData();
    }
  }, [id]);

  const fetchBannerData = async () => {
    try {
      const response = await getBannerById(id);
      const bannerData = response.banner || response;
      setBanner(bannerData);
    } catch (error) {
      toast.error("Failed to fetch banner data");
      navigate("/admin/main/bannerManagement");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/main/bannerManagement/edit-banner/${id}`);
  };

  const handleDelete = () => {
    setDeleteModal({
      isOpen: true,
      bannerId: id,
      bannerTitle: banner?.title || ""
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.bannerId) return;

    try {
      await deleteBanner(deleteModal.bannerId);
      toast.success("Banner deleted successfully");
      navigate("/admin/main/bannerManagement");
    } catch (error) {
      toast.error("Failed to delete banner");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      bannerId: null,
      bannerTitle: ""
    });
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      await toggleBannerStatus(id);
      toast.success(`Banner ${banner.isActive ? 'deactivated' : 'activated'} successfully`);
      await fetchBannerData();
    } catch (error) {
      toast.error("Failed to update banner status");
    } finally {
      setIsToggling(false);
    }
  };

  const getStatusInfo = () => {
    if (!banner) return { status: "Unknown", color: "gray" };

    const now = new Date();
    const isExpired = new Date(banner.validUntil) < now;
    const isValid = banner.isActive && new Date(banner.validFrom) <= now && !isExpired;

    if (isExpired) {
      return { status: "Expired", color: "red" };
    }

    return isValid 
      ? { status: "Active", color: "green" }
      : { status: "Inactive", color: "gray" };
  };

  const statusInfo = getStatusInfo();

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Banner not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <PageHeader
        title="Banner Details"
        subtitle="View and manage banner information"
        showBackButton={true}
        onBackClick={() => navigate('/admin/main/bannerManagement')}
        backButtonText="Back"
        secondaryActions={[
          {
            label: banner.isActive ? "Deactivate" : "Activate",
            icon: banner.isActive ? <MdToggleOff className="w-4 h-4" /> : <MdToggleOn className="w-4 h-4" />,
            onClick: handleToggleStatus,
            disabled: isToggling,
            variant: banner.isActive ? "danger" : "secondary"
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
        <div className="lg:col-span-2 space-y-6">
          <Card extra="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdImage className="w-6 h-6 text-brand-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Banner Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Title
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {banner.title}
                </p>
              </div>

              {banner.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Description
                  </label>
                  <p className="text-gray-700 dark:text-gray-300">
                    {banner.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Banner Type
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {banner.bannerType}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Position
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {banner.position}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Banner Image
                </label>
                <div className="mt-2">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200 dark:border-navy-600"
                    onError={(e) => {
                      e.target.src = "/img/default-banner.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card extra="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdPercent className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Discount Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Discount Type
                </label>
                <div className="flex items-center gap-2">
                  {banner.discountType === "percentage" ? (
                    <MdPercent className="w-4 h-4 text-green-500" />
                  ) : (
                    <MdAttachMoney className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {banner.discountType}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Discount Value
                </label>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {banner.discountValue}
                  {banner.discountType === "percentage" ? "%" : " Rs"}
                </p>
              </div>

              {banner.minOrderAmount > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Minimum Order Amount
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {banner.minOrderAmount} Rs
                  </p>
                </div>
              )}

              {banner.maxDiscountAmount && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Maximum Discount Amount
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {banner.maxDiscountAmount} Rs
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card extra="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdCalendarToday className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Validity Period
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Valid From
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(banner.validFrom).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Valid Until
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(banner.validUntil).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card extra="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdVisibility className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Status & Analytics
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Current Status
                </label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  statusInfo.color === "green" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : statusInfo.color === "red"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                }`}>
                  {statusInfo.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Click Count
                </label>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {banner.clickCount || 0}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Created At
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(banner.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Last Updated
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(banner.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {(banner.applicablePrimeCategories?.length > 0 ||
            banner.applicableCategories?.length > 0 || 
            banner.applicableSubcategories?.length > 0 || 
            banner.applicableBrands?.length > 0) && (
            <Card extra="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MdCategory className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Applicable Items
                </h3>
              </div>
              
              <div className="space-y-4">
                {banner.applicablePrimeCategories?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Prime Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {banner.applicablePrimeCategories.map((primeCategory, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs rounded-full"
                        >
                          {primeCategory}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {banner.applicableCategories?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {banner.applicableCategories.map((category, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {banner.applicableSubcategories?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Subcategories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {banner.applicableSubcategories.map((subcategory, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full"
                        >
                          {subcategory}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {banner.applicableBrands?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Brands
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {banner.applicableBrands.map((brand, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        itemName={deleteModal.bannerTitle}
        itemType="banner"
      />
    </div>
  );
};

export default BannerDetail;
