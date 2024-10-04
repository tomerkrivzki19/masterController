// hooks/useProducts.js
import { useContext, useEffect, useState } from "react";
import { fetchProducts, fetchTopSellingProducts } from "../services/shopify";
import { cartContext } from "../contexts/CartContext";

const loadProducts = (limit) => {
  const { cart } = useContext(cartContext);
  console.log("limit", limit);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchTopSellingProducts(limit);
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [cart, limit]);

  return { products, error, loadingProducts: loading };
};

export default loadProducts;
