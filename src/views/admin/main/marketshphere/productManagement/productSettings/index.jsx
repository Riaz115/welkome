import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stepper from "../../newProduct/components/Stepper";
import StepperControl from "../../newProduct/components/StepperControl";
import { UseContextProvider } from "../../newProduct/contexts/StepperContext";
import ProductUpdate from "./components/steps/ProductUpdate";
import VariantConfiguration from "./components/steps/VariantConfiguration";
import InventoryPricing from "./components/steps/InventoryPricing";
import Card from "components/card";
import useProductApiStore from "stores/useProductApiStore";
import { toast } from "react-toastify";

const ProductSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProductApiStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({
    title: '',
    subtitle: '',
    brand: '',
    brandId: '',
    primeCategory: '',
    category: '',
    subcategory: '',
    description: '',
    images: [],
    videos: [],
    tags: [],
    seoSlug: '',
    visibility: 'public',
    variantMode: 'single',
    variantTypes: [],
    colorValues: '',
    modelValues: '',
    customVariantName: '',
    customVariantValues: '',
    enableSizeMatrix: false,
    sizes: [],
    variants: [],
    name: '',
    weight: '',
    color: '',
    collection: '',
    coverImage: '',
    price: '',
    currency: 'usd',
    readOnlyPrice: '',
    readOnlyDiscount: '',
    readOnlyFinalPrice: ''
  });
  const [loading, setLoading] = useState(true);

  const steps = [
    { stepNo: 1, name: "Product Details" },
    { stepNo: 2, name: "Variant Configuration" },
    { stepNo: 3, name: "Inventory & Pricing" },
  ];

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        const data = res?.data || res;
        if (data && isMounted) {
          console.log('Raw API data:', data);
          console.log('Category field type:', typeof data.category);
          console.log('Category field value:', data.category);
          if (data.category && typeof data.category === 'object') {
            console.log('Category object keys:', Object.keys(data.category));
          }
          const transformedData = {
            title: data.title || data.name || '',
            subtitle: data.subtitle || '',
            brand: data.brand || '',
            brandId: data.brandId || '',
            primeCategory: typeof data.primeCategory === 'string' ? data.primeCategory : 
                          (data.category && typeof data.category === 'object' ? data.category.primeCategory || '' : ''),
            primeCategoryId: data.primeCategoryId || '',
            category: typeof data.category === 'string' ? data.category : 
                     (data.category && typeof data.category === 'object' ? data.category.category || '' : ''),
            categoryId: data.categoryId || '',
            subcategory: typeof data.subcategory === 'string' ? data.subcategory : 
                        (data.category && typeof data.category === 'object' ? data.category.subCategory || '' : ''),
            subcategoryId: data.subcategoryId || '',
            description: data.description || '',
            images: data.images || [],
            videos: data.videos || [],
            tags: data.tags || [],
            seoSlug: data.seoSlug || '',
            visibility: data.visibility || 'public',
            variantMode: data.variantMode || 'single',
            selectedVariantType: (() => {
              // Determine variant type based on existing data
              if (data.variantMode === 'single') return 'color'; // Default for single
              const colorValues = Array.isArray(data.colorValues) ? data.colorValues : (data.colorValues ? [data.colorValues] : []);
              const modelValues = Array.isArray(data.modelValues) ? data.modelValues : (data.modelValues ? [data.modelValues] : []);
              const customVariantValues = Array.isArray(data.customVariantValues) ? data.customVariantValues : (data.customVariantValues ? [data.customVariantValues] : []);
              
              if (colorValues.length > 0) return 'color';
              if (modelValues.length > 0) return 'model';
              if (customVariantValues.length > 0 || data.customVariantName) return 'custom';
              return 'color'; // Default
            })(),
            variantTypes: data.variantTypes || [],
            colorValues: Array.isArray(data.colorValues) ? data.colorValues : (data.colorValues ? [data.colorValues] : []),
            modelValues: Array.isArray(data.modelValues) ? data.modelValues : (data.modelValues ? [data.modelValues] : []),
            customVariantName: data.customVariantName || '',
            customVariantValues: Array.isArray(data.customVariantValues) ? data.customVariantValues : (data.customVariantValues ? [data.customVariantValues] : []),
            enableSizeMatrix: data.enableSizeMatrix || false,
            sizes: data.sizes || [],
            variants: data.variants || [],
            name: data.name || '',
            weight: data.weight || '',
            color: data.color || '',
            collection: data.collection || data.productCollection || '',
            coverImage: data.coverImage || '',
            price: data.price || data.pricing?.basePrice || '',
            currency: data.currency || 'usd',
            readOnlyPrice: data.price || data.pricing?.basePrice || '',
            readOnlyDiscount: data.discount || data.pricing?.discountPercent || '',
            readOnlyFinalPrice: data.finalPrice || data.pricing?.basePrice || ''
          };
          console.log('Transformed data:', transformedData);
          console.log('PrimeCategory type:', typeof transformedData.primeCategory);
          console.log('Category type:', typeof transformedData.category);
          console.log('Subcategory type:', typeof transformedData.subcategory);
          setProductData(transformedData);
        } else if (isMounted) {
          navigate('/admin/main/marketsphere/product-management');
        }
      } catch (e) {
        navigate('/admin/main/marketsphere/product-management');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [id, getProductById, navigate]);

  const updateProductData = (stepData) => {
    setProductData(prev => {
      // If variants are being updated from Step 2 (VariantConfiguration), preserve existing data
      // But if variants are being updated from Step 3 (InventoryPricing), don't interfere
      if (stepData.variants && prev.variants && !stepData.fromInventoryPricing) {
        const updatedVariants = stepData.variants.map(newVariant => {
          // Try to find existing variant with same characteristics
          const existingVariant = prev.variants.find(existing => {
            // Match by exact name first
            if (existing.name === newVariant.name) return true;
            
            // Match by variant characteristics
            return existing.variantType === newVariant.variantType && 
                   existing.variantValue === newVariant.variantValue && 
                   existing.size === newVariant.size;
          });

          // If we found an existing variant with data, preserve it
          if (existingVariant && (existingVariant.mrp || existingVariant.stock || existingVariant.sku || existingVariant.barcode)) {
            return {
              ...newVariant,
              mrp: existingVariant.mrp,
              stock: existingVariant.stock,
              sku: existingVariant.sku,
              barcode: existingVariant.barcode,
              discount: existingVariant.discount,
              discountedPrice: existingVariant.discountedPrice,
              finalPrice: existingVariant.finalPrice,
              images: existingVariant.images || []
            };
          }
          
          return newVariant;
        });

        return {
          ...prev,
          ...stepData,
          variants: updatedVariants
        };
      }

      // For all other updates (including from Step 3), just update normally
      return {
        ...prev,
        ...stepData
      };
    });
  };

  const canProceedToNextStep = (step) => {
    switch (step) {
      case 1:
        return productData.title && 
               productData.primeCategory && 
               productData.category && 
               productData.subcategory;
      case 2:
        // Always allow proceeding to step 2 since variant configuration is auto-detected
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const displayStep = (step) => {
    switch (step.stepNo) {
      case 1:
        return <ProductUpdate data={productData} onDataChange={updateProductData} />;
      case 2:
        return <VariantConfiguration data={productData} onDataChange={updateProductData} />;
      case 3:
        return <InventoryPricing data={productData} onDataChange={updateProductData} />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      if (canProceedToNextStep(currentStep)) {
        newStep++;
      } else {
        return;
      }
    } else {
      newStep--;
    }
    
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleFinish = async () => {
    try {
      console.log('=== UPDATE PRODUCT DEBUG ===');
      console.log('Product ID:', id);
      console.log('Full product data:', productData);
      console.log('Variants count:', productData.variants?.length || 0);
      console.log('Variants data:', productData.variants);
      console.log('API Store updateProduct function:', updateProduct);

      // Clean the product data to match create format exactly
      const cleanedProductData = {
        title: productData.title || '',
        subtitle: productData.subtitle || '',
        brand: productData.brand || '',
        brandId: productData.brandId || '',
        primeCategory: productData.primeCategory || '',
        primeCategoryId: productData.primeCategoryId || '',
        category: productData.category || '',
        categoryId: productData.categoryId || '',
        subcategory: productData.subcategory || '',
        subcategoryId: productData.subcategoryId || '',
        description: productData.description || '',
        images: productData.images || [],
        videos: productData.videos || [],
        tags: productData.tags || [],
        seoSlug: productData.seoSlug || '',
        visibility: productData.visibility || 'public',
        variantMode: productData.variantMode || 'single',
        variantTypes: productData.variantTypes || [],
        colorValues: Array.isArray(productData.colorValues) ? productData.colorValues : [],
        modelValues: Array.isArray(productData.modelValues) ? productData.modelValues : [],
        customVariantName: productData.customVariantName || '',
        customVariantValues: Array.isArray(productData.customVariantValues) ? productData.customVariantValues : [],
        enableSizeMatrix: productData.enableSizeMatrix || false,
        sizes: productData.sizes || [],
        variants: productData.variants || [],
        currency: productData.currency || 'usd',
        // Remove any extra fields that might cause issues
      };

      console.log('Cleaned product data:', cleanedProductData);

      // Try multipart first, if it fails, try regular JSON
      let updated;
      try {
        updated = await updateProduct(id, cleanedProductData, { isMultipart: true });
      } catch (multipartError) {
        console.warn('Multipart update failed, trying JSON update:', multipartError);
        updated = await updateProduct(id, cleanedProductData, { isMultipart: false });
      }
      const successMessage = updated?.message || 'Product updated successfully!';
      
      console.log('Product update API response:', updated);
      toast.success(successMessage);

      navigate('/admin/main/marketsphere/product-management', {
        state: { 
          updatedProduct: updated?.data || updated,
          message: successMessage
        }
      });
    } catch (error) {
      console.error('=== UPDATE PRODUCT ERROR ===');
      console.error('Full error object:', error);
      console.error('Error response:', error?.response);
      console.error('Error response data:', error?.response?.data);
      console.error('Error message:', error?.message);
      console.error('Error status:', error?.response?.status);
      
      const errMsg = error?.response?.data?.message || error?.message || 'Failed to update product. Please check console for details.';
      toast.error(errMsg);
    }
  };

  if (loading || !productData) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          {loading ? 'Loading product data...' : 'No product data available'}
        </div>
      </div>
    );
  }

  // Ensure all required fields are properly transformed
  if (typeof productData.primeCategory === 'object' || 
      typeof productData.category === 'object' || 
      typeof productData.subcategory === 'object') {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          Processing product data...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 h-full w-full">
      <div className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brand-400 to-brand-600 md:h-[390px]" />
      <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
        <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
          <Stepper
            action={setCurrentStep}
            steps={steps}
            currentStep={currentStep}
          />
        </div>
        <Card extra={"h-full mx-auto pb-3"}>
          <div className="rounded-[20px]">
            <UseContextProvider>
              {displayStep(steps[currentStep - 1])}
            </UseContextProvider>
          </div>
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            onFinish={handleFinish}
            productData={productData}
            canProceed={canProceedToNextStep(currentStep)}
            mode="update"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductSettings;
