import React from "react";
import Card from "components/card";
import { MdInventory, MdDateRange } from "react-icons/md";

const ProductStatus = ({ productData, onUpdate }) => {
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
    if (stock === 0) return { 
      text: "Out of Stock", 
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    };
    if (stock <= lowStockThreshold) return { 
      text: "Low Stock", 
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    };
    return { 
      text: "In Stock", 
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    };
  };

  const stockStatus = getStockStatus(productData.stock, productData.lowStockThreshold);
  const variants = Array.isArray(productData.variants) ? productData.variants : [];
  const isMulti = variants.length > 1;

  return (
    <Card extra={"w-full mt-3 px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Variants
        </h4>
        <p className="mt-1 text-base text-gray-600">
          {isMulti ? 'All available combinations' : 'Single variant product'}
        </p>
      </div>

      {/* Status Cards */}
      <div className="mt-[37px] space-y-4">
        {/* Variants List */}
        <div className="rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/30">
                <MdInventory className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy-700 dark:text-white">{isMulti ? 'Multi Variant' : 'Single Variant'}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{isMulti ? `${variants.length} combinations` : 'One configuration'}</p>
              </div>
            </div>
            {isMulti && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {variants.length} variants
              </span>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {variants.length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-300">No variants found.</p>
            )}
            {variants.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-white/10">
                <span className="text-sm text-navy-700 dark:text-white">{v.value || v.name || `Variant #${idx + 1}`}</span>
                <span className="text-xs text-gray-500">#{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Dates */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            <MdDateRange className="h-6 w-6 text-brand-500" />
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Date Added
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Product creation date
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            {formatDate(productData.dateAdded)}
          </span>
        </div>

        {/* Product Identifiers */}
        <div className="rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 text-brand-600 dark:bg-brand-900/30">
              <span className="text-xs font-bold">#</span>
            </div>
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">Product Identifiers</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">SKU and MongoDB ObjectId</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">SKU:</span>
              <span className="text-sm font-mono font-medium text-navy-700 dark:text-white">{productData.sku}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Product ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-medium text-navy-700 dark:text-white truncate max-w-[200px]">{productData.id}</span>
                <button onClick={() => navigator.clipboard.writeText(productData.id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="Copy Product ID">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        {productData.stock <= productData.lowStockThreshold && (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700/50 dark:bg-yellow-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-200 p-2 dark:bg-yellow-800/50">
                <MdInventory className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                  Low Stock Alert
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-300">
                  Stock is below threshold of {productData.lowStockThreshold} units
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductStatus; 