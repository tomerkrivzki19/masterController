import React, { useContext, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  StarIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchTopSellingProducts } from "../services/shopify";
import { Radio, RadioGroup } from "@headlessui/react";

import { cartContext } from "../contexts/CartContext";
import { FavoriteContext } from "../contexts/FavoritesContext";
import Toast from "../utils/tostify";
import MetaWrapper from "../utils/MetaWrapper";
import useProduct from "../hooks/useProduct";

function ProductItem() {
  const { id } = useParams();
  const { addToCart } = useContext(cartContext);
  const { productIds, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);

  const { product, products, isFavorite, setIsFavorite, loading } = useProduct(
    id,
    productIds
  );

  const [loadingIndex, setLoadingIndex] = useState(true); // Manage which button is loading

  const tostify = new Toast();

  // const navigate = useNavigate();
  // const [product, setProduct] = useState(null);
  // const [products, setProducts] = useState([]);

  // // The statement useState(new Set()) initializes the favoritesSet state with an empty Set. A Set is a data structure in JavaScript that allows for fast lookups and ensures that all elements are unique.
  // // const [favoritesSet, setFavoritesSet] = useState(new Set());
  // const [isFavorite, setIsFavorite] = useState(false);

  // Utility function for conditional class names

  // useEffect(() => {
  //   async function fetchProduct() {
  //     try {
  //       const decodedId = decodeURIComponent(id);
  //       const productData = await fetchProductById(decodedId);

  //       if (productData === null) {
  //         navigate("*");
  //       }
  //       const productsData = await fetchTopSellingProducts(4);
  //       setProduct(productData);
  //       setProducts(productsData);

  //       setIsFavorite(productIds.includes(decodedId)); // Check the Set directly
  //     } catch (error) {
  //       navigate("/500");
  //     }
  //   }

  //   fetchProduct();
  // }, [id, navigate, productIds]);

  // console.log(loadingIndex);

  const toggleFavorite = (id, name) => {
    if (isFavorite) {
      removeFromFavorites(id, name); // Use the product's name for GA
    } else {
      addToFavorites(id, name); // Use the product's name for GA
    }
    setIsFavorite(!isFavorite); // Toggle favorite state
  };

  const handleAddCart = async (variantId, quantity) => {
    setLoadingIndex(false);

    try {
      await addToCart(variantId, quantity);
      // setLoadingIndex(false);

      // Show "נוסף לסל" for 6 seconds
      setTimeout(() => {
        setLoadingIndex(true); // Reset loadingIndex to show "הוסף לסל" after 6 seconds
      }, 15000);
    } catch (error) {
      tostify.createToast(
        "error",
        "הוספת הפריט לעגלת הקניות נכשלה. אנא נסה שוב"
      );
      return;
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Function to handle tab selection
  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  console.log(currentImageIndex);
  console.log(product);
  // NOTE- availableForSale options false if there is out of stock

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <MetaWrapper
        title={product?.title || "Loading..."}
        description={product?.description || "Product details"}
      />
      <div className="bg-white pt-10 sm:pt-4 ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          {!product ? (
            <div className="animate-pulse flex flex-col items-center justify-center space-y-4 pt-20">
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <h1 className="text-gray-500">LOADING.....</h1>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 rtl">
              {/* Image gallery */}
              <TabGroup className="flex flex-col-reverse ">
                {/* Image selector */}
                <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                  <TabList className="grid sm:grid-cols-4 gap-x-7 gap-y-4 grid-cols-3  sm:gap-6">
                    {product.images.map((image) => (
                      <Tab
                        key={image.id}
                        className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        <span className="sr-only">{image.name}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            alt={image.alt}
                            src={image.src}
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                        />
                      </Tab>
                    ))}
                  </TabList>
                </div>

                <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                  {product.images.map((image) => (
                    <TabPanel key={image.id}>
                      <img
                        alt={image.alt}
                        src={image.src}
                        className=" w-full object-cover object-center sm:rounded-lg sm:-mt-20"
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 sticky top-40">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product.title}
                </h1>
                <div className="flex justify-between items-center ">
                  <div className="mt-3 flex sm:gap-x-16 gap-x-8">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">
                      {product.variants[0].price.amount} ₪
                    </p>
                    <p className="text-3xl tracking-tight text-gray-600 line-through">
                      {product.variants[0].compareAtPrice.amount} ₪
                    </p>
                  </div>

                  {/* special logo */}

                  {product.variants[0]?.selectedOptions[1]?.name ===
                    "special" &&
                  product.variants[0]?.selectedOptions[1]?.value === "true" ? (
                    <div className="flex flex-col  justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-Cherry"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <p className="text-Cherry">מיוחד</p>
                    </div>
                  ) : (
                    <div className="sr-only"></div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                    className="space-y-6 text-base text-gray-700"
                  />
                </div>

                <form className="mt-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      צבעים:
                    </h3>
                    <fieldset aria-label="Choose a color" className="mt-2">
                      <div>
                        {product.variants[0]?.selectedOptions[0]?.value}
                      </div>
                    </fieldset>
                  </div>

                  <div className="mt-10 flex  gap-x-8">
                    {/* TODO: check if working , if there no errors  */}
                    {!product.availableForSale ? (
                      <button
                        className=" cursor-not-allowed flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-indigo-600 border-indigo-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full "
                        disabled
                      >
                        נגמר המלאי
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddCart(product.variants[0].id, 1)}
                        type="button"
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full "
                      >
                        {!loadingIndex ? (
                          // <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                          <div className="flex gap-2 animate-fade-left animate-delay-300">
                            נוסף לסל
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                              />
                            </svg>
                          </div>
                        ) : (
                          "הוסף לסל"
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id, product.title)}
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      {isFavorite ? (
                        <SolidHeartIcon
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-red-500  animate-jump-in animate-once  animate-delay-500"
                        />
                      ) : (
                        <HeartIcon
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 "
                        />
                      )}

                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </form>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">
                    {/* Details Section  FIXME:*/}
                    {/* Placeholder for additional details */}
                    {/* If product.details becomes available, render them here */}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>

        {/* products container */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:pt-2 sm:pb-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-right">
              :לקוחות גם רכשו{" "}
            </h2>
            {loading ? (
              <div className="animate-pulse flex flex-col items-center justify-center space-y-4 sr-only ">
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                <h1 className="text-gray-500">LOADING.....</h1>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group lg:h-80">
                      {/* First (default) image */}
                      <img
                        alt={product.images[0]?.altText || "Product image"}
                        src={product.images[0]?.src || "/placeholder.jpg"}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full lg:group-hover:opacity-0 transition-opacity duration-300"
                      />

                      {/* Second (hover) image, applied only on large screens */}
                      {product.images[1] && (
                        <img
                          alt={
                            product.images[1]?.altText || "Hover product image"
                          }
                          src={product.images[1]?.src || "/placeholder.jpg"}
                          className="absolute inset-0 h-full w-full object-cover object-center lg:h-full lg:w-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </div>

                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a
                            href={`/product/${encodeURIComponent(product.id)}`}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
