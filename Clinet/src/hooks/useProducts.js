// hooks/useProducts.js
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/shopify";
import { sortDataOptions } from "../utils/sortOptions";

const useProducts = (sortOption, productsType) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(productsType);
        const sortedProducts = sortDataOptions(sortOption, fetchedProducts);

        setProducts(sortedProducts);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [sortOption, productsType]);

  return { products, error, loading };
};

export default useProducts;
