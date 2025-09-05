import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Card from "components/card";
import { MdArrowBack, MdCheck, MdClose, MdEdit, MdDelete } from "react-icons/md";
import useProductApiStore from "stores/useProductApiStore";
import { useAuthStore } from "stores/useAuthStore";
import { toast } from "react-toastify";

const ProductView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getProductById, approveProduct, rejectProduct, deleteProduct, loading } = useProductApiStore();
  
  const [product, setProduct] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (location.state?.product) {
          setProduct(location.state.product);
        } else {
          const productData = await getProductById(id);
          setProduct(productData);
        }
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/admin/main/marketsphere/product-management');
      }
    };

    fetchProduct();
  }, [id, location.state, getProductById, navigate]);

  const getFirstImageUrl = (p) => {
    if (!p) return '';
    if (p.coverImage) return p.coverImage;
    if (p.images && p.images.length > 0) {
      const firstImage = p.images[0];
      if (typeof firstImage === 'string') return firstImage;
      if (firstImage.file?.path) return firstImage.file.path;
      if (firstImage.preview) return firstImage.preview;
    }
    return '';
  };

  const canEditProduct = () => {
    if (!product) return false;
    
    const creatorId = product.creator?.id?.$oid || product.creator?.id;
    if (!creatorId) return false;
    
    const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id || currentUser._id;
    
    return creatorId === userId;
  };

  const canDeleteProduct = () => {
    if (!product) return false;
    
    const creatorId = product.creator?.id?.$oid || product.creator?.id;
    if (!creatorId) return false;
    
    const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id || currentUser._id;
    
    return creatorId === userId;
  };

  const canApproveReject = () => {
    return user?.role === 'admin';
  };

  const handleApprove = async () => {
    try {
      await approveProduct(id);
      setProduct(prev => ({ ...prev, status: 'approved', rejectionReason: '' }));
      toast.success('Product approved successfully');
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    try {
      setIsRejecting(true);
      await rejectProduct(id, rejectionReason);
      setProduct(prev => ({ ...prev, status: 'rejected', rejectionReason }));
      toast.success('Product rejected successfully');
      setShowRejectModal(false);
      setRejectionReason('');
    } catch (error) {
      toast.error('Failed to reject product');
    } finally {
      setIsRejecting(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(id);
      toast.success('Product deleted successfully');
      navigate('/admin/main/marketsphere/product-management');
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/main/marketsphere/product-settings/${id}`);
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

  if (!product) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Product not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/admin/main/marketsphere/product-management')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700"
          >
            <MdArrowBack className="w-4 h-4 mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const totalStock = Array.isArray(product.variants) ? 
    product.variants.reduce((sum, variant) => sum + Number(variant.stock || 0), 0) : 0;

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/main/marketsphere/product-management')}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
            >
              <MdArrowBack className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                {product.title || 'Product Details'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Product ID: {product._id?.$oid || product.id}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {canApproveReject() && product.status === 'pending' && (
              <>
                <button
                  onClick={handleApprove}
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  <MdCheck className="w-4 h-4 mr-2" />
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  <MdClose className="w-4 h-4 mr-2" />
                  Reject
                </button>
              </>
            )}
            
            {canEditProduct() && (
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                <MdEdit className="w-4 h-4 mr-2" />
                Edit
              </button>
            )}
            
            {canDeleteProduct() && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                <MdDelete className="w-4 h-4 mr-2" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Product Images
            </h3>
            <div className="space-y-4">
              {product.coverImage && (
                <div>
                  <img
                    src={product.coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Cover Image</p>
                </div>
              )}
              
              {product.images && product.images.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-navy-700 dark:text-white mb-2">
                    Additional Images
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.file?.path || image.preview || image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Product Videos */}
          {product.videos && product.videos.length > 0 && (
            <Card extra="p-6 mt-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
                Product Videos
              </h3>
              <div className="space-y-4">
                {product.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                      preload="metadata"
                    >
                      <source 
                        src={video.file?.path || video.preview || video} 
                        type="video/mp4" 
                      />
                      Your browser does not support the video tag.
                    </video>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Video {index + 1}: {video.name || `Video ${index + 1}`}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.title || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subtitle
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.subtitle || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Brand
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.brand || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  SKU
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">
                  {product.sku || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  product.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) || 'Unknown'}
                </span>
              </div>
            </div>
          </Card>

          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Pricing & Stock
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Base Price
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  ${product.price || 0}
                </p>
              </div>
              
              {product.discount > 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Discount
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {product.discount}%
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Final Price
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      ${product.finalPrice || 0}
                    </p>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Stock
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {totalStock} units
                </p>
              </div>
            </div>
          </Card>

          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Categories
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prime Category
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.primeCategory || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.category?.category || product.category || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subcategory
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.subcategory || '-'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card extra="p-6">
          <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
            Description
          </h3>
          <p className="text-sm text-gray-900 dark:text-white">
            {product.description || 'No description provided'}
          </p>
        </Card>
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-8">
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Product Variants
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/30">
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Variant</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Size</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">MRP</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Discount</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Final Price</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 dark:text-white">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-white/10">
                      <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.name}</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.variantValue}</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.size}</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">${variant.mrp}</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.discount}%</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">${variant.finalPrice}</td>
                      <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {product.creator && (
        <div className="mt-8">
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
              Creator Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.creator.name || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.creator.email || '-'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {product.creator.role || '-'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                <MdClose className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Reject Product</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Please provide a reason for rejecting this product.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejecting this product..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowRejectModal(false)} 
                disabled={isRejecting} 
                className={`rounded-xl px-5 py-3 text-sm ${isRejecting ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}
              >
                Cancel
              </button>
              <button 
                onClick={confirmReject} 
                disabled={isRejecting || !rejectionReason.trim()} 
                className={`inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 ${isRejecting || !rejectionReason.trim() ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isRejecting && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isRejecting ? 'Rejecting...' : 'Reject Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                <MdDelete className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Delete Product</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Are you sure you want to delete this product? This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="mb-6 rounded-xl border border-gray-200 p-4 text-sm dark:border-white/10">
              <div className="font-semibold text-navy-700 dark:text-white">{product.title || 'Untitled'}</div>
              <div className="mt-1 text-gray-600 dark:text-gray-300">SKU: {product.sku || '-'}</div>
              <div className="text-gray-600 dark:text-gray-300">ID: {product._id?.$oid || product.id}</div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                disabled={isDeleting} 
                className={`rounded-xl px-5 py-3 text-sm ${isDeleting ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                disabled={isDeleting} 
                className={`inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 ${isDeleting ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isDeleting && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
