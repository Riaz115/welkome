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
    selectedVariantType: 'color', // Default to color for multi variant
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
        // For multi variant, require selectedVariantType
        return productData.selectedVariantType;
      case 3:
        return true;
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
    try {
      if (Array.isArray(productData?.variants)) {
        console.table(productData.variants);
      }

      const created = await createProduct(productData);

      const successMessage = created?.message || 'Product created successfully!';
      toast.success(successMessage);

      navigate('/admin/main/marketsphere/product-management', {
        state: { 
          newProduct: created?.data || created,
          message: successMessage
        }
      });
    } catch (error) {
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
            mode="create"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductNew; 