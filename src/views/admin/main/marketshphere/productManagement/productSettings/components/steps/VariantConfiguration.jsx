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

  // Initialize existing variants data into the format expected by newProduct component
  useEffect(() => {
    if (data.variants && data.variants.length > 0 && !data.variantSizes) {
      // Group existing variants by type and value
      const variantSizes = {};
      const colorValues = [];
      const modelValues = [];
      const customVariantName = '';
      const customVariantValues = [];
      const variantTypes = [];

      data.variants.forEach(variant => {
        const variantType = variant.variantType || 'Default';
        const variantValue = variant.variantValue || 'Default';
        const size = variant.size || '';

        // Add to variantTypes if not already present
        if (!variantTypes.some(vt => vt.type === variantType)) {
          variantTypes.push({ type: variantType, values: [] });
        }

        // Create key for variantSizes
        const key = `${variantType}_${variantValue}`;
        
        if (!variantSizes[key]) {
          variantSizes[key] = [];
        }

        if (size && !variantSizes[key].includes(size)) {
          variantSizes[key].push(size);
        }

        // Populate specific arrays based on variant type
        if (variantType === 'Color' && !colorValues.includes(variantValue)) {
          colorValues.push(variantValue);
        } else if (variantType === 'Model' && !modelValues.includes(variantValue)) {
          modelValues.push(variantValue);
        } else if (variantType !== 'Color' && variantType !== 'Model' && variantType !== 'Default') {
          // This is a custom variant type
          if (!customVariantValues.includes(variantValue)) {
            customVariantValues.push(variantValue);
          }
        }
      });

      // Update the data with populated values only if not already set
      onDataChange({
        variantSizes,
        colorValues,
        modelValues,
        customVariantName: customVariantName || 'Others',
        customVariantValues,
        variantTypes
      });
    }
  }, [data.variants, data.variantSizes]);

     // Generate variant matrix when variant configuration changes
   useEffect(() => {
     if (data.variantMode === 'multi' && data.variantSizes) {
       generateVariantMatrixFromSizes();
     } else if (data.variantMode === 'single') {
                if (data.enableSizeMatrix && data.sizes.length > 0) {
           // Create size-based variants for single variant
           const variants = data.sizes.map((size, index) => {
             return {
               id: index + 1,
               name: `Default - ${size}`,
               variantType: 'Default',
               variantValue: 'Default',
               size: size,
               sku: '',
               mrp: '',
               discount: '',
               discountedPrice: '',
               finalPrice: '',
               stock: '',
               barcode: '',
               images: [],
               variantCombination: { Default: 'Default', Size: size }
             };
           });
           onDataChange({ variants });
         } else {
           // Create a single default variant
           onDataChange({
             variants: [{
               id: 1,
               name: 'Default',
               variantType: 'Default',
               variantValue: 'Default',
               size: '',
               sku: '',
               mrp: '',
               discount: '',
               discountedPrice: '',
               finalPrice: '',
               stock: '',
               barcode: '',
               images: [],
               variantCombination: { Default: 'Default' }
             }]
           });
         }
     }
     
   }, [data.variantMode, data.variantSizes, data.enableSizeMatrix, data.sizes]);

  const buildCombinationKey = (combination) => {
    if (!combination || Object.keys(combination).length === 0) return 'DEFAULT';
    const keys = Object.keys(combination).sort();
    return keys.map((k) => `${k}=${String(combination[k])}`).join('|');
  };



           const generateVariantMatrixFromSizes = () => {
        if (!data.variantSizes || Object.keys(data.variantSizes).length === 0) {
          onDataChange({ variants: [] });
          return;
        }
        
        const variants = [];
        let id = 1;
        
        Object.entries(data.variantSizes).forEach(([key, sizes]) => {
          // Skip image keys (they end with _images)
          if (key.endsWith('_images')) return;
          
          const [variantType, variantValue] = key.split('_');
          
          if (sizes && sizes.length > 0) {
            // Create variants with sizes
            sizes.forEach((size) => {
              variants.push({
                id: id++,
                name: `${variantType}: ${variantValue} - ${size}`,
                variantType: variantType,
                variantValue: variantValue,
                size: size,
                sku: '',
                mrp: '',
                discount: '',
                discountedPrice: '',
                finalPrice: '',
                stock: '',
                barcode: '',
                images: [],
                variantCombination: { [variantType]: variantValue, Size: size }
              });
            });
          } else {
            // Create variants without sizes (when sizes array is empty or undefined)
            variants.push({
              id: id++,
              name: `${variantType}: ${variantValue}`,
              variantType: variantType,
              variantValue: variantValue,
              size: '',
              sku: '',
              mrp: '',
              discount: '',
              discountedPrice: '',
              finalPrice: '',
              stock: '',
              barcode: '',
              images: [],
              variantCombination: { [variantType]: variantValue }
            });
          }
        });
        
        onDataChange({ variants });
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

        {/* Current Mode Display */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Current Mode:</span> {data.variantMode === 'single' ? 'Single Variant' : 'Multi Variant'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.variantMode === 'single' 
              ? 'Configure single product with optional size variations' 
              : 'Configure multiple variant types and their combinations'
            }
          </p>
        </div>

        {/* Multi Variant Configuration */}
        {data.variantMode === 'multi' && (
          <Card extra="p-5">
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-lg font-bold text-navy-700 dark:text-white">
                Multi Variant Configuration
              </h6>
              <div className="text-sm text-gray-600">
                Configure variant types and their size combinations
              </div>
            </div>

            {/* Selected Variant Type Display */}
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-semibold">Selected Variant Type:</span> {
                  data.selectedVariantType === 'color' ? '🎨 Color Variants' :
                  data.selectedVariantType === 'model' ? '🏷️ Model Variants' :
                  data.selectedVariantType === 'custom' ? '⚙️ Custom Variants' :
                  'None Selected'
                }
              </p>
            </div>

            {/* Variant Type Configuration */}
            <div className="space-y-4">
              {/* Color Variant */}
              {data.selectedVariantType === 'color' && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h6 className="text-base font-bold text-navy-700 dark:text-white">Color</h6>
                      <p className="text-xs text-gray-500">Add color variations with optional sizes</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.variantTypes?.some(vt => vt.type === 'Color')}
                    onChange={(e) => {
                      const currentTypes = data.variantTypes || [];
                      if (e.target.checked) {
                        if (!currentTypes.some(vt => vt.type === 'Color')) {
                          onDataChange({ variantTypes: [...currentTypes, { type: 'Color', values: [] }] });
                        }
                      } else {
                        onDataChange({ variantTypes: currentTypes.filter(vt => vt.type !== 'Color') });
                      }
                    }}
                    className="text-brand-500"
                  />
                </div>
                
                {/* Color Values Input */}
                {data.variantTypes?.some(vt => vt.type === 'Color') && (
                  <div className="ml-8">
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={data.newColorValue || ''}
                        onChange={(e) => onDataChange({ newColorValue: e.target.value })}
                        placeholder="Enter color name (e.g., Red)"
                        className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-2 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                                 onKeyPress={(e) => {
                           if (e.key === 'Enter' && data.newColorValue?.trim()) {
                             const newColor = data.newColorValue.trim();
                             const currentColors = data.colorValues || [];
                             if (!currentColors.includes(newColor)) {
                               // Add color to colorValues
                               onDataChange({ 
                                 colorValues: [...currentColors, newColor],
                                 newColorValue: ''
                               });
                               
                               // Also add to variantSizes with empty array (no sizes initially)
                               const key = `Color_${newColor}`;
                               onDataChange({ 
                                 variantSizes: { 
                                   ...data.variantSizes, 
                                   [key]: [] 
                                 } 
                               });
                             }
                           }
                         }}
                      />
                      <button
                                                 onClick={() => {
                           if (data.newColorValue?.trim()) {
                             const newColor = data.newColorValue.trim();
                             const currentColors = data.colorValues || [];
                             if (!currentColors.includes(newColor)) {
                               // Add color to colorValues
                               onDataChange({ 
                                 colorValues: [...currentColors, newColor],
                                 newColorValue: ''
                               });
                               
                               // Also add to variantSizes with empty array (no sizes initially)
                               const key = `Color_${newColor}`;
                               onDataChange({ 
                                 variantSizes: { 
                                   ...data.variantSizes, 
                                   [key]: [] 
                                 } 
                               });
                             }
                           }
                         }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                      >
                        <MdAdd className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Color Values List */}
                    {(Array.isArray(data.colorValues) ? data.colorValues : []).length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-2">Color Variants:</h6>
                        <div className="space-y-3">
                          {(Array.isArray(data.colorValues) ? data.colorValues : []).map((color, colorIndex) => (
                            <div key={colorIndex} className="bg-gray-50 dark:bg-navy-700 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">
                                  {color}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Enable Sizes:</span>
                                                                     <input
                                     type="checkbox"
                                     checked={data.variantSizes?.[`Color_${color}`] !== undefined}
                                     onChange={(e) => {
                                       const key = `Color_${color}`;
                                       if (e.target.checked) {
                                         // Enable sizes for this color
                                         onDataChange({ 
                                           variantSizes: { 
                                             ...data.variantSizes, 
                                             [key]: [] 
                                           } 
                                         });
                                       } else {
                                         // Disable sizes for this color but keep variant without sizes
                                         const newVariantSizes = { ...data.variantSizes };
                                         newVariantSizes[key] = []; // Empty array means no sizes but variant exists
                                         onDataChange({ variantSizes: newVariantSizes });
                                       }
                                     }}
                                     className="text-brand-500"
                                   />
                                  <button
                                    onClick={() => {
                                      const newColors = (data.colorValues || []).filter((_, index) => index !== colorIndex);
                                      onDataChange({ colorValues: newColors });
                                      // Also remove from variantSizes if exists
                                      const key = `Color_${color}`;
                                      if (data.variantSizes?.[key]) {
                                        const newVariantSizes = { ...data.variantSizes };
                                        delete newVariantSizes[key];
                                        onDataChange({ variantSizes: newVariantSizes });
                                      }
                                    }}
                                    className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                  >
                                    <MdClose className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Size Selection for this color */}
                              {data.variantSizes?.[`Color_${color}`]?.length >= 0 && (
                                <div>
                                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                      <label key={size} className="flex items-center gap-2 cursor-pointer p-2 rounded border border-gray-200 hover:border-brand-500 dark:border-gray-600">
                                        <input
                                          type="checkbox"
                                          checked={data.variantSizes?.[`Color_${color}`]?.includes(size)}
                                          onChange={(e) => {
                                            const key = `Color_${color}`;
                                            const currentSizes = data.variantSizes?.[key] || [];
                                            if (e.target.checked) {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: [...currentSizes, size] 
                                                } 
                                              });
                                            } else {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: currentSizes.filter(s => s !== size) 
                                                } 
                                              });
                                            }
                                          }}
                                          className="text-brand-500"
                                        />
                                        <span className="text-xs text-navy-700 dark:text-white">{size}</span>
                                      </label>
                                    ))}
                                  </div>
                                  
                                                                     {/* Custom Size for this color */}
                                   <div className="flex gap-2">
                                     <input
                                       type="text"
                                       placeholder="Add custom size..."
                                       className="flex-1 rounded border border-gray-200 bg-white/0 p-2 text-xs outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                       onKeyPress={(e) => {
                                         if (e.key === 'Enter') {
                                                                                        const customSize = e.target.value.trim();
                                             if (customSize) {
                                               const key = `Color_${color}`;
                                               const currentSizes = data.variantSizes?.[key] || [];
                                               if (!currentSizes.includes(customSize)) {
                                                 onDataChange({ 
                                                   variantSizes: { 
                                                     ...data.variantSizes, 
                                                     [key]: [...currentSizes, customSize] 
                                                   } 
                                                 });
                                               }
                                               e.target.value = '';
                                             }
                                           }
                                         }}
                                     />
                                     <button
                                       onClick={() => {
                                         const customSizeInput = document.querySelector(`input[placeholder="Add custom size..."]`);
                                         if (customSizeInput && customSizeInput.value.trim()) {
                                           const customSize = customSizeInput.value.trim();
                                           const key = `Color_${color}`;
                                           const currentSizes = data.variantSizes?.[key] || [];
                                           if (!currentSizes.includes(customSize)) {
                                             onDataChange({ 
                                               variantSizes: { 
                                                 ...data.variantSizes, 
                                                 [key]: [...currentSizes, customSize] 
                                               } 
                                             });
                                             customSizeInput.value = '';
                                           }
                                         }
                                       }}
                                       className="flex items-center justify-center w-8 h-8 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                                     >
                                       <MdAdd className="h-4 w-4" />
                                     </button>
                                   </div>
                                   
                                   {/* Display Custom Sizes with Remove Buttons */}
                                   {data.variantSizes?.[`Color_${color}`]?.filter(size => !['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size)).length > 0 && (
                                     <div className="mt-3">
                                       <div className="text-xs text-gray-500 mb-2">Custom Sizes:</div>
                                       <div className="flex flex-wrap gap-2">
                                         {data.variantSizes[`Color_${color}`]
                                           .filter(size => !['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size))
                                           .map((customSize, sizeIndex) => (
                                             <div
                                               key={sizeIndex}
                                               className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                             >
                                               <span>{customSize}</span>
                                               <button
                                                 onClick={() => {
                                                   const key = `Color_${color}`;
                                                   const currentSizes = data.variantSizes?.[key] || [];
                                                   const newSizes = currentSizes.filter(s => s !== customSize);
                                                   onDataChange({ 
                                                     variantSizes: { 
                                                       ...data.variantSizes, 
                                                       [key]: newSizes 
                                                     } 
                                                   });
                                                 }}
                                                 className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200"
                                               >
                                                 <MdClose className="h-3 w-3" />
                                               </button>
                                             </div>
                                           ))}
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               )}
                               

                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
              </div>
              )}

              {/* Model Variant */}
              {data.selectedVariantType === 'model' && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏷️</span>
                    <div>
                      <h6 className="text-base font-bold text-navy-700 dark:text-white">Model</h6>
                      <p className="text-xs text-gray-500">Add model variations with optional sizes</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.variantTypes?.some(vt => vt.type === 'Model')}
                    onChange={(e) => {
                      const currentTypes = data.variantTypes || [];
                      if (e.target.checked) {
                        if (!currentTypes.some(vt => vt.type === 'Model')) {
                          onDataChange({ variantTypes: [...currentTypes, { type: 'Model', values: [] }] });
                        }
                      } else {
                        onDataChange({ variantTypes: currentTypes.filter(vt => vt.type !== 'Model') });
                      }
                    }}
                    className="text-brand-500"
                  />
                </div>
                
                {/* Model Values Input */}
                {data.variantTypes?.some(vt => vt.type === 'Model') && (
                  <div className="ml-8">
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={data.newModelValue || ''}
                        onChange={(e) => onDataChange({ newModelValue: e.target.value })}
                        placeholder="Enter model name (e.g., Basic)"
                        className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-2 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                                 onKeyPress={(e) => {
                           if (e.key === 'Enter' && data.newModelValue?.trim()) {
                             const newModel = data.newModelValue.trim();
                             const currentModels = data.modelValues || [];
                             if (!currentModels.includes(newModel)) {
                               // Add model to modelValues
                               onDataChange({ 
                                 modelValues: [...currentModels, newModel],
                                 newModelValue: ''
                               });
                               
                               // Also add to variantSizes with empty array (no sizes initially)
                               const key = `Model_${newModel}`;
                               onDataChange({ 
                                 variantSizes: { 
                                   ...data.variantSizes, 
                                   [key]: [] 
                                 } 
                               });
                             }
                           }
                         }}
                      />
                      <button
                                                 onClick={() => {
                           if (data.newModelValue?.trim()) {
                             const newModel = data.newModelValue.trim();
                             const currentModels = data.modelValues || [];
                             if (!currentModels.includes(newModel)) {
                               // Add model to modelValues
                               onDataChange({ 
                                 modelValues: [...currentModels, newModel],
                                 newModelValue: ''
                               });
                               
                               // Also add to variantSizes with empty array (no sizes initially)
                               const key = `Model_${newModel}`;
                               onDataChange({ 
                                 variantSizes: { 
                                   ...data.variantSizes, 
                                   [key]: [] 
                                 } 
                               });
                             }
                           }
                         }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                      >
                        <MdAdd className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Model Values List */}
                    {(Array.isArray(data.modelValues) ? data.modelValues : []).length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-2">Model Variants:</h6>
                        <div className="space-y-3">
                          {(Array.isArray(data.modelValues) ? data.modelValues : []).map((model, modelIndex) => (
                            <div key={modelIndex} className="bg-gray-50 dark:bg-navy-700 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">
                                  {model}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Enable Sizes:</span>
                                                                     <input
                                     type="checkbox"
                                     checked={data.variantSizes?.[`Model_${model}`] !== undefined}
                                     onChange={(e) => {
                                       const key = `Model_${model}`;
                                       if (e.target.checked) {
                                         // Enable sizes for this model
                                         onDataChange({ 
                                           variantSizes: { 
                                             ...data.variantSizes, 
                                             [key]: [] 
                                           } 
                                         });
                                       } else {
                                         // Disable sizes for this model but keep variant without sizes
                                         const newVariantSizes = { ...data.variantSizes };
                                         newVariantSizes[key] = []; // Empty array means no sizes but variant exists
                                         onDataChange({ variantSizes: newVariantSizes });
                                       }
                                     }}
                                     className="text-brand-500"
                                   />
                                  <button
                                    onClick={() => {
                                      const newModels = (data.modelValues || []).filter((_, index) => index !== modelIndex);
                                      onDataChange({ modelValues: newModels });
                                      // Also remove from variantSizes if exists
                                      const key = `Model_${model}`;
                                      if (data.variantSizes?.[key]) {
                                        const newVariantSizes = { ...data.variantSizes };
                                        delete newVariantSizes[key];
                                        onDataChange({ variantSizes: newVariantSizes });
                                      }
                                    }}
                                    className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                  >
                                    <MdClose className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Size Selection for this model */}
                              {data.variantSizes?.[`Model_${model}`]?.length >= 0 && (
                                <div>
                                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                      <label key={size} className="flex items-center gap-2 cursor-pointer p-2 rounded border border-gray-200 hover:border-brand-500 dark:border-gray-600">
                                        <input
                                          type="checkbox"
                                          checked={data.variantSizes?.[`Model_${model}`]?.includes(size)}
                                          onChange={(e) => {
                                            const key = `Model_${model}`;
                                            const currentSizes = data.variantSizes?.[key] || [];
                                            if (e.target.checked) {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: [...currentSizes, size] 
                                                } 
                                              });
                                            } else {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: currentSizes.filter(s => s !== size) 
                                                } 
                                              });
                                            }
                                          }}
                                          className="text-brand-500"
                                        />
                                        <span className="text-xs text-navy-700 dark:text-white">{size}</span>
                                      </label>
                                    ))}
                                  </div>
                                  
                                                                     {/* Custom Size for this model */}
                                   <div className="flex gap-2">
                                     <input
                                       type="text"
                                       placeholder="Add custom size..."
                                       className="flex-1 rounded border border-gray-200 bg-white/0 p-2 text-xs outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                       onKeyPress={(e) => {
                                         if (e.key === 'Enter') {
                                           const customSize = e.target.value.trim();
                                           if (customSize) {
                                             const key = `Model_${model}`;
                                             const currentSizes = data.variantSizes?.[key] || [];
                                             if (!currentSizes.includes(customSize)) {
                                               onDataChange({ 
                                                 variantSizes: { 
                                                   ...data.variantSizes, 
                                                   [key]: [...currentSizes, customSize] 
                                                 } 
                                               });
                                             }
                                             e.target.value = '';
                                           }
                                         }
                                       }}
                                     />
                                     <button
                                       onClick={() => {
                                         const customSizeInput = document.querySelector(`input[placeholder="Add custom size..."]`);
                                         if (customSizeInput && customSizeInput.value.trim()) {
                                           const customSize = customSizeInput.value.trim();
                                           const key = `Model_${model}`;
                                           const currentSizes = data.variantSizes?.[key] || [];
                                           if (!currentSizes.includes(customSize)) {
                                             onDataChange({ 
                                               variantSizes: { 
                                                 ...data.variantSizes, 
                                                 [key]: [...currentSizes, customSize] 
                                               } 
                                             });
                                             customSizeInput.value = '';
                                           }
                                         }
                                       }}
                                       className="flex items-center justify-center w-8 h-8 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                                     >
                                       <MdAdd className="h-4 w-4" />
                                     </button>
                                   </div>
                                   
                                   {/* Display Custom Sizes with Remove Buttons */}
                                   {data.variantSizes?.[`Model_${model}`]?.filter(size => !['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size)).length > 0 && (
                                     <div className="mt-3">
                                       <div className="text-xs text-gray-500 mb-2">Custom Sizes:</div>
                                       <div className="flex flex-wrap gap-2">
                                         {data.variantSizes[`Model_${model}`]
                                           .filter(size => !['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size))
                                           .map((customSize, sizeIndex) => (
                                             <div
                                               key={sizeIndex}
                                               className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                             >
                                               <span>{customSize}</span>
                                               <button
                                                 onClick={() => {
                                                   const key = `Model_${model}`;
                                                   const currentSizes = data.variantSizes?.[key] || [];
                                                   const newSizes = currentSizes.filter(s => s !== customSize);
                                                   onDataChange({ 
                                                     variantSizes: { 
                                                       ...data.variantSizes, 
                                                       [key]: newSizes 
                                                     } 
                                                   });
                                                 }}
                                                 className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200"
                                               >
                                                 <MdClose className="h-3 w-3" />
                                               </button>
                                             </div>
                                           ))}
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               )}
                               

                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
               )}

               {/* Custom Variant */}
               {data.selectedVariantType === 'custom' && (
                 <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h6 className="text-base font-bold text-navy-700 dark:text-white">Others</h6>
                      <p className="text-xs text-gray-500">Create custom variant type with optional sizes</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.variantTypes?.some(vt => vt.type === 'Others')}
                    onChange={(e) => {
                      const currentTypes = data.variantTypes || [];
                      if (e.target.checked) {
                        if (!currentTypes.some(vt => vt.type === 'Others')) {
                          onDataChange({ variantTypes: [...currentTypes, { type: 'Others', values: [] }] });
                        }
                      } else {
                        onDataChange({ variantTypes: currentTypes.filter(vt => vt.type !== 'Others') });
                      }
                    }}
                    className="text-brand-500"
                  />
                </div>
                
                {/* Others Values Input */}
                {data.variantTypes?.some(vt => vt.type === 'Others') && (
                  <div className="ml-8">
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={data.customVariantName || ''}
                        onChange={(e) => onDataChange({ customVariantName: e.target.value })}
                        placeholder="Custom variant name (e.g., Finish, Edition)"
                        className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-2 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                      />
                    </div>
                    
                    {/* Custom Variant Values Input */}
                    {data.customVariantName && (
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={data.newCustomVariantValue || ''}
                          onChange={(e) => onDataChange({ newCustomVariantValue: e.target.value })}
                          placeholder="Enter variant value (e.g., Matte)"
                          className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-2 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                                     onKeyPress={(e) => {
                             if (e.key === 'Enter' && data.newCustomVariantValue?.trim()) {
                               const newValue = data.newCustomVariantValue.trim();
                               const currentValues = data.customVariantValues || [];
                               if (!currentValues.includes(newValue)) {
                                 // Add value to customVariantValues
                                 onDataChange({ 
                                   customVariantValues: [...currentValues, newValue],
                                   newCustomVariantValue: ''
                                 });
                                 
                                 // Also add to variantSizes with empty array (no sizes initially)
                                 const key = `${data.customVariantName}_${newValue}`;
                                 onDataChange({ 
                                   variantSizes: { 
                                     ...data.variantSizes, 
                                     [key]: [] 
                                   } 
                                 });
                               }
                             }
                           }}
                        />
                        <button
                                                   onClick={() => {
                           if (data.newCustomVariantValue?.trim()) {
                             const newValue = data.newCustomVariantValue.trim();
                             const currentValues = data.customVariantValues || [];
                             if (!currentValues.includes(newValue)) {
                               // Add value to customVariantValues
                               onDataChange({ 
                                 customVariantValues: [...currentValues, newValue],
                                 newCustomVariantValue: ''
                               });
                               
                               // Also add to variantSizes with empty array (no sizes initially)
                               const key = `${data.customVariantName}_${newValue}`;
                               onDataChange({ 
                                 variantSizes: { 
                                   ...data.variantSizes, 
                                   [key]: [] 
                                 } 
                               });
                             }
                           }
                         }}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                        >
                          <MdAdd className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    
                    {/* Custom Variant Values List */}
                    {data.customVariantName && (Array.isArray(data.customVariantValues) ? data.customVariantValues : []).length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-2">
                          {data.customVariantName} Variants:
                        </h6>
                        <div className="space-y-3">
                          {(Array.isArray(data.customVariantValues) ? data.customVariantValues : []).map((value, valueIndex) => (
                            <div key={valueIndex} className="bg-gray-50 dark:bg-navy-700 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">
                                  {value}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Enable Sizes:</span>
                                                                     <input
                                     type="checkbox"
                                     checked={data.variantSizes?.[`${data.customVariantName}_${value}`] !== undefined}
                                     onChange={(e) => {
                                       const key = `${data.customVariantName}_${value}`;
                                       if (e.target.checked) {
                                         // Enable sizes for this custom variant
                                         onDataChange({ 
                                           variantSizes: { 
                                             ...data.variantSizes, 
                                             [key]: [] 
                                           } 
                                         });
                                       } else {
                                         // Disable sizes for this custom variant but keep variant without sizes
                                         const newVariantSizes = { ...data.variantSizes };
                                         newVariantSizes[key] = []; // Empty array means no sizes but variant exists
                                         onDataChange({ variantSizes: newVariantSizes });
                                       }
                                     }}
                                     className="text-brand-500"
                                   />
                                  <button
                                    onClick={() => {
                                      const newValues = (data.customVariantValues || []).filter((_, index) => index !== valueIndex);
                                      onDataChange({ customVariantValues: newValues });
                                      // Also remove from variantSizes if exists
                                      const key = `${data.customVariantName}_${value}`;
                                      if (data.variantSizes?.[key]) {
                                        const newVariantSizes = { ...data.variantSizes };
                                        delete newVariantSizes[key];
                                        onDataChange({ variantSizes: newVariantSizes });
                                      }
                                    }}
                                    className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                  >
                                    <MdClose className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Size Selection for this custom variant */}
                              {data.variantSizes?.[`${data.customVariantName}_${value}`]?.length >= 0 && (
                                <div>
                                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                      <label key={size} className="flex items-center gap-2 cursor-pointer p-2 rounded border border-gray-200 hover:border-brand-500 dark:border-gray-600">
                                        <input
                                          type="checkbox"
                                          checked={data.variantSizes?.[`${data.customVariantName}_${value}`]?.includes(size)}
                                          onChange={(e) => {
                                            const key = `${data.customVariantName}_${value}`;
                                            const currentSizes = data.variantSizes?.[key] || [];
                                            if (e.target.checked) {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: [...currentSizes, size] 
                                                } 
                                              });
                                            } else {
                                              onDataChange({ 
                                                variantSizes: { 
                                                  ...data.variantSizes, 
                                                  [key]: currentSizes.filter(s => s !== size) 
                                                } 
                                              });
                                            }
                                          }}
                                          className="text-brand-500"
                                        />
                                        <span className="text-xs text-navy-700 dark:text-white">{size}</span>
                                      </label>
                                    ))}
                                  </div>
                                  
                                                                     {/* Custom Size for this custom variant */}
                                   <div className="flex gap-2">
                                     <input
                                       type="text"
                                       placeholder="Add custom size..."
                                       className="flex-1 rounded border border-gray-200 bg-white/0 p-2 text-xs outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                                       onKeyPress={(e) => {
                                         if (e.key === 'Enter') {
                                           const customSize = e.target.value.trim();
                                           if (customSize) {
                                             const key = `${data.customVariantName}_${value}`;
                                             const currentSizes = data.variantSizes?.[key] || [];
                                             if (!currentSizes.includes(customSize)) {
                                               onDataChange({ 
                                                 variantSizes: { 
                                                   ...data.variantSizes, 
                                                   [key]: [...currentSizes, customSize] 
                                                 } 
                                               });
                                             }
                                             e.target.value = '';
                                           }
                                         }
                                       }}
                                     />
                                     <button
                                       onClick={() => {
                                         const customSizeInput = document.querySelector(`input[placeholder="Add custom size..."]`);
                                         if (customSizeInput && customSizeInput.value.trim()) {
                                           const customSize = customSizeInput.value.trim();
                                           const key = `${data.customVariantName}_${value}`;
                                           const currentSizes = data.variantSizes?.[key] || [];
                                           if (!currentSizes.includes(customSize)) {
                                             onDataChange({ 
                                               variantSizes: { 
                                                 ...data.variantSizes, 
                                                 [key]: [...currentSizes, customSize] 
                                               } 
                                             });
                                             customSizeInput.value = '';
                                           }
                                         }
                                       }}
                                       className="flex items-center justify-center w-8 h-8 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
                                     >
                                       <MdAdd className="h-4 w-4" />
                                     </button>
                                   </div>
                                   
                                   {/* Display Custom Sizes with Remove Buttons */}
                                   {data.variantSizes?.[`${data.customVariantName}_${value}`]?.filter(size => !['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size)).length > 0 && (
                                     <div className="mt-3">
                                       <div className="text-xs text-gray-500 mb-2">Custom Sizes:</div>
                                       <div className="flex flex-wrap gap-2">
                                         {data.variantSizes[`${data.customVariantName}_${value}`]
                                           .filter(size => !['XS', 'S', 'M', 'L', 'XXL'].includes(size))
                                           .map((customSize, sizeIndex) => (
                                             <div
                                               key={sizeIndex}
                                               className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                             >
                                               <span>{customSize}</span>
                                               <button
                                                 onClick={() => {
                                                   const key = `${data.customVariantName}_${value}`;
                                                   const currentSizes = data.variantSizes?.[key] || [];
                                                   const newSizes = currentSizes.filter(s => s !== customSize);
                                                   onDataChange({ 
                                                     variantSizes: { 
                                                       ...data.variantSizes, 
                                                       [key]: newSizes 
                                                     } 
                                                   });
                                                 }}
                                                 className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200"
                                               >
                                                 <MdClose className="h-3 w-3" />
                                               </button>
                                             </div>
                                           ))}
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               )}
                               

                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
               )}
             </div>

            {/* Preview Generated Variants */}
            {Object.keys(data.variantSizes || {}).length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h6 className="mb-3 text-base font-bold text-navy-700 dark:text-white">
                  Variant Combinations Preview
                </h6>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Object.entries(data.variantSizes || {}).map(([key, sizes]) => {
                    if (sizes.length > 0) {
                      const [variantType, variantValue] = key.split('_');
                      return (
                        <div key={key} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-navy-700 rounded-lg">
                          <span className="text-sm text-navy-700 dark:text-white">
                            {variantType}: {variantValue} - {sizes.join(', ')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {sizes.length} size(s)
                          </span>
                        </div>
                      );
                    } else {
                      // Show variants without sizes
                      const [variantType, variantValue] = key.split('_');
                      return (
                        <div key={key} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            {variantType}: {variantValue} - No sizes
                          </span>
                          <span className="text-xs text-blue-500">Single variant</span>
                        </div>
                      );
                    }
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  In the next step, you'll set individual pricing and inventory for each variant combination.
                </p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your product will have a single configuration. You can enable size variations below.
            </p>
            
            {/* Size Matrix for Single Variant */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h6 className="text-base font-bold text-navy-700 dark:text-white">
                    Enable Size Variations
                  </h6>
                  <p className="text-sm text-gray-600">
                    Add different sizes with individual pricing and stock
                  </p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="enableSizeMatrixSingle"
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
                  
                  {/* Predefined Sizes */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-200 hover:border-brand-500 dark:border-gray-700">
                        <input
                          type="checkbox"
                          checked={data.sizes?.includes(size)}
                          onChange={(e) => {
                            const currentSizes = data.sizes || [];
                            if (e.target.checked) {
                              onDataChange({ sizes: [...currentSizes, size] });
                            } else {
                              onDataChange({ sizes: currentSizes.filter(s => s !== size) });
                            }
                          }}
                          className="text-brand-500"
                        />
                        <span className="text-sm text-navy-700 dark:text-white">{size}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Size Tags */}
                  {(data.sizes || []).length > 0 && (
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
                  )}

                  {/* Add Custom Size */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                      placeholder="Add custom size (e.g., 32, 34, 36)..."
                      className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
                    />
                    <button
                      onClick={addSize}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300"
                    >
                      <MdAdd className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Size Preview */}
                  {(data.sizes || []).length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-navy-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        You've selected {data.sizes.length} size(s). In the next step, you'll be able to set:
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Individual MRP for each size</li>
                        <li>• Individual stock quantity for each size</li>
                        <li>• Individual discount percentage for each size</li>
                        <li>• Individual discounted price for each size</li>
                        <li>• Individual SKU and barcode for each size</li>
                      </ul>
                    </div>
                  )}
                  

                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VariantConfiguration; 