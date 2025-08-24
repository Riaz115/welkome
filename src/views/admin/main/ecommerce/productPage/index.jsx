import PhotoGallery from './components/PhotoGallery';
import ProductInfo from './components/ProductInfo';

const ProductPage = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-12 gap-3 rounded-[20px] bg-white bg-clip-border p-[18px] shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800">
      <div className="col-span-12 h-full w-full xl:col-span-7">
        {/* image */}
        <PhotoGallery />
      </div>

      <div className="col-span-12 w-full xl:col-span-5">
        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductPage;
