import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

const ProductInformation = ({ productData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: productData.name || '',
    description: productData.description || '',
    weight: productData.weight || '',
    color: productData.color || '',
    collection: productData.collection || '',
    category: productData.category || '',
    primeCategory: productData.primeCategory || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <Card extra={"w-full mt-3 px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Product Information
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can change basic product information
        </p>
      </div>
      
      {/* inputs */}
      <div className="mt-[37px] grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <InputField
            extra="mb-3"
            label="Product Name"
            placeholder="Enter product name"
            id="productname"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <InputField
            extra="mb-3"
            label="Weight"
            placeholder="e.g., 221g or 2.1kg"
            id="weight"
            type="text"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
          />
          <InputField
            extra="mb-3"
            label="Color"
            placeholder="e.g., Natural Titanium"
            id="color"
            type="text"
            value={formData.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
          />
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <InputField
            extra="mb-3"
            label="Collection"
            placeholder="e.g., iPhone 15 Series"
            id="collection"
            type="text"
            value={formData.collection}
            onChange={(e) => handleInputChange('collection', e.target.value)}
          />
          
          <div className="mb-3">
            <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
              Prime Category
            </label>
            <select
              value={formData.primeCategory}
              onChange={(e) => handleInputChange('primeCategory', e.target.value)}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            >
              <option value="">Select Prime Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
            </select>
          </div>

          <InputField
            extra="mb-3"
            label="Category"
            placeholder="e.g., Smartphones"
            id="category"
            type="text"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          />
        </div>
      </div>
      
      {/* Description - full width */}
      <div className="mt-3">
        <TextField
          label="Product Description"
          placeholder="Enter detailed product description..."
          id="description"
          cols="30"
          rows="6"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>

      <div className="flex w-full justify-end mt-6">
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

export default ProductInformation; 