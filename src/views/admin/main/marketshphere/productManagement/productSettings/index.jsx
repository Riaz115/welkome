import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductBanner from "./components/ProductBanner";
import ProductInformation from "./components/ProductInformation";
import ProductPricing from "./components/ProductPricing";
import ProductStatus from "./components/ProductStatus";

// Using the same productsData from ProductManagement
const productsData = [
  {
    id: "507f1f77bcf86cd799439011",
    sku: "ELC-IPH-001",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with Pro camera system\nA17 Pro chip for ultimate performance\nTitanium design with Action Button",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    category: "Smartphones",
    primeCategory: "Electronics",
    price: 999,
    discountedPrice: 899,
    stock: 25,
    dateAdded: "2024-01-15",
    status: "Active",
    weight: "221g",
    color: "Natural Titanium",
    collection: "iPhone 15 Series",
    currency: "USD",
    uniqueCode: "IPH15PRO001",
    tags: ["smartphone", "apple", "titanium", "pro"],
    isActive: true,
    isFeatured: false,
    lowStockThreshold: 10
  },
  {
    id: "507f1f77bcf86cd799439012",
    sku: "ELC-SAM-002",
    name: "Samsung Galaxy S24",
    description: "Galaxy AI powered smartphone\n200MP camera with advanced zoom\nOne UI 6.1 with enhanced features",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop&crop=center",
    category: "Smartphones",
    primeCategory: "Electronics",
    price: 899,
    discountedPrice: 799,
    stock: 18,
    dateAdded: "2024-01-12",
    status: "Active",
    weight: "168g",
    color: "Phantom Black",
    collection: "Galaxy S24 Series",
    currency: "USD",
    uniqueCode: "SAMS24002",
    tags: ["smartphone", "samsung", "galaxy", "ai"],
    isActive: true,
    isFeatured: true,
    lowStockThreshold: 15
  },
  {
    id: "507f1f77bcf86cd799439013",
    sku: "ELC-MAC-003",
    name: "MacBook Pro 16\"",
    description: "M3 Pro chip for extreme performance\n18-hour battery life\nLiquid Retina XDR display",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop&crop=center",
    category: "Laptops",
    primeCategory: "Electronics",
    price: 2499,
    discountedPrice: 2299,
    stock: 12,
    dateAdded: "2024-01-10",
    status: "Active",
    weight: "2.1kg",
    color: "Space Gray",
    collection: "MacBook Pro Series",
    currency: "USD",
    uniqueCode: "MBP16M3003",
    tags: ["laptop", "apple", "macbook", "m3"],
    isActive: true,
    isFeatured: true,
    lowStockThreshold: 5
  },
  {
    id: "507f1f77bcf86cd799439014",
    sku: "ELC-PIX-004",
    name: "Google Pixel 8",
    description: "AI-powered photography features\nTitan M security chip\nPure Android experience",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=center",
    category: "Smartphones",
    primeCategory: "Electronics",
    price: 699,
    discountedPrice: 649,
    stock: 0,
    dateAdded: "2024-01-08",
    status: "Inactive",
    weight: "187g",
    color: "Obsidian",
    collection: "Pixel 8 Series",
    currency: "USD",
    uniqueCode: "PIX8004",
    tags: ["smartphone", "google", "pixel", "android"],
    isActive: false,
    isFeatured: false,
    lowStockThreshold: 10
  }
];

const ProductSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Find product by ID from the products data
    const product = productsData.find(p => p.id === id);
    if (product) {
      setProductData(product);
    } else {
      // If product not found, redirect back to product management
      navigate('/admin/main/marketsphere/product-management');
    }
  }, [id, navigate]);

  const handleProductUpdate = (updatedData) => {
    console.log('Updating product:', updatedData);
    setProductData(prevData => ({
      ...prevData,
      ...updatedData
    }));
    
    // Here you would normally make an API call to update the product
    // Example: await updateProduct(id, updatedData);
    
    // Show success message (you could add a toast notification here)
    alert('Product updated successfully!');
  };

  if (!productData) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          Loading product data...
        </div>
      </div>
    );
  }

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