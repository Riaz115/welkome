// Assets
import { MdOutlineCloudUpload } from "react-icons/md";
import DropZonefile from "../../../../newProduct/components/DropZonefile";
import { useCallback } from "react";

const MediaUpdate = ({ productData, onDataChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle file uploads
    if (acceptedFiles.length > 0) {
      const files = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));

      // Set the first image as cover image
      if (files.length > 0) {
        if (onDataChange) {
          onDataChange({
            coverImage: files[0].preview,
            images: [...(productData?.images || []), ...files]
          });
        }
      }
    }
  }, [productData?.images, onDataChange]);

  const removeImage = (indexToRemove) => {
    const updatedImages = (productData?.images || []).filter((_, index) => index !== indexToRemove);
    if (onDataChange) {
      onDataChange({
        images: updatedImages,
        // If we removed the cover image, set a new cover or clear it
        coverImage: indexToRemove === 0 ? (updatedImages[0]?.preview || '') : productData?.coverImage
      });
    }
  };

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="mb-6 pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Media
      </h4>
      
      {/* Upload Area */}
      <div className="flex w-full items-center justify-center rounded-[20px] mb-6">
        <DropZonefile
          onDrop={onDrop}
          content={
            <div className="flex h-[225px] w-full flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700 sm:w-[400px] md:w-[570px] lg:w-[700px] xl:w-[600px] 2xl:w-[690px] 3xl:w-[680px]">
              <p className="text-[80px] text-navy-700">
                <MdOutlineCloudUpload className="text-brand-500 dark:text-white" />
              </p>
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                Drop your files here, or{" "}
                <span className="font-bold text-brand-500 dark:text-brand-400">
                  browse
                </span>
              </p>
              <p className="pt-2 text-sm text-gray-600">
                PNG, JPG and GIF files are allowed
              </p>
            </div>
          }
        />
      </div>

      {/* Uploaded Images Preview */}
      {productData?.images && productData.images.length > 0 && (
        <div className="mt-6">
          <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
            Uploaded Images ({productData.images.length})
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productData.images.map((imageData, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageData.preview || imageData.url || imageData}
                  alt={`Product ${index + 1}`}
                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                />
                {index === 0 && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                      Cover
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="mt-1">
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {imageData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(imageData.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpdate;
