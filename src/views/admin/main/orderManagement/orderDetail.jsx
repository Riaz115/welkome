import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "components/card";
import { MdArrowBack, MdEdit, MdPrint, MdDownload, MdLocationOn, MdPayment, MdShoppingCart, MdPerson, MdCalendarToday, MdAttachMoney } from "react-icons/md";
import useOrderApiStore from "stores/useOrderApiStore";
import { useAuthStore } from "stores/useAuthStore";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getOrderById, updateOrderStatus, updatePaymentStatus, loading } = useOrderApiStore();
  const [order, setOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(id);
        setOrder(orderData);
        setNewStatus(orderData.status);
        setNewPaymentStatus(orderData.paymentDetails?.paymentStatus);
      } catch (error) {
        toast.error('Failed to fetch order details');
        navigate('/admin/main/orderManagement/all-orders');
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpdateStatus = async () => {
    if (!order || !newStatus) return;
    
    try {
      setIsUpdating(true);
      
      if (newStatus !== order.status) {
        await updateOrderStatus(order._id, newStatus, notes);
      }
      
      if (newPaymentStatus !== order.paymentDetails?.paymentStatus) {
        await updatePaymentStatus(order._id, newPaymentStatus);
      }
      
      // Refresh order data
      const updatedOrder = await getOrderById(id);
      setOrder(updatedOrder);
      
      toast.success('Order status updated successfully');
      setShowStatusModal(false);
      setNotes('');
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
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

  if (!order) {
    return (
      <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Order not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/admin/main/orderManagement/all-orders')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            <MdArrowBack className="w-4 h-4 mr-2" />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/main/orderManagement/all-orders')}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
              Order Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Order #{order.orderNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <MdEdit className="w-4 h-4" />
              Update Status
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <MdPrint className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card extra="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Order Status</h3>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentDetails?.paymentStatus)}`}>
                  Payment: {order.paymentDetails?.paymentStatus?.charAt(0).toUpperCase() + order.paymentDetails?.paymentStatus?.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
                <p className="font-medium text-navy-700 dark:text-white">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Order Source:</span>
                <p className="font-medium text-navy-700 dark:text-white capitalize">{order.orderSource?.replace('_', ' ')}</p>
              </div>
              {order.deliveredAt && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Delivered:</span>
                  <p className="font-medium text-navy-700 dark:text-white">{formatDate(order.deliveredAt)}</p>
                </div>
              )}
              {order.cancelledAt && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Cancelled:</span>
                  <p className="font-medium text-navy-700 dark:text-white">{formatDate(order.cancelledAt)}</p>
                </div>
              )}
            </div>
            {order.notes && (
              <div className="mt-4">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Notes:</span>
                <p className="text-navy-700 dark:text-white text-sm mt-1">{order.notes}</p>
              </div>
            )}
          </Card>

          {/* Order Items */}
          <Card extra="p-6">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-navy-600 rounded-lg">
                  <img
                    src={item.productImage || '/placeholder-product.png'}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-navy-700 dark:text-white">{item.productName}</h4>
                    {item.variantDetails && (item.variantDetails.color || item.variantDetails.size) && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.variantDetails.color && `Color: ${item.variantDetails.color}`}
                        {item.variantDetails.color && item.variantDetails.size && ', '}
                        {item.variantDetails.size && `Size: ${item.variantDetails.size}`}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-navy-700 dark:text-white">${item.unitPrice}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per unit</p>
                    <p className="font-semibold text-brand-600 dark:text-brand-400">${item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping Address */}
          <Card extra="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdLocationOn className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Shipping Address</h3>
            </div>
            <div className="text-sm">
              <p className="font-medium text-navy-700 dark:text-white">{order.shippingAddress?.fullName}</p>
              <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress?.phone}</p>
              <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress?.address}</p>
              <p className="text-gray-600 dark:text-gray-300">
                {order.shippingAddress?.city}, {order.shippingAddress?.district}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card extra="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdPerson className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Customer</h3>
            </div>
            <div className="text-sm">
              <p className="font-medium text-navy-700 dark:text-white">
                {order.userId?.firstName} {order.userId?.lastName}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{order.userId?.email}</p>
              {order.userId?.phone && (
                <p className="text-gray-600 dark:text-gray-300">{order.userId?.phone}</p>
              )}
            </div>
          </Card>

          {/* Payment Details */}
          <Card extra="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdPayment className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Payment</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Method:</span>
                <span className="text-navy-700 dark:text-white capitalize">
                  {order.paymentDetails?.method?.replace('_', ' ')}
                </span>
              </div>
              {order.paymentDetails?.phoneNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span className="text-navy-700 dark:text-white">{order.paymentDetails?.phoneNumber}</span>
                </div>
              )}
              {order.paymentDetails?.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Transaction ID:</span>
                  <span className="text-navy-700 dark:text-white font-mono text-xs">
                    {order.paymentDetails?.transactionId}
                  </span>
                </div>
              )}
              {order.paymentDetails?.paymentDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Payment Date:</span>
                  <span className="text-navy-700 dark:text-white">{formatDate(order.paymentDetails?.paymentDate)}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Order Summary */}
          <Card extra="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdAttachMoney className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Order Summary</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
                <span className="text-navy-700 dark:text-white">${order.pricing?.subtotal}</span>
              </div>
              {order.pricing?.shippingCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Shipping:</span>
                  <span className="text-navy-700 dark:text-white">${order.pricing?.shippingCost}</span>
                </div>
              )}
              {order.pricing?.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Discount:</span>
                  <span className="text-green-600 dark:text-green-400">-${order.pricing?.discountAmount}</span>
                </div>
              )}
              {order.pricing?.taxAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Tax:</span>
                  <span className="text-navy-700 dark:text-white">${order.pricing?.taxAmount}</span>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-navy-600 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-navy-700 dark:text-white">Total:</span>
                  <span className="text-brand-600 dark:text-brand-400">${order.pricing?.totalAmount}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Applied Coupon */}
          {order.appliedCoupon?.couponCode && (
            <Card extra="p-6">
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">Applied Coupon</h3>
              <div className="text-sm">
                <p className="font-medium text-navy-700 dark:text-white">{order.appliedCoupon?.couponCode}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.appliedCoupon?.discountType} - ${order.appliedCoupon?.discountAmount} off
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-700">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                <MdEdit className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">Update Order Status</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Update the status and payment status for this order.</p>
              </div>
            </div>
            
            <div className="mb-6 rounded-xl border border-gray-200 p-4 text-sm dark:border-white/10">
              <div className="font-semibold text-navy-700 dark:text-white">Order: {order.orderNumber}</div>
              <div className="mt-1 text-gray-600 dark:text-gray-300">Customer: {order.userId?.firstName} {order.userId?.lastName}</div>
              <div className="text-gray-600 dark:text-gray-300">Amount: ${order.pricing?.totalAmount}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Status
              </label>
              <select
                value={newPaymentStatus}
                onChange={(e) => setNewPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this status update..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowStatusModal(false)} 
                disabled={isUpdating} 
                className={`rounded-xl px-5 py-3 text-sm ${isUpdating ? 'cursor-not-allowed opacity-60' : ''} border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-navy-600`}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateStatus} 
                disabled={isUpdating} 
                className={`inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 ${isUpdating ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isUpdating && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
