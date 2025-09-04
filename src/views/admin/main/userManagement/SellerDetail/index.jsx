import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'components/card';
import { 
  MdArrowBack, 
  MdCheckCircle, 
  MdCancel, 
  MdPending, 
  MdStore, 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdBusiness, 
  MdDescription, 
  MdWeb, 
  MdAccountBalance, 
  MdPerson, 
  MdShare, 
  MdDownload,
  MdVisibility,
  MdClose,
  MdPictureAsPdf,
  MdImage
} from 'react-icons/md';
import useSellerApiStore from 'stores/useSellerApiStore';
import { toast } from 'react-toastify';

const SellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  const { getSellerById, approveSeller, rejectSeller } = useSellerApiStore();

  useEffect(() => {
    fetchSellerDetails();
  }, [id]);

  const fetchSellerDetails = async () => {
    try {
      setLoading(true);
      const response = await getSellerById(id);
      setSeller(response.data || response);
    } catch (error) {
      toast.error('Failed to fetch seller details');
      console.error('Error fetching seller:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await approveSeller(id);
      toast.success('Seller approved successfully!');
      fetchSellerDetails(); // Refresh data
    } catch (error) {
      toast.error('Failed to approve seller');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      setActionLoading(true);
      await rejectSeller(id, rejectionReason);
      toast.success('Seller rejected successfully!');
      setShowRejectModal(false);
      setRejectionReason('');
      fetchSellerDetails(); // Refresh data
    } catch (error) {
      toast.error('Failed to reject seller');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          icon: <MdCheckCircle className="w-4 h-4" />,
          label: 'Approved'
        };
      case 'pending':
        return {
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          icon: <MdPending className="w-4 h-4" />,
          label: 'Pending'
        };
      case 'rejected':
        return {
          className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          icon: <MdCancel className="w-4 h-4" />,
          label: 'Rejected'
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
          icon: <MdPending className="w-4 h-4" />,
          label: 'Pending'
        };
    }
  };

  const downloadDocument = (document, type) => {
    if (document?.path) {
      window.open(document.path, '_blank');
    }
  };

  const handlePreviewDocument = (document, type) => {
    setPreviewDocument({ document, type });
    setShowDocumentPreview(true);
  };

  const getFileIcon = (path) => {
    const extension = path?.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <MdPictureAsPdf className="w-5 h-5 text-red-500" />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <MdImage className="w-5 h-5 text-blue-500" />;
    }
    return <MdDownload className="w-5 h-5 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="mt-3 h-full w-full">
        <Card extra="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading seller details...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="mt-3 h-full w-full">
        <Card extra="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400 mb-2">Seller not found</p>
              <button 
                onClick={() => navigate('/admin/main/userManagement/sellers')}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                Back to Sellers
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(seller.verificationStatus);


  return (
    <div className="mt-3 h-full w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/main/userManagement/sellers')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              <MdArrowBack className="w-5 h-5" />
              Back to Sellers
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                Seller Details
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Review and manage seller information
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${statusConfig.className}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
              <MdPerson className="w-5 h-5" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                <p className="text-navy-700 dark:text-white font-medium">{seller.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                <p className="text-navy-700 dark:text-white font-medium flex items-center gap-2">
                  <MdEmail className="w-4 h-4" />
                  {seller.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                <p className="text-navy-700 dark:text-white font-medium flex items-center gap-2">
                  <MdPhone className="w-4 h-4" />
                  {seller.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Registration Date</label>
                <p className="text-navy-700 dark:text-white font-medium">
                  {new Date(seller.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Business Information */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
              <MdStore className="w-5 h-5" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Business Name</label>
                <p className="text-navy-700 dark:text-white font-medium">{seller.businessName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Business Type</label>
                <p className="text-navy-700 dark:text-white font-medium">{seller.businessType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Registration Number</label>
                <p className="text-navy-700 dark:text-white font-medium">{seller.businessRegistrationNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Business Email</label>
                <p className="text-navy-700 dark:text-white font-medium flex items-center gap-2">
                  <MdEmail className="w-4 h-4" />
                  {seller.businessEmail || 'Not provided'}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Business Description</label>
                <p className="text-navy-700 dark:text-white font-medium">{seller.businessDescription || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Website</label>
                <p className="text-navy-700 dark:text-white font-medium flex items-center gap-2">
                  <MdWeb className="w-4 h-4" />
                  {seller.website ? (
                    <a href={seller.website} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">
                      {seller.website}
                    </a>
                  ) : 'Not provided'}
                </p>
              </div>
            </div>
          </Card>

          {/* Business Address */}
          {seller.businessAddress && Object.values(seller.businessAddress).some(val => val) && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <MdLocationOn className="w-5 h-5" />
                Business Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(seller.businessAddress).map(([key, value]) => (
                  value && (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="text-navy-700 dark:text-white font-medium">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}

          {/* Contact Person */}
          {seller.contactPerson && Object.values(seller.contactPerson).some(val => val) && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <MdPerson className="w-5 h-5" />
                Contact Person
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(seller.contactPerson).map(([key, value]) => (
                  value && (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </label>
                      <p className="text-navy-700 dark:text-white font-medium">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}

          {/* Bank Details */}
          {seller.bankDetails && Object.values(seller.bankDetails).some(val => val) && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <MdAccountBalance className="w-5 h-5" />
                Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(seller.bankDetails).map(([key, value]) => (
                  value && (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="text-navy-700 dark:text-white font-medium">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}

          {/* Social Media */}
          {seller.socialMedia && Object.values(seller.socialMedia).some(val => val) && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <MdShare className="w-5 h-5" />
                Social Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(seller.socialMedia).map(([key, value]) => (
                  value && (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </label>
                      <p className="text-navy-700 dark:text-white font-medium">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}

          {/* Payment & Delivery Options */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Business Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Payment Methods
                </label>
                <div className="flex flex-wrap gap-2">
                  {seller.paymentMethods?.map((method, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-300">
                      {method.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Delivery Options
                </label>
                <div className="flex flex-wrap gap-2">
                  {seller.deliveryOptions?.map((option, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900 dark:text-green-300">
                      {option.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          {seller.verificationStatus === 'pending' && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
                Verification Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MdCheckCircle className="w-5 h-5" />
                  {actionLoading ? 'Processing...' : 'Approve Seller'}
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MdCancel className="w-5 h-5" />
                  Reject Seller
                </button>
              </div>
            </Card>
          )}

          {/* Documents */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Documents
            </h3>
            <div className="space-y-3">
              {Object.entries(seller.documents || {}).map(([type, document]) => (
                document && document.path && (
                  <div key={type} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getFileIcon(document.filename)}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <p 
                          className="text-sm font-medium text-navy-700 dark:text-white truncate" 
                          title={type.replace(/([A-Z])/g, ' $1').trim()}
                        >
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p 
                          className="text-xs text-gray-500 dark:text-gray-400 truncate cursor-help" 
                          title={document.filename}
                        >
                          {document.filename}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button
                        onClick={() => handlePreviewDocument(document, type)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors hover:scale-105"
                        title="Preview Document"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadDocument(document, type)}
                        className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors hover:scale-105"
                        title="Download Document"
                      >
                        <MdDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              ))}
              {(!seller.documents || Object.keys(seller.documents).length === 0) && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MdDownload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No documents uploaded</p>
                </div>
              )}
            </div>
          </Card>

          {/* Rating */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Rating
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
                {seller.rating?.average?.toFixed(1) || '0.0'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {seller.rating?.totalReviews || 0} reviews
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <MdCancel className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                    Reject Seller Application
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide a reason for rejection
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seller Information
                </label>
                <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <p className="font-medium text-navy-700 dark:text-white">{seller?.businessName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{seller?.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Rejection <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a detailed reason for rejecting this seller application. This will help the seller understand what needs to be improved..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-navy-600 dark:text-white resize-none"
                  rows={5}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Be specific and constructive in your feedback
                  </p>
                  <p className="text-xs text-gray-400">
                    {rejectionReason.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <MdCancel className="w-4 h-4" />
                    Reject Seller
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {showDocumentPreview && previewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                {getFileIcon(previewDocument.document.filename)}
                <div>
                  <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                    {previewDocument.type.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {previewDocument.document.filename}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadDocument(previewDocument.document, previewDocument.type)}
                  className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title="Download"
                >
                  <MdDownload className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDocumentPreview(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 h-[calc(90vh-120px)] overflow-auto">
              {previewDocument.document.path && (
                <div className="w-full h-full">
                  {previewDocument.document.filename.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={previewDocument.document.path}
                      className="w-full h-full border-0 rounded-lg"
                      title={previewDocument.document.filename}
                    />
                  ) : (
                    <img
                      src={previewDocument.document.path}
                      alt={previewDocument.document.filename}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDetail;
