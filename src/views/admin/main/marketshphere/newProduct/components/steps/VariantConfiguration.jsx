import { useState, useEffect } from "react";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import Card from "components/card";

const VariantConfiguration = ({ data, onDataChange }) => {
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
    if (data.variantMode === 'multi' && data.variantTypes.length > 0) {
      generateVariantMatrix();
    } else if (data.variantMode === 'single') {
      // Create a single default variant
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
  }, [data.variantMode, data.variantTypes, data.enableSizeMatrix, data.sizes]);

  const buildCombinationKey = (combination) => {
    if (!combination || Object.keys(combination).length === 0) return 'DEFAULT';
    const keys = Object.keys(combination).sort();
    return keys.map((k) => `${k}=${String(combination[k])}`).join('|');
  };

  const generateVariantMatrix = () => {
    // If no variant types configured, clear variants
    if (!data.variantTypes || data.variantTypes.length === 0) {
      onDataChange({ variants: [] });
      return;
    }

    let combinations = [{}];

    // Generate combinations for variant types
    data.variantTypes.forEach((variantType) => {
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
    if (data.enableSizeMatrix && data.sizes.length > 0) {
      const newCombinations = [];
      combinations.forEach((combination) => {
        data.sizes.forEach((size) => {
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
    (data.variants || []).forEach((v) => {
      const key = buildCombinationKey(v.variantCombination);
      existingByKey[key] = v;
    });

    const variants = combinations.map((combination, index) => {
      const variantName = Object.values(combination).join(' / ');
      const key = buildCombinationKey(combination);
      const existing = existingByKey[key];

      if (existing) {
        // Merge existing values to avoid losing user input
        return {
          ...existing,
          id: existing.id ?? index + 1,
          name: variantName,
          variantCombination: combination,
          // Ensure fields exist for controlled inputs
          sku: existing.sku ?? '',
          mrp: existing.mrp ?? '',
          discount: existing.discount ?? '',
          discountedPrice: existing.discountedPrice ?? '',
          finalPrice: existing.finalPrice ?? '',
          stock: existing.stock ?? '',
          barcode: existing.barcode ?? '',
          image: existing.image ?? null,
        };
      }

      // New variant default structure
      return {
        id: index + 1,
        name: variantName,
        sku: '',
        mrp: '',
        discount: '',
        discountedPrice: '',
        finalPrice: '',
        stock: '',
        barcode: '',
        image: null,
        variantCombination: combination,
      };
    });

    onDataChange({ variants });
  };

  const handleVariantModeChange = (mode) => {
    onDataChange({ 
      variantMode: mode,
      variantTypes: mode === 'single' ? [] : data.variantTypes,
      enableSizeMatrix: mode === 'single' ? false : data.enableSizeMatrix,
      sizes: mode === 'single' ? [] : data.sizes
    });
    setShowVariantBuilder(mode === 'multi');
  };

  const addVariantType = (typeName) => {
    if (typeName.trim() && !data.variantTypes.some(vt => vt.type === typeName.trim())) {
      const newVariantTypes = [...(data.variantTypes || []), { type: typeName.trim(), values: [] }];
      onDataChange({ variantTypes: newVariantTypes });
      setNewVariantType('');
    }
  };

  const removeVariantType = (index) => {
    const newVariantTypes = data.variantTypes.filter((_, i) => i !== index);
    onDataChange({ variantTypes: newVariantTypes });
  };

  const addVariantValue = (typeIndex, value) => {
    if (value.trim() && !data.variantTypes[typeIndex].values.includes(value.trim())) {
      const newVariantTypes = [...data.variantTypes];
      newVariantTypes[typeIndex].values.push(value.trim());
      onDataChange({ variantTypes: newVariantTypes });
      setNewVariantValue('');
      setSelectedVariantTypeIndex(null);
    }
  };

  const removeVariantValue = (typeIndex, valueIndex) => {
    const newVariantTypes = [...data.variantTypes];
    newVariantTypes[typeIndex].values.splice(valueIndex, 1);
    onDataChange({ variantTypes: newVariantTypes });
  };

  const handleSizeMatrixToggle = (enabled) => {
    onDataChange({ 
      enableSizeMatrix: enabled,
      sizes: enabled ? data.sizes : []
    });
  };

  const addSize = () => {
    if (newSize.trim() && !(data.sizes || []).includes(newSize.trim())) {
      onDataChange({ sizes: [...(data.sizes || []), newSize.trim()] });
      setNewSize('');
    }
  };

  const removeSize = (index) => {
    const newSizes = (data.sizes || []).filter((_, i) => i !== index);
    onDataChange({ sizes: newSizes });
  };

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Variant Configuration
      </h4>

      <div className="mt-6 space-y-6">
        {/* Variant Mode Selector */}
        <Card extra="p-5">
          <h6 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
            Product Variant Mode
          </h6>
          
          {/* Segmented Control */}
          <div className="flex w-full rounded-xl bg-gray-100 p-1 dark:bg-navy-800">
            {[
              { value: 'single', label: 'Single Variant', desc: 'One product configuration' },
              { value: 'multi', label: 'Multi Variant', desc: 'Multiple configurations (colors, sizes, etc.)' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleVariantModeChange(option.value)}
                className={`flex-1 rounded-lg p-3 text-center transition-all ${
                  data.variantMode === option.value
                    ? 'bg-white text-navy-700 shadow-md dark:bg-navy-700 dark:text-white'
                    : 'text-gray-600 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <div className="text-sm font-bold">{option.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{option.desc}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Multi Variant Configuration */}
        {data.variantMode === 'multi' && (
          <Card extra="p-5">
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-lg font-bold text-navy-700 dark:text-white">
                Variant Builder
              </h6>
              <div className="text-sm text-gray-600">
                {(data.variantTypes || []).length} variant type(s) configured
              </div>
            </div>

            {/* Add Variant Type */}
            <div className="mb-6">
              <label className="mb-2 text-sm font-bold text-navy-700 dark:text-white">
                Add Variant Type
              </label>
              
              {/* Predefined Types */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {predefinedVariantTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => addVariantType(type.name)}
                    disabled={data.variantTypes.some(vt => vt.type === type.name)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                      data.variantTypes.some(vt => vt.type === type.name)
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800'
                        : 'border-gray-200 hover:border-brand-500 hover:bg-brand-50 dark:border-gray-700 dark:hover:border-brand-400 dark:hover:bg-brand-900/20'
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Type Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVariantType}
                  onChange={(e) => setNewVariantType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariantType(newVariantType))}
                  placeholder="Custom variant type (e.g., Finish, Edition)..."
                  className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                />
                <button
                  onClick={() => addVariantType(newVariantType)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
                >
                  <MdAdd className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Variant Types List */}
            {(data.variantTypes || []).length > 0 && (
              <div className="space-y-4">
                {data.variantTypes.map((variantType, typeIndex) => (
                  <Card key={typeIndex} extra="p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h6 className="text-base font-bold text-navy-700 dark:text-white">
                        {variantType.type}
                      </h6>
                      <button
                        onClick={() => removeVariantType(typeIndex)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                      >
                        <MdDelete className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Values */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {variantType.values.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          <span>{value}</span>
                          <button
                            onClick={() => removeVariantValue(typeIndex, valueIndex)}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                          >
                            <MdClose className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Value */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedVariantTypeIndex === typeIndex ? newVariantValue : ''}
                        onChange={(e) => {
                          setNewVariantValue(e.target.value);
                          setSelectedVariantTypeIndex(typeIndex);
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariantValue(typeIndex, newVariantValue))}
                        placeholder={`Add ${variantType.type.toLowerCase()} value...`}
                        className="flex-1 rounded-lg border border-gray-200 bg-white/0 p-2 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                      />
                      <button
                        onClick={() => addVariantValue(typeIndex, newVariantValue)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                      >
                        <MdAdd className="h-4 w-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Size Matrix */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h6 className="text-base font-bold text-navy-700 dark:text-white">
                    Enable Size Matrix
                  </h6>
                  <p className="text-sm text-gray-600">
                    Add size variations to all variant combinations
                  </p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="enableSizeMatrix"
                    checked={data.enableSizeMatrix}
                    onChange={(e) => handleSizeMatrixToggle(e.target.checked)}
                    className="relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-['']
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 dark:bg-white/5 dark:checked:bg-brand-400"
                  />
                </div>
              </div>

              {data.enableSizeMatrix && (
                <div>
                  <label className="mb-2 text-sm font-bold text-navy-700 dark:text-white">
                    Available Sizes
                  </label>
                  
                  {/* Size Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(data.sizes || []).map((size, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      >
                        <span>{size}</span>
                        <button
                          onClick={() => removeSize(index)}
                          className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-200"
                        >
                          <MdClose className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Size */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                      placeholder="Add size (e.g., S, M, L, XL, 32, 34)..."
                      className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                    />
                    <button
                      onClick={addSize}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300"
                    >
                      <MdAdd className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Generated Variants */}
            {(data.variants || []).length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h6 className="mb-3 text-base font-bold text-navy-700 dark:text-white">
                  Generated Variants Preview ({data.variants.length})
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {data.variants.slice(0, 10).map((variant, index) => (
                    <div key={variant.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-navy-700 rounded-lg">
                      <span className="text-sm text-navy-700 dark:text-white">{variant.name}</span>
                      <span className="text-xs text-gray-500">#{variant.id}</span>
                    </div>
                  ))}
                  {data.variants.length > 10 && (
                    <div className="p-2 text-center text-sm text-gray-500">
                      ... and {data.variants.length - 10} more variants
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Single Variant Info */}
        {data.variantMode === 'single' && (
          <Card extra="p-5">
            <h6 className="mb-3 text-lg font-bold text-navy-700 dark:text-white">
              Single Variant Configuration
            </h6>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your product will have a single configuration with one set of pricing and inventory. 
              You can proceed to the next step to set up pricing and stock details.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VariantConfiguration; 