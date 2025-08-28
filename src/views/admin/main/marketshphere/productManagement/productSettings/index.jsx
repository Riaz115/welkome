import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stepper from "../../../ecommerce/newProduct/components/Stepper";
import StepperControl from "../../../ecommerce/newProduct/components/StepperControl";
import { UseContextProvider } from "../../../ecommerce/newProduct/contexts/StepperContext";
import ProductUpdate from "./components/steps/ProductUpdate";
import VariantConfiguration from "./components/steps/VariantConfiguration";
import InventoryPricing from "./components/steps/InventoryPricing";
import Card from "components/card";
import useProductApiStore from "stores/useProductApiStore";

const ProductSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProductApiStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState(null);
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
          // Transform the data to match our form structure
          const transformedData = {
            // Basic product details
            title: data.name || '',
            subtitle: data.subtitle || '',
            brand: data.brand || '',
            brandId: data.brand || '',
            primeCategory: data.category?.primeCategory || '',
            primeCategoryId: '',
            category: data.category?.category || '',
            categoryId: '',
            subcategory: data.category?.subCategory || '',
            subcategoryId: '',
            description: data.description || '',
            images: data.media?.images || [],
            coverImage: data.media?.coverImage || '',
            video: data.media?.videos?.[0] || '',
            tags: [],
            seoSlug: data.name?.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-') || '',
            visibility: 'public',
            

            variantMode: data.variants && data.variants.length > 0 ? 'multi' : 'single',
            variantTypes: data.variants ? [
              {
                type: 'Variant',
                values: data.variants.filter(v => v.name === 'Variant').map(v => v.value)
              }
            ] : [],
            enableSizeMatrix: false,
            sizes: [],
            

            variants: data.variants ? data.variants.map((variant, index) => ({
              id: index + 1,
              name: variant.value,
              sku: variant.name === 'SKU' ? variant.value : '',
              mrp: data.pricing?.basePrice || '',
              discount: data.pricing?.discountPercent || '',
              discountedPrice: data.pricing?.basePrice || '',
              finalPrice: data.pricing?.basePrice || '',
              stock: '',
              barcode: '',
              image: null,
              variantCombination: { Variant: variant.value }
            })) : [{
              id: 1,
              name: 'Default',
              sku: data.sku || '',
              mrp: data.pricing?.basePrice || '',
              discount: data.pricing?.discountPercent || '',
              discountedPrice: data.pricing?.basePrice || '',
              finalPrice: data.pricing?.basePrice || '',
              stock: '',
              barcode: '',
              image: null,
              variantCombination: { Default: 'Default' }
            }],
            

            name: data.name || '',
            weight: '',
            color: '',
            collection: '',
            videos: data.media?.videos || [],
            price: data.pricing?.basePrice || '',
            currency: 'usd',
            sku: data.sku || '',
            mrp: data.pricing?.basePrice || '',
            discount: data.pricing?.discountPercent || '',
            discountedPrice: data.pricing?.basePrice || '',
            finalPrice: data.pricing?.basePrice || '',
            stock: '',
            barcode: ''
          };
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

  const handleDataChange = (changes) => {
    setProductData(prev => ({
      ...prev,
      ...changes
    }));
  };

  const displayStep = (step) => {
    switch (step.stepNo) {
      case 1:
        return <ProductUpdate productData={productData} onDataChange={handleDataChange} />;
      case 2:
        return <VariantConfiguration productData={productData} onDataChange={handleDataChange} />;
      case 3:
        return <InventoryPricing productData={productData} onDataChange={handleDataChange} />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  if (loading) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          Loading product data...
        </div>
      </div>
    );
  }

  if (!productData) return null;

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
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductSettings;
