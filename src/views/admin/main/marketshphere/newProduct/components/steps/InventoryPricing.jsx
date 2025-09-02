import { useState, useEffect, useCallback } from "react";
import { MdRefresh, MdClose, MdOutlineCloudUpload } from "react-icons/md";
import Card from "components/card";
import DropZonefile from "../DropZonefile";

const InventoryPricing = ({ data, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [modalSuffix, setModalSuffix] = useState('');

  const calculateFinalPrice = (mrp, discount, discountedPrice) => {
    const mrpValue = parseFloat(mrp) || 0;
    const discountValue = parseFloat(discount) || 0;
    const discountedPriceValue = parseFloat(discountedPrice) || 0;

    if (mrpValue === 0) return {
      discount: 0,
      discountedPrice: 0,
      finalPrice: 0
    };

    if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
      const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
      return {
        discount: Math.min(calculatedDiscount, 100).toFixed(2),
        discountedPrice: discountedPriceValue.toFixed(2),
        finalPrice: discountedPriceValue.toFixed(2)
      };
    }

    if (discountValue > 0) {
      const clampedDiscount = Math.min(discountValue, 100);
      const calculatedDiscountedPrice = mrpValue - (mrpValue * (clampedDiscount / 100));
      return {
        discount: clampedDiscount.toFixed(2),
        discountedPrice: calculatedDiscountedPrice.toFixed(2),
        finalPrice: calculatedDiscountedPrice.toFixed(2)
      };
    }

    return {
      discount: 0,
      discountedPrice: mrpValue.toFixed(2),
      finalPrice: mrpValue.toFixed(2)
    };
  };

  const updateVariant = (variantId, field, value) => {
    const updatedVariants = data.variants.map(variant => {
      if (variant.id === variantId) {
        const updatedVariant = { ...variant, [field]: value };
        
        if (field === 'mrp') {
          const mrpValue = parseFloat(value) || 0;
          const discountValue = parseFloat(variant.discount) || 0;
          const discountedPriceValue = parseFloat(variant.discountedPrice) || 0;
          
          if (discountValue > 0 && mrpValue > 0) {
            const calculatedDiscountedPrice = mrpValue - (mrpValue * (discountValue / 100));
            updatedVariant.discountedPrice = calculatedDiscountedPrice.toFixed(2);
            updatedVariant.finalPrice = calculatedDiscountedPrice.toFixed(2);
          } else if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
            const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
            updatedVariant.discount = Math.min(calculatedDiscount, 100).toFixed(2);
            updatedVariant.finalPrice = discountedPriceValue.toFixed(2);
          } else {
            updatedVariant.finalPrice = mrpValue.toFixed(2);
          }
        } else if (field === 'discount') {
          const mrpValue = parseFloat(updatedVariant.mrp) || 0;
          const discountValue = parseFloat(value) || 0;
          if (discountValue > 0 && mrpValue > 0) {
            const calculatedDiscountedPrice = mrpValue - (mrpValue * (discountValue / 100));
            updatedVariant.discountedPrice = calculatedDiscountedPrice.toFixed(2);
            updatedVariant.finalPrice = calculatedDiscountedPrice.toFixed(2);
          } else {
            updatedVariant.discountedPrice = mrpValue.toFixed(2);
            updatedVariant.finalPrice = mrpValue.toFixed(2);
          }
        } else if (field === 'discountedPrice') {
          const mrpValue = parseFloat(variant.mrp) || 0;
          const discountedPriceValue = parseFloat(value) || 0;
          if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
            const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
            updatedVariant.discount = Math.min(calculatedDiscount, 100).toFixed(2);
            updatedVariant.finalPrice = discountedPriceValue.toFixed(2);
          }
        }

                if (field === 'mrp' && !variant.sku) {
          const skuBase = data.title ? data.title.substring(0, 3).toUpperCase() : 'PRD';
          const variantSuffix = variant.name !== 'Default' ? `-${variant.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase()}` : '';
          updatedVariant.sku = `${skuBase}${variantSuffix}-${Date.now().toString().slice(-4)}`;
        }

        return updatedVariant;
      }
      return variant;
    });

    onDataChange({ variants: updatedVariants });
  };



  // Auto-generate SKU for a specific variant
  const generateSKU = (variantId) => {
    const variant = data.variants.find(v => v.id === variantId);
    if (variant) {
      const skuBase = data.title ? data.title.substring(0, 3).toUpperCase() : 'PRD';
      const variantSuffix = variant.name !== 'Default' ? `-${variant.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase()}` : '';
      const sku = `${skuBase}${variantSuffix}-${Date.now().toString().slice(-4)}`;
      updateVariant(variantId, 'sku', sku);
    }
  };

  // Auto-generate Barcode for a specific variant
  const generateBarcode = (variantId) => {
    const variant = data.variants.find(v => v.id === variantId);
    if (variant) {
      const barcode = `BAR${variant.id.toString().padStart(3, '0')}${Date.now().toString().slice(-6)}`;
      updateVariant(variantId, 'barcode', barcode);
    }
  };

  const onImageDrop = useCallback((acceptedFiles, variantId) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageData = {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      };
      
      const updatedVariants = data.variants.map(variant => {
        if (variant.id === variantId) {
          const existingImages = variant.images || [];
          return { ...variant, images: [...existingImages, imageData] };
        }
        return variant;
      });
      
      onDataChange({ variants: updatedVariants });
    }
  }, [data.variants, onDataChange]);

  const removeVariantImage = (variantId, imageIndex) => {
    const updatedVariants = data.variants.map(variant => {
      if (variant.id === variantId) {
        const existingImages = variant.images || [];
        const newImages = existingImages.filter((_, index) => index !== imageIndex);
        return { ...variant, images: newImages };
      }
      return variant;
    });
    
    onDataChange({ variants: updatedVariants });
  };

  const openModal = (type, title, placeholder, suffix = '') => {
    setModalType(type);
    setModalTitle(title);
    setModalPlaceholder(placeholder);
    setModalSuffix(suffix);
    setModalValue('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalValue('');
  };

  const handleModalSubmit = () => {
    if (modalValue.trim()) {
      if (modalType === 'mrp') {
        autoFillAllVariants('mrp', modalValue);
      } else if (modalType === 'stock') {
        autoFillAllVariants('stock', modalValue);
      } else if (modalType === 'discount') {
        autoFillAllVariants('discount', modalValue);
      } else if (modalType === 'discountedPrice') {
        autoFillAllVariants('discountedPrice', modalValue);
      }
      closeModal();
    }
  };



  const autoFillAllVariants = (field, value) => {
    const updatedVariants = data.variants.map(variant => {
      const updatedVariant = { ...variant, [field]: value };
      

      if (field === 'mrp') {
        const mrpValue = parseFloat(value) || 0;
        const discountValue = parseFloat(variant.discount) || 0;
        const discountedPriceValue = parseFloat(variant.discountedPrice) || 0;
        
        if (discountValue > 0 && mrpValue > 0) {
          const calculatedDiscountedPrice = mrpValue - (mrpValue * (discountValue / 100));
          updatedVariant.discountedPrice = calculatedDiscountedPrice.toFixed(2);
          updatedVariant.finalPrice = calculatedDiscountedPrice.toFixed(2);
        } else if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
          const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
          updatedVariant.discount = Math.min(calculatedDiscount, 100).toFixed(2);
          updatedVariant.finalPrice = discountedPriceValue.toFixed(2);
        } else {
          updatedVariant.finalPrice = mrpValue.toFixed(2);
        }
             } else if (field === 'discount') {
         const mrpValue = parseFloat(variant.mrp) || 0;
         const discountValue = parseFloat(value) || 0;
         if (discountValue > 0 && mrpValue > 0) {
           const calculatedDiscountedPrice = mrpValue - (mrpValue * (discountValue / 100));
           updatedVariant.discountedPrice = calculatedDiscountedPrice.toFixed(2);
           updatedVariant.finalPrice = calculatedDiscountedPrice.toFixed(2);
         } else {
           updatedVariant.discountedPrice = mrpValue.toFixed(2);
           updatedVariant.finalPrice = mrpValue.toFixed(2);
         }
       } else if (field === 'discountedPrice') {
        const mrpValue = parseFloat(variant.mrp) || 0;
        const discountedPriceValue = parseFloat(value) || 0;
        if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
          const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
          updatedVariant.discount = Math.min(calculatedDiscount, 100).toFixed(2);
          updatedVariant.finalPrice = discountedPriceValue.toFixed(2);
        }
      }
      
      return updatedVariant;
    });
    onDataChange({ variants: updatedVariants });
  };

  const validateVariants = () => {
    const newErrors = {};
    let hasErrors = false;

    data.variants.forEach(variant => {
      const variantErrors = {};
      
      if (!variant.mrp || parseFloat(variant.mrp) <= 0) {
        variantErrors.mrp = 'MRP is required';
        hasErrors = true;
      }
      
      if (!variant.stock || parseInt(variant.stock) < 0) {
        variantErrors.stock = 'Stock quantity is required';
        hasErrors = true;
      }

      if (Object.keys(variantErrors).length > 0) {
        newErrors[variant.id] = variantErrors;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  useEffect(() => {
    if (data.variants && data.variants.length > 0) {
      validateVariants();
    }
  }, [data.variants]);

     return (
     <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8 overflow-hidden">
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Inventory, Pricing & Variant Matrix
      </h4>

      <div className="mt-6 space-y-6">
        <Card extra="p-5">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-lg font-bold text-navy-700 dark:text-white">
              Variant Summary
            </h6>
            <div className="text-sm text-gray-600">
              {data.variants?.length || 0} variant(s) to configure
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {data.variants?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Total Variants</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {data.variants?.filter(v => v.mrp && parseFloat(v.mrp) > 0).length || 0}
              </div>
              <div className="text-xs text-gray-600">Priced</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {data.variants?.filter(v => v.stock && parseInt(v.stock) > 0).length || 0}
              </div>
              <div className="text-xs text-gray-600">In Stock</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {data.variants?.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0) || 0}
              </div>
              <div className="text-xs text-gray-600">Total Stock</div>
            </div>
          </div>
          
          {/* Variant Type Breakdown */}
          {data.variants && data.variants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-3">Variant Breakdown:</h6>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const variantTypes = {};
                  data.variants.forEach(variant => {
                    if (variant.variantType && variant.variantValue) {
                      const key = `${variant.variantType}: ${variant.variantValue}`;
                      if (!variantTypes[key]) {
                        variantTypes[key] = { count: 0, sizes: new Set() };
                      }
                      variantTypes[key].count++;
                      if (variant.size) {
                        variantTypes[key].sizes.add(variant.size);
                      }
                    }
                  });
                  
                  return Object.entries(variantTypes).map(([key, info]) => (
                    <div key={key} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">{key}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {info.count} variant{info.count > 1 ? 's' : ''}
                        {info.sizes.size > 0 && ` • ${Array.from(info.sizes).join(', ')}`}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </Card>

        {/* Variant Matrix Table */}
        <Card extra="p-5">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-lg font-bold text-navy-700 dark:text-white">
              Variant Matrix
            </h6>
            <div className="flex gap-2">
              <button
                onClick={() => openModal('mrp', 'Auto-fill MRP', 'Enter MRP amount', '₹')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
              >
                Auto-fill MRP
              </button>
              <button
                onClick={() => openModal('stock', 'Auto-fill Stock', 'Enter stock quantity', '')}
                className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
              >
                Auto-fill Stock
              </button>
              <button
                onClick={() => openModal('discount', 'Auto-fill Discount', 'Enter discount percentage', '%')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
              >
                Auto-fill Discount
              </button>
              <button
                onClick={() => openModal('discountedPrice', 'Auto-fill Discounted Price', 'Enter discounted price', '₹')}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
              >
                Auto-fill Discounted Price
              </button>
            </div>
          </div>

                     {/* Responsive Table */}
           <div className="overflow-x-auto max-w-full">
             <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[120px]">
                    Variant
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[100px]">
                    MRP (₹) *
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[100px]">
                    Discount %
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[120px]">
                    Discounted Price (₹)
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[100px]">
                    Final Price (₹)
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[100px]">
                    Stock Qty *
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[120px]">
                    SKU Code
                  </th>
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[120px]">
                    Barcode
                  </th>
                                     <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[120px]">
                     Images
                   </th>
                </tr>
              </thead>
              <tbody>
                {(data.variants || []).map((variant) => (
                  <tr key={variant.id} className="border-b border-gray-100 dark:border-gray-800">
                    {/* Variant Name */}
                    <td className="p-3">
                      <div className="font-medium text-navy-700 dark:text-white">
                        {variant.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: #{variant.id}
                        {variant.variantType && variant.variantValue && (
                          <span className="block">
                            {variant.variantType}: {variant.variantValue}
                            {variant.size && ` - Size: ${variant.size}`}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* MRP */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.mrp}
                        onChange={(e) => updateVariant(variant.id, 'mrp', e.target.value)}
                        placeholder="0.00"
                        className={`w-full p-2 text-sm border rounded-lg outline-none dark:bg-navy-800 dark:text-white ${
                          errors[variant.id]?.mrp 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-200 dark:border-white/10'
                        }`}
                      />
                      {errors[variant.id]?.mrp && (
                        <div className="text-xs text-red-500 mt-1">{errors[variant.id].mrp}</div>
                      )}
                    </td>

                    {/* Discount % */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.discount}
                                                 onChange={(e) => {
                           const value = Math.min(parseFloat(e.target.value) || 0, 100);
                           updateVariant(variant.id, 'discount', value);
                         }}
                        placeholder="0"
                        min="0"
                        max="100"
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
                                             <div className="text-xs text-gray-500 mt-1">
                         Max: 100%
                       </div>
                    </td>

                    {/* Discounted Price */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.discountedPrice}
                        onChange={(e) => {
                          const mrpValue = parseFloat(variant.mrp) || 0;
                          const discountedValue = parseFloat(e.target.value) || 0;
                          const clampedValue = Math.min(discountedValue, mrpValue);
                          updateVariant(variant.id, 'discountedPrice', clampedValue);
                        }}
                        placeholder="0.00"
                        max={variant.mrp || undefined}
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Max: ₹{variant.mrp || '0.00'}
                      </div>
                    </td>

                    {/* Final Price (Read-only) */}
                    <td className="p-3">
                      <div className="p-2 bg-gray-50 dark:bg-navy-700 rounded-lg text-sm font-medium text-navy-700 dark:text-white">
                        ₹{variant.finalPrice || '0.00'}
                      </div>
                    </td>

                    {/* Stock Quantity */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
                        placeholder="0"
                        min="0"
                        className={`w-full p-2 text-sm border rounded-lg outline-none dark:bg-navy-800 dark:text-white ${
                          errors[variant.id]?.stock 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-200 dark:border-white/10'
                        }`}
                      />
                      {errors[variant.id]?.stock && (
                        <div className="text-xs text-red-500 mt-1">{errors[variant.id].stock}</div>
                      )}
                    </td>

                    {/* SKU Code */}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                          placeholder="Auto-generated"
                          className="flex-1 p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                        />
                        <button
                          onClick={() => generateSKU(variant.id)}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                          title="Auto-generate SKU"
                        >
                          🔄
                        </button>
                      </div>
                    </td>

                    {/* Barcode */}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={variant.barcode}
                          onChange={(e) => updateVariant(variant.id, 'barcode', e.target.value)}
                          placeholder="Optional"
                          className="flex-1 p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                        />
                        <button
                          onClick={() => generateBarcode(variant.id)}
                          className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                          title="Auto-generate Barcode"
                        >
                          🔄
                        </button>
                      </div>
                    </td>

                                                              {/* Variant Images */}
                     <td className="p-3">
                       {variant.images && variant.images.length > 0 ? (
                         <div className="relative group">
                           <img
                             src={variant.images[0].preview}
                             alt={`Variant ${variant.name}`}
                             className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm cursor-pointer"
                             onClick={() => {
                               const input = document.createElement('input');
                               input.type = 'file';
                               input.accept = 'image/*';
                               input.onchange = (e) => {
                                 if (e.target.files && e.target.files[0]) {
                                   onImageDrop([e.target.files[0]], variant.id);
                                 }
                               };
                               input.click();
                             }}
                           />
                           <button
                             onClick={() => removeVariantImage(variant.id, 0)}
                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                             title="Remove image"
                           >
                             ×
                           </button>
                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
                         </div>
                       ) : (
                         <DropZonefile
                           onDrop={(files) => onImageDrop(files, variant.id)}
                           content={
                             <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-navy-700 hover:border-blue-400 transition-colors cursor-pointer">
                               <MdOutlineCloudUpload className="text-gray-400 text-lg" />
                               <span className="text-xs text-gray-400">Add</span>
                             </div>
                           }
                         />
                       )}
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {(!data.variants || data.variants.length === 0) && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <MdRefresh className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                No variants configured. Please go back to Step 2 to configure variants.
              </p>
            </div>
          )}
        </Card>


        {data.variants && data.variants.length > 0 && (
          <Card extra="p-5">
            <h6 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
              Pricing Summary
            </h6>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Lowest Price</div>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  ₹{Math.min(...data.variants.map(v => parseFloat(v.finalPrice) || 0)).toFixed(2)}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-400">Highest Price</div>
                <div className="text-xl font-bold text-green-700 dark:text-green-300">
                  ₹{Math.max(...data.variants.map(v => parseFloat(v.finalPrice) || 0)).toFixed(2)}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-sm text-purple-600 dark:text-purple-400">Average Price</div>
                <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                  ₹{(data.variants.reduce((sum, v) => sum + (parseFloat(v.finalPrice) || 0), 0) / (data.variants.length || 1)).toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">

            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                {modalTitle}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>


            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {modalTitle}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={modalValue}
                    onChange={(e) => setModalValue(e.target.value)}
                    placeholder={modalPlaceholder}
                    className="w-full p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-navy-700 dark:text-white dark:border-gray-600"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleModalSubmit()}
                  />
                  {modalSuffix && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                      {modalSuffix}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                This value will be applied to all {data.variants?.length || 0} variant(s).
              </p>
            </div>


            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Apply to All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPricing; 