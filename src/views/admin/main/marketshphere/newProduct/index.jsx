import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import { UseContextProvider } from "./contexts/StepperContext";
import Product from "./components/steps/Product";
import VariantConfiguration from "./components/steps/VariantConfiguration";
import InventoryPricing from "./components/steps/InventoryPricing";
import Card from "components/card";
import useProductApiStore from "stores/useProductApiStore";
import { toast } from "react-toastify";

const ProductNew = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({
    // Step 1: Basic Product Details
    title: '',
    subtitle: '',
    brand: '',
    brandId: '',
    primeCategory: '',
    category: '',
    subcategory: '',
    description: '',
    images: [],
    video: '',
    tags: [],
    seoSlug: '',
    visibility: 'public', // 'public', 'draft', 'private'
    
    // Step 2: Variant Configuration
    variantMode: 'single', // 'single' or 'multi'
    variantTypes: [], // e.g., [{ type: 'Color', values: ['Red', 'Blue'] }]
    enableSizeMatrix: false,
    sizes: [], // e.g., ['S', 'M', 'L', 'XL']
    
    // Step 3: Inventory, Pricing, Variant Matrix
    variants: [], // Generated matrix based on Step 2
    
    // Legacy fields for backward compatibility
    name: '',
    weight: '',
    color: '',
    collection: '',
    coverImage: '',
    videos: [],
    price: '',
    currency: 'usd'
  });

  const steps = [
    { stepNo: 1, name: "Product Details" },
    { stepNo: 2, name: "Variant Configuration" },
    { stepNo: 3, name: "Inventory & Pricing" },
  ];

  const updateProductData = (stepData) => {
    setProductData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  // Validation function for step progression
  const canProceedToNextStep = (step) => {
    switch (step) {
      case 1:
        return productData.title && 
               productData.primeCategory && 
               productData.category && 
               productData.subcategory;
      case 2:
        if (productData.variantMode === 'single') return true;
        return productData.variantTypes.length > 0;
      default:
        return true;
    }
  };

  const displayStep = (step) => {
    switch (step.stepNo) {
      case 1:
        return <Product data={productData} onDataChange={updateProductData} />;
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
      // Check validation before proceeding
      if (canProceedToNextStep(currentStep)) {
        newStep++;
      } else {
        return; // Don't proceed if validation fails
      }
    } else {
      newStep--;
    }
    
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const { createProduct } = useProductApiStore();

  const handleFinish = async () => {
    // Create the product object
    const newProduct = {
      id: Date.now().toString(), // Temporary ID, will be replaced by MongoDB _id
      sku: `SKU-${Date.now()}`, // Auto-generate SKU
      name: productData.title,
      subtitle: productData.subtitle,
      brand: productData.brand,
      description: productData.description,
      image: productData.coverImage || (productData.images && productData.images.length > 0 ? productData.images[0].preview : 'https://via.placeholder.com/100'),
      primeCategory: productData.primeCategory,
      category: productData.category,
      subcategory: productData.subcategory,
      price: productData.variants.length > 0 ? productData.variants[0].finalPrice : parseFloat(productData.price) || 0,
      discountedPrice: null,
      stock: productData.variants.length > 0 ? productData.variants.reduce((total, variant) => total + (variant.stock || 0), 0) : 0,
      dateAdded: new Date().toISOString().split('T')[0],
      status: "Active",
      visibility: productData.visibility,
      currency: productData.currency,
      tags: productData.tags,
      seoSlug: productData.seoSlug,
      images: productData.images || [],
      variants: productData.variants,
      variantMode: productData.variantMode,
      variantTypes: productData.variantTypes,
      enableSizeMatrix: productData.enableSizeMatrix,
      sizes: productData.sizes
    };

    try {
      console.log('Collected productData (all form inputs):', productData);
      if (Array.isArray(productData?.variants)) {
        console.log('Collected variants count:', productData.variants.length);
        console.table(productData.variants);
      }

      // Send to backend API
      const created = await createProduct(productData);
      console.log('New product created (API response):', created);

      // Toast success with backend message if available
      const successMessage = created?.message || 'Product created successfully!';
      toast.success(successMessage);

      // Navigate back to product management with success message
      navigate('/admin/main/marketsphere/product-management', {
        state: { 
          newProduct: created?.data || created,
          message: successMessage
        }
      });
    } catch (error) {
      console.error('Failed to create product:', error);
      const errMsg = error?.response?.data?.message || 'Failed to create product. Please check console for details.';
      toast.error(errMsg);
    }
  };

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
          {/* navigation button */}
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            onFinish={handleFinish}
            productData={productData}
            canProceed={canProceedToNextStep(currentStep)}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductNew; 