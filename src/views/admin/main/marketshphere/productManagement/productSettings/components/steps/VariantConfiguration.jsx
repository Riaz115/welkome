import { useState, useEffect } from "react";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import Card from "components/card";

const VariantConfiguration = ({ productData, onDataChange }) => {
  const [newVariantType, setNewVariantType] = useState('');
  const [newVariantValue, setNewVariantValue] = useState('');
  const [selectedVariantTypeIndex, setSelectedVariantTypeIndex] = useState(null);
  const [newSize, setNewSize] = useState('');
  const [showVariantBuilder, setShowVariantBuilder] = useState(false);

  // Predefined variant types
  const predefinedVariantTypes = [
    { name: 'Color', icon: '🎨' },
    { name: 'Size', icon: '📏' },
    { name: 'Material', icon: '🧱' },
    { name: 'Model', icon: '🏷️' },
    { name: 'Style', icon: '✨' },
    { name: 'Pattern', icon: '🎭' },
  ];

  // Generate variant matrix when variant configuration changes
  useEffect(() => {
    if (productData?.variantMode === 'multi' && productData?.variantTypes?.length > 0) {
      generateVariantMatrix();
    } else if (productData?.variantMode === 'single') {
      // Create a single default variant
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
  }, [productData?.variantMode, productData?.variantTypes, productData?.enableSizeMatrix, productData?.sizes]);

  const buildCombinationKey = (combination) => {
    if (!combination || Object.keys(combination).length === 0) return 'DEFAULT';
    const keys = Object.keys(combination).sort();
    return keys.map((k) => `${k}=${String(combination[k])}`).join('|');
  };

  const generateVariantMatrix = () => {
    // If no variant types configured, clear variants
    if (!productData?.variantTypes || productData.variantTypes.length === 0) {
      if (onDataChange) {
        onDataChange({ variants: [] });
      }
      return;
    }

    let combinations = [{}];

    // Generate combinations for variant types
    productData.variantTypes.forEach((variantType) => {
      const newCombinations = [];
      combinations.forEach((combination) => {
        variantType.values.forEach((value) => {
          newCombinations.push({
            ...combination,
            [variantType.type]: value,
          });
        });
      });
      combinations = newCombinations;
    });

    // If size matrix is enabled, add size combinations
    if (productData?.enableSizeMatrix && productData?.sizes?.length > 0) {
      const newCombinations = [];
      combinations.forEach((combination) => {
        productData.sizes.forEach((size) => {
          newCombinations.push({
            ...combination,
            Size: size,
          });
        });
      });
      combinations = newCombinations;
    }

    // Preserve existing variant details by matching on combination signature
    const existingByKey = {};
    (productData?.variants || []).forEach((v) => {
      const key = buildCombinationKey(v.variantCombination);
      existingByKey[key] = v;
    });

    const variants = combinations.map((combination, index) => {
      const variantName = Object.values(combination).join(' / ');
      const key = buildCombinationKey(combination);
      const existing = existingByKey[key];

      return {
        id: existing?.id || index + 1,
        name: variantName,
        sku: existing?.sku || '',
        mrp: existing?.mrp || '',
        discount: existing?.discount || '',
        discountedPrice: existing?.discountedPrice || '',
        finalPrice: existing?.finalPrice || '',
        stock: existing?.stock || '',
        barcode: existing?.barcode || '',
        image: existing?.image || null,
        variantCombination: combination
      };
    });

    if (onDataChange) {
      onDataChange({ variants });
    }
  };

  const addVariantType = () => {
    if (newVariantType.trim() && newVariantValue.trim()) {
      const existingType = productData?.variantTypes?.find(t => t.type === newVariantType);
      
      if (existingType) {
        // Add value to existing type
        const updatedTypes = productData.variantTypes.map(t => 
          t.type === newVariantType 
            ? { ...t, values: [...t.values, newVariantValue.trim()] }
            : t
        );
        if (onDataChange) {
          onDataChange({ variantTypes: updatedTypes });
        }
      } else {
        // Create new type
        const newType = {
          type: newVariantType.trim(),
          values: [newVariantValue.trim()]
        };
        if (onDataChange) {
          onDataChange({ 
            variantTypes: [...(productData?.variantTypes || []), newType] 
          });
        }
      }
      
      setNewVariantType('');
      setNewVariantValue('');
    }
  };

  const removeVariantType = (typeToRemove) => {
    if (onDataChange) {
      onDataChange({ 
        variantTypes: (productData?.variantTypes || []).filter(t => t.type !== typeToRemove) 
      });
    }
  };

  const removeVariantValue = (type, valueToRemove) => {
    const updatedTypes = productData?.variantTypes?.map(t => 
      t.type === type 
        ? { ...t, values: t.values.filter(v => v !== valueToRemove) }
        : t
    ).filter(t => t.values.length > 0); // Remove types with no values
    
    if (onDataChange) {
      onDataChange({ variantTypes: updatedTypes });
    }
  };

  const addSize = () => {
    if (newSize.trim() && !(productData?.sizes || []).includes(newSize.trim())) {
      if (onDataChange) {
        onDataChange({ 
          sizes: [...(productData?.sizes || []), newSize.trim()] 
        });
      }
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    if (onDataChange) {
      onDataChange({ 
        sizes: (productData?.sizes || []).filter(size => size !== sizeToRemove) 
      });
    }
  };

  const handleVariantModeChange = (mode) => {
    if (onDataChange) {
      onDataChange({ 
        variantMode: mode,
        variantTypes: mode === 'single' ? [] : (productData?.variantTypes || []),
        enableSizeMatrix: mode === 'single' ? false : productData?.enableSizeMatrix
      });
    }
  };

  const toggleSizeMatrix = () => {
    if (onDataChange) {
      onDataChange({ 
        enableSizeMatrix: !productData?.enableSizeMatrix 
      });
    }
  };

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Variant Configuration
      </h4>

      {/* Variant Mode Selection */}
      <div className="mt-6">
        <label className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white">
          Variant Mode
        </label>
        <div className="flex gap-4">
          {[
            { value: 'single', label: 'Single Product', desc: 'One product with basic pricing' },
            { value: 'multi', label: 'Multiple Variants', desc: 'Multiple variants with different attributes' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="variantMode"
                value={option.value}
                checked={productData?.variantMode === option.value}
                onChange={(e) => handleVariantModeChange(e.target.value)}
                className="text-brand-500"
              />
              <div>
                <span className="text-sm font-medium text-navy-700 dark:text-white">
                  {option.label}
                </span>
                <p className="text-xs text-gray-600">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Multi-Variant Configuration */}
      {productData?.variantMode === 'multi' && (
        <div className="mt-6 space-y-6">
          {/* Variant Types */}
          <Card extra="p-4">
            <h6 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
              Variant Types
            </h6>
            
            {/* Add New Variant Type */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newVariantType}
                onChange={(e) => setNewVariantType(e.target.value)}
                placeholder="Variant type (e.g., Color)"
                className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              />
              <input
                type="text"
                value={newVariantValue}
                onChange={(e) => setNewVariantValue(e.target.value)}
                placeholder="Value (e.g., Red)"
                className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
              />
              <button
                onClick={addVariantType}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                <MdAdd className="h-5 w-5" />
              </button>
            </div>

            {/* Existing Variant Types */}
            {(productData?.variantTypes || []).map((variantType, index) => (
              <div key={index} className="mb-3 rounded-lg border border-gray-200 p-3 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-navy-700 dark:text-white">
                    {variantType.type}
                  </span>
                  <button
                    onClick={() => removeVariantType(variantType.type)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variantType.values.map((value, valueIndex) => (
                    <div
                      key={valueIndex}
                      className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => removeVariantValue(variantType.type, value)}
                        className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
                      >
                        <MdClose className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>

          {/* Size Matrix */}
          <Card extra="p-4">
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-sm font-bold text-navy-700 dark:text-white">
                Size Matrix
              </h6>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productData?.enableSizeMatrix || false}
                  onChange={toggleSizeMatrix}
                  className="text-brand-500"
                />
                <span className="text-sm text-navy-700 dark:text-white">Enable Size Matrix</span>
              </label>
            </div>

            {productData?.enableSizeMatrix && (
              <div>
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add size (e.g., S, M, L)"
                    className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                  />
                  <button
                    onClick={addSize}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
                  >
                    <MdAdd className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(productData?.sizes || []).map((size, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    >
                      <span>{size}</span>
                      <button
                        onClick={() => removeSize(size)}
                        className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
                      >
                        <MdClose className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Variant Preview */}
          {productData?.variants && productData.variants.length > 0 && (
            <Card extra="p-4">
              <h6 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
                Variant Preview ({productData.variants.length} variants)
              </h6>
              <div className="max-h-40 overflow-y-auto">
                {productData.variants.map((variant, index) => (
                  <div key={index} className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    {variant.name}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Single Product Info */}
      {productData?.variantMode === 'single' && (
        <div className="mt-6">
          <Card extra="p-4">
            <h6 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
              Single Product Configuration
            </h6>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This product will have a single variant with basic pricing and inventory management.
              You can configure the pricing and inventory details in the next step.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VariantConfiguration;
