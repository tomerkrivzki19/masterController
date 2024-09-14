import React, { useContext, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchTopSellingProducts } from "../services/shopify";
import { cartContext } from "../contexts/CartContext";

function ProductItem() {
  const { addToCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(true); // Manage which button is loading

  // Utility function for conditional class names
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const decodedId = decodeURIComponent(id);
        const productData = await fetchProductById(decodedId);

        if (productData === null) {
          navigate("*");
        }
        const productsData = await fetchTopSellingProducts(4);
        setProduct(productData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddCart = async (variantId, quantity) => {
    setLoadingIndex(false);
    try {
      await addToCart(variantId, quantity);
      setLoadingIndex(true);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="bg-white pt-10 sm:pt-4">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        {!product ? (
          <div className=" h-96 flex justify-center items-center	">
            <div className="w-10 h-10 rounded-full animate-spin border border-solid border-sky-500 border-t-transparent "></div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      <span className="sr-only">
                        {image.altText || "Image"}
                      </span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          alt={image.altText || "Image"}
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
                      alt={image.altText || "Image"}
                      src={image.src}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.variants[0].price.amount}{" "}
                  {product.variants[0].price.currencyCode}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.variants[0].compareAtPrice.amount > rating
                            ? "text-indigo-500"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {product.variants[0].compareAtPrice.amount} out of 5 stars
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  className="space-y-6 text-base text-gray-700"
                />
              </div>

              <form className="mt-6">
                {/* Colors TODO:*/}
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Color</h3>
                  {/* Placeholder for color options */}
                  <fieldset aria-label="Choose a color" className="mt-2">
                    {/* Add color options if available */}
                  </fieldset>
                </div>

                <div className="mt-10 flex">
                  <button
                    onClick={() => handleAddCart(product.variants[0].id, 1)}
                    type="button"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    {!loadingIndex ? (
                      <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                    ) : (
                      "הוסף לסל"
                    )}
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0"
                    />
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-right">
            :לקוחות גם רכשו{" "}
          </h2>
          {products.length === 0 ? (
            <div className=" h-96 flex justify-center items-center	">
              <div className="w-10 h-10 rounded-full animate-spin border border-solid border-sky-500 border-t-transparent "></div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.images[0]?.altText || "Product image"}
                      src={product.images[0]?.src || "/placeholder.jpg"}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={`/product/${encodeURIComponent(product.id)}`}>
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
  );
}

export default ProductItem;
