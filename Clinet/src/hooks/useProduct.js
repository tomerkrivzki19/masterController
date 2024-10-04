// hooks/useProduct.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductById, fetchTopSellingProducts } from "../services/shopify";

const useProduct = (id, productIds) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const decodedId = decodeURIComponent(id);
        const productData = await fetchProductById(decodedId);

        if (!productData) {
          navigate("*");
          return;
        }

        const topProducts = await fetchTopSellingProducts(4);
        setProduct(productData);
        setProducts(topProducts);

        setIsFavorite(productIds.includes(decodedId)); // Check if it's a favorite
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/500"); // Navigate to a 500 error page on failure
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    loadProduct();
  }, [id, productIds, navigate]);

  return { product, products, isFavorite, setIsFavorite, loading };
};

export default useProduct;
