import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { MdAdd, MdClose } from "react-icons/md";

const ProductPricing = ({ productData, onUpdate }) => {
  const [formData, setFormData] = useState({
    price: productData.price || '',
    discountedPrice: productData.discountedPrice || '',
    currency: productData.currency || 'USD',
    sku: productData.sku || '',
    stock: productData.stock || 0,
    lowStockThreshold: productData.lowStockThreshold || 10,
    tags: productData.tags || [],
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <Card extra={"w-full px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Pricing & Inventory
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Manage product pricing, stock, and identification
        </p>
      </div>

      {/* Pricing Section */}
      <div className="mt-[37px] mb-6">
        <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
          Pricing Information
        </h6>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputField
            extra="mb-3"
            label="Regular Price"
            placeholder="e.g., 999"
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || '')}
          />
          <InputField
            extra="mb-3"
            label="Discounted Price"
            placeholder="e.g., 899"
            id="discountedPrice"
            type="number"
            value={formData.discountedPrice}
            onChange={(e) => handleInputChange('discountedPrice', parseFloat(e.target.value) || '')}
          />
        </div>
        
        <div className="mb-3">
          <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="UGX">UGX - Ugandan Shilling</option>
          </select>
        </div>
      </div>

      {/* Product Identifiers */}
      <div className="mb-6">
        <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
          Product Identifiers
        </h6>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <InputField
              extra="mb-3"
              label="SKU *"
              placeholder="e.g., ELC-IPH-001"
              id="sku"
              type="text"
              value={formData.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
            />
          </div>
          
          <div>
            <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
              Product ID
            </label>
            <div className="mt-2 flex h-12 w-full items-center rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm dark:!border-white/10 dark:bg-gray-800">
              <span className="font-mono text-navy-700 dark:text-white truncate">
                {productData.id}
              </span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(productData.id)}
                className="ml-auto flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Copy Product ID"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              MongoDB ObjectId (read-only)
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Management */}
      <div className="mb-6">
        <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
          Inventory Management
        </h6>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputField
            extra="mb-3"
            label="Current Stock"
            placeholder="e.g., 25"
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
          />
          <InputField
            extra="mb-3"
            label="Low Stock Threshold"
            placeholder="e.g., 10"
            id="lowStockThreshold"
            type="number"
            value={formData.lowStockThreshold}
            onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-6">
        <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
          Product Tags
        </h6>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
              >
                <MdClose className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add a tag..."
            className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
          />
          <button
            onClick={handleAddTag}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            <MdAdd className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <button 
          onClick={handleSave}
          className="rounded-xl bg-brand-500 px-8 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Save Changes
        </button>
      </div>
    </Card>
  );
};

export default ProductPricing; 