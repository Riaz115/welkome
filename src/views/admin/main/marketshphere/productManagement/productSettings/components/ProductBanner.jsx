import React from "react";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const ProductBanner = ({ productData, onUpdate }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "discontinued":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStockStatus = (stock, lowStockThreshold) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 dark:text-red-400" };
    if (stock <= lowStockThreshold) return { text: "Low Stock", color: "text-yellow-600 dark:text-yellow-400" };
    return { text: "In Stock", color: "text-green-600 dark:text-green-400" };
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ status: newStatus });
  };

  const stockStatus = getStockStatus(productData.stock, productData.lowStockThreshold);

  return (
    <Card extra={"items-center pt-[16px] pb-10 px-[16px] bg-cover"}>
      {/* background and product image */}
      <div
        className="jsu relative mt-1 flex h-28 w-full justify-center rounded-[20px] bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-xl bg-white p-2 shadow-lg">
          <img 
            className="h-full w-full rounded-lg object-cover" 
            src={productData.image || 'https://via.placeholder.com/150'} 
            alt={productData.name} 
          />
        </div>
      </div>
      
      {/* product name and details */}
      <div className="mt-14 flex flex-col items-center">
        <h4 className="mt-1 text-xl font-bold text-navy-700 dark:text-white text-center">
          {productData.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          SKU: {productData.sku}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {productData.primeCategory} → {productData.category}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Added: {formatDate(productData.dateAdded)}
        </p>
        
        <div className="mt-3 flex items-center justify-center gap-3">
          <h6 className="text-sm font-normal text-gray-600 dark:text-gray-300">
            Product Status:
          </h6>
          <select
            className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-navy-700 dark:!bg-navy-800 dark:!border-white/10 dark:text-white"
            value={productData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        
        <div className="mt-2 flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(productData.status)}`}>
            {productData.status}
          </span>
          <span className={`text-xs font-medium ${stockStatus.color}`}>
            {stockStatus.text} ({productData.stock} units)
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              ${productData.discountedPrice || productData.price}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Price</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {productData.stock}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Stock</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductBanner; 