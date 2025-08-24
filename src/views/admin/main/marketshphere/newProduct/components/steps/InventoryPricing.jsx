import { useState, useEffect, useCallback } from "react";
import { MdOutlineCloudUpload, MdDelete, MdRefresh } from "react-icons/md";
import Card from "components/card";
import DropZonefile from "../DropZonefile";

const InventoryPricing = ({ data, onDataChange }) => {
  const [errors, setErrors] = useState({});

  // Auto-calculate final price when MRP or discount changes
  const calculateFinalPrice = (mrp, discount, discountedPrice) => {
    const mrpValue = parseFloat(mrp) || 0;
    const discountValue = parseFloat(discount) || 0;
    const discountedPriceValue = parseFloat(discountedPrice) || 0;

    if (mrpValue === 0) return 0;

    // If discounted price is set, calculate discount percentage
    if (discountedPriceValue > 0 && discountedPriceValue < mrpValue) {
      const calculatedDiscount = ((mrpValue - discountedPriceValue) / mrpValue) * 100;
      return {
        discount: calculatedDiscount.toFixed(2),
        discountedPrice: discountedPriceValue.toFixed(2),
        finalPrice: discountedPriceValue.toFixed(2)
      };
    }

    // If discount percentage is set, calculate discounted price
    if (discountValue > 0) {
      const calculatedDiscountedPrice = mrpValue - (mrpValue * (discountValue / 100));
      return {
        discount: discountValue,
        discountedPrice: calculatedDiscountedPrice.toFixed(2),
        finalPrice: calculatedDiscountedPrice.toFixed(2)
      };
    }

    // No discount
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
        
        // Auto-calculate pricing when MRP, discount, or discounted price changes
        if (field === 'mrp' || field === 'discount' || field === 'discountedPrice') {
          const calculations = calculateFinalPrice(
            field === 'mrp' ? value : variant.mrp,
            field === 'discount' ? value : variant.discount,
            field === 'discountedPrice' ? value : variant.discountedPrice
          );
          
          updatedVariant.discount = calculations.discount;
          updatedVariant.discountedPrice = calculations.discountedPrice;
          updatedVariant.finalPrice = calculations.finalPrice;
        }

        // Auto-generate SKU if empty
        if (field === 'mrp' && !variant.sku) {
          const skuBase = data.title ? data.title.substring(0, 3).toUpperCase() : 'PRD';
          const variantSuffix = variant.name !== 'Default' ? `-${variant.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase()}` : '';
          updatedVariant.sku = `${skuBase}${variantSuffix}-${Date.now().toString().slice(-4)}`;
        }

        return updatedVariant;
      }
      return variant;
    });

    onDataChange({ variants: updatedVariants });
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
      
      updateVariant(variantId, 'image', imageData);
    }
  }, []);

  const removeVariantImage = (variantId) => {
    updateVariant(variantId, 'image', null);
  };

  const autoFillAllVariants = (field, value) => {
    const updatedVariants = data.variants.map(variant => ({
      ...variant,
      [field]: value
    }));
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

  // Validate on data changes
  useEffect(() => {
    if (data.variants && data.variants.length > 0) {
      validateVariants();
    }
  }, [data.variants]);

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Inventory, Pricing & Variant Matrix
      </h4>

      <div className="mt-6 space-y-6">
        {/* Summary */}
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
        </Card>

        {/* Variant Matrix Table */}
        <Card extra="p-5">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-lg font-bold text-navy-700 dark:text-white">
              Variant Matrix
            </h6>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const mrp = prompt('Enter MRP to apply to all variants:');
                  if (mrp) autoFillAllVariants('mrp', mrp);
                }}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
              >
                Auto-fill MRP
              </button>
              <button
                onClick={() => {
                  const stock = prompt('Enter stock quantity to apply to all variants:');
                  if (stock) autoFillAllVariants('stock', stock);
                }}
                className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
              >
                Auto-fill Stock
              </button>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
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
                  <th className="text-left p-3 text-sm font-bold text-gray-600 dark:text-white min-w-[100px]">
                    Image
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
                        onChange={(e) => updateVariant(variant.id, 'discount', e.target.value)}
                        placeholder="0"
                        min="0"
                        max="100"
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
                    </td>

                    {/* Discounted Price */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.discountedPrice}
                        onChange={(e) => updateVariant(variant.id, 'discountedPrice', e.target.value)}
                        placeholder="0.00"
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
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
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                        placeholder="Auto-generated"
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
                    </td>

                    {/* Barcode */}
                    <td className="p-3">
                      <input
                        type="text"
                        value={variant.barcode}
                        onChange={(e) => updateVariant(variant.id, 'barcode', e.target.value)}
                        placeholder="Optional"
                        className="w-full p-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg outline-none dark:bg-navy-800 dark:text-white"
                      />
                    </td>

                    {/* Variant Image */}
                    <td className="p-3">
                      {variant.image ? (
                        <div className="relative">
                          <img
                            src={variant.image.preview}
                            alt={`Variant ${variant.name}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeVariantImage(variant.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <DropZonefile
                          onDrop={(files) => onImageDrop(files, variant.id)}
                          content={
                            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-navy-700">
                              <MdOutlineCloudUpload className="text-gray-400 text-lg" />
                              <span className="text-xs text-gray-400">Image</span>
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

          {/* No Variants Message */}
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

        {/* Pricing Summary */}
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
    </div>
  );
};

export default InventoryPricing; 