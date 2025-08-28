import { useState, useEffect, useCallback } from "react";
import { MdOutlineCloudUpload, MdDelete, MdRefresh } from "react-icons/md";
import Card from "components/card";
import DropZonefile from "../../../../newProduct/components/DropZonefile";
import InputField from "components/fields/InputField";

const InventoryPricing = ({ productData, onDataChange }) => {
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
    const updatedVariants = productData?.variants?.map(variant => {
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
          const skuBase = productData?.title ? productData.title.substring(0, 3).toUpperCase() : 'PRD';
          const variantSuffix = variant.name !== 'Default' ? `-${variant.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase()}` : '';
          updatedVariant.sku = `${skuBase}${variantSuffix}-${Date.now().toString().slice(-4)}`;
        }

        return updatedVariant;
      }
      return variant;
    });

    if (onDataChange) {
      onDataChange({ variants: updatedVariants });
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
      
      updateVariant(variantId, 'image', imageData);
    }
  }, []);

  const removeVariantImage = (variantId) => {
    updateVariant(variantId, 'image', null);
  };

  const autoFillAllVariants = (field, value) => {
    const updatedVariants = productData?.variants?.map(variant => ({
      ...variant,
      [field]: value
    }));
    
    if (onDataChange) {
      onDataChange({ variants: updatedVariants });
    }
  };

  const generateBarcodes = () => {
    const updatedVariants = productData?.variants?.map((variant, index) => ({
      ...variant,
      barcode: `BAR${Date.now().toString().slice(-6)}${(index + 1).toString().padStart(3, '0')}`
    }));
    
    if (onDataChange) {
      onDataChange({ variants: updatedVariants });
    }
  };

  const generateSKUs = () => {
    const updatedVariants = productData?.variants?.map((variant, index) => ({
      ...variant,
      sku: variant.sku || `${(productData?.title || 'PRD').substring(0, 3).toUpperCase()}-${(index + 1).toString().padStart(3, '0')}`
    }));
    
    if (onDataChange) {
      onDataChange({ variants: updatedVariants });
    }
  };

  // Ensure we have at least one variant
  useEffect(() => {
    if (!productData?.variants || productData.variants.length === 0) {
      if (onDataChange) {
        onDataChange({
          variants: [{
            id: 1,
            name: 'Default',
            sku: '',
            mrp: '',
            discount: '',
            discountedPrice: '',
            finalPrice: '',
            stock: '',
            barcode: '',
            image: null,
            variantCombination: { Default: 'Default' }
          }]
        });
      }
    }
  }, []);

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Inventory & Pricing
      </h4>

      {/* Bulk Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={generateSKUs}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
        >
          <MdRefresh className="h-4 w-4" />
          Generate SKUs
        </button>
        <button
          onClick={generateBarcodes}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
        >
          <MdRefresh className="h-4 w-4" />
          Generate Barcodes
        </button>
      </div>

      {/* Variants Table */}
      <div className="mt-6">
        <Card extra="p-4">
          <h6 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
            Variant Details
          </h6>
          
          <div className="space-y-4">
            {(productData?.variants || []).map((variant, index) => (
              <div key={variant.id} className="rounded-lg border border-gray-200 p-4 dark:border-white/10">
                <div className="mb-4 flex items-center justify-between">
                  <h6 className="text-sm font-medium text-navy-700 dark:text-white">
                    {variant.name}
                  </h6>
                  {variant.image && (
                    <div className="relative">
                      <img
                        src={variant.image.preview || variant.image.url || variant.image}
                        alt={variant.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => removeVariantImage(variant.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* SKU */}
                  <div>
                    <InputField
                      label="SKU"
                      placeholder="Product SKU"
                      id={`sku-${variant.id}`}
                      type="text"
                      value={variant.sku || ""}
                      onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                    />
                  </div>

                  {/* MRP */}
                  <div>
                    <InputField
                      label="MRP"
                      placeholder="0.00"
                      id={`mrp-${variant.id}`}
                      type="number"
                      value={variant.mrp || ""}
                      onChange={(e) => updateVariant(variant.id, 'mrp', e.target.value)}
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <InputField
                      label="Discount (%)"
                      placeholder="0"
                      id={`discount-${variant.id}`}
                      type="number"
                      value={variant.discount || ""}
                      onChange={(e) => updateVariant(variant.id, 'discount', e.target.value)}
                    />
                  </div>

                  {/* Discounted Price */}
                  <div>
                    <InputField
                      label="Discounted Price"
                      placeholder="0.00"
                      id={`discountedPrice-${variant.id}`}
                      type="number"
                      value={variant.discountedPrice || ""}
                      onChange={(e) => updateVariant(variant.id, 'discountedPrice', e.target.value)}
                    />
                  </div>

                  {/* Final Price */}
                  <div>
                    <InputField
                      label="Final Price"
                      placeholder="0.00"
                      id={`finalPrice-${variant.id}`}
                      type="number"
                      value={variant.finalPrice || ""}
                      onChange={(e) => updateVariant(variant.id, 'finalPrice', e.target.value)}
                      disabled
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <InputField
                      label="Stock Quantity"
                      placeholder="0"
                      id={`stock-${variant.id}`}
                      type="number"
                      value={variant.stock || ""}
                      onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
                    />
                  </div>

                  {/* Barcode */}
                  <div>
                    <InputField
                      label="Barcode"
                      placeholder="Product barcode"
                      id={`barcode-${variant.id}`}
                      type="text"
                      value={variant.barcode || ""}
                      onChange={(e) => updateVariant(variant.id, 'barcode', e.target.value)}
                    />
                  </div>

                  {/* Variant Image Upload */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
                      Variant Image
                    </label>
                    <div className="flex w-full items-center justify-center rounded-[20px]">
                      <DropZonefile
                        onDrop={(files) => onImageDrop(files, variant.id)}
                        content={
                          <div className="flex h-[120px] w-full flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700">
                            <p className="text-[40px] text-navy-700">
                              <MdOutlineCloudUpload className="text-brand-500 dark:text-white" />
                            </p>
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              Drop variant image here
                            </p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary */}
      <div className="mt-6">
        <Card extra="p-4">
          <h6 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
            Summary
          </h6>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-500">
                {productData?.variants?.length || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Variants</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {productData?.variants?.filter(v => parseFloat(v.stock) > 0).length || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">In Stock</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">
                {productData?.variants?.filter(v => parseFloat(v.stock) === 0).length || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Out of Stock</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InventoryPricing;
