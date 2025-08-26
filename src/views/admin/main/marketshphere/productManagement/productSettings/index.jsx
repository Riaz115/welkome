import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Reuse the New Product step UI for editing
import ProductBanner from "./components/ProductBanner";
import ProductInformation from "./components/ProductInformation";
import ProductPricing from "./components/ProductPricing";
import ProductStatus from "./components/ProductStatus";
import useProductApiStore from "stores/useProductApiStore";

const ProductSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProductApiStore();
  const [productData, setProductData] = useState(null);
  // Using original page design components fed by normalized productData
  const [loading, setLoading] = useState(true);

  const getFirstImageUrl = (p) => {
    if (!p) return "";
    if (p.media) {
      if (typeof p.media.coverImage === "string" && p.media.coverImage) return p.media.coverImage;
      const img0 = Array.isArray(p.media.images) ? p.media.images[0] : null;
      if (typeof img0 === "string" && img0) return img0;
      if (img0 && typeof img0 === "object") {
        return img0.url || img0.location || img0.secure_url || img0.path || img0.preview || "";
      }
    }
    if (typeof p.image === "string" && p.image) return p.image;
    if (typeof p.coverImage === "string" && p.coverImage) return p.coverImage;
    if (typeof p.thumbnail === "string" && p.thumbnail) return p.thumbnail;
    const img = Array.isArray(p.images) ? p.images[0] : null;
    if (!img) return "";
    if (typeof img === "string") return img;
    return img.url || img.location || img.secure_url || img.path || img.preview || "";
  };

  const normalizeProduct = (p) => {
    const normalizeId = (val) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      if (typeof val === "object" && val.$oid) return val.$oid;
      return String(val);
    };
    const normalizeDate = (val) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      if (typeof val === "object" && val.$date) return val.$date;
      return String(val);
    };
    const basePrice = Number(
      (p.pricing && (p.pricing.basePrice ?? p.pricing.price)) ?? p.price ?? 0
    ) || 0;
    const discountPercent = Number(p.pricing?.discountPercent ?? 0) || 0;
    const computedDiscounted = discountPercent > 0
      ? Number((basePrice * (1 - discountPercent / 100)).toFixed(2))
      : null;

    return {
      id: normalizeId(p._id) || p.id || normalizeId(p.id),
      sku: p.sku || "",
      name: p.name || p.title || "",
      description: p.description || "",
      image: getFirstImageUrl(p),
      category: (p.category && (p.category.category || p.category.name)) || p.category || "",
      primeCategory: (p.category && (p.category.primeCategory || p.category.primeCategory?.name)) || p.primeCategory || "",
      price: basePrice,
      discountPercent,
      discountedPrice: computedDiscounted,
      stock: Array.isArray(p.variants) ? p.variants.length : (p.stock || 0),
      dateAdded: normalizeDate(p.dateAdded || p.createdAt),
      status: p.status || "Active",
      variants: Array.isArray(p.variants) ? p.variants : [],
      // Optional fields used by forms
      weight: p.weight || "",
      color: p.color || "",
      collection: p.collection || "",
      currency: p.currency || "USD",
      tags: Array.isArray(p.tags) ? p.tags : [],
      lowStockThreshold: p.lowStockThreshold || 10,
    };
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        const data = res?.data || res;
        if (data && isMounted) {
          setProductData(normalizeProduct(data));
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

  const handleProductUpdate = async (updatedData) => {
    try {
      const payload = { ...updatedData };
      await updateProduct(id, payload);
      setProductData(prevData => ({
        ...prevData,
        ...updatedData
      }));
      alert('Product updated successfully!');
    } catch (e) {
      alert('Failed to update product');
    }
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
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[20px]">
        <div>
          <ProductBanner productData={productData} onUpdate={handleProductUpdate} />
        </div>
        <div className="mt-3">
          <ProductInformation productData={productData} onUpdate={handleProductUpdate} />
        </div>
      </div>
      <div className="">
        <div>
          <ProductPricing productData={productData} onUpdate={handleProductUpdate} />
        </div>
        <div>
          <ProductStatus productData={productData} onUpdate={handleProductUpdate} />
        </div>
      </div>
    </div>
  );
};

export default ProductSettings;