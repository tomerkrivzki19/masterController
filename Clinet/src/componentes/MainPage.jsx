import React, { useContext } from "react";
import { useState, useEffect } from "react";
import DeilveryProtocols from "./subcompnents/deilveryProtocols";
import {
  fetchProducts,
  fetchTopSellingProducts,
  addToCart,
} from "../services/shopify";
import { CartContext } from "../contexts/cartContext";

function mainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchTopSellingProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products", error);
      }
    };

    loadProducts();
  }, []);
  // console.log(products[0].variants[0].id);
  const { addToCart, addProductCartLoading } = useContext(CartContext);
  const [loadingIndex, setLoadingIndex] = useState(null); // Manage which button is loading

  //to avoid all btn loader
  const handleAddCart = async (variantId, quantity, indexP) => {
    setLoadingIndex(indexP);
    await addToCart(variantId, quantity);
    setLoadingIndex(null);
  };
  return (
    <>
      <div className="main-header-container">
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-11"
                />
                <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Anim aute id magna aliqua ad ad non deserunt sunt.{" "}
                    <a
                      href="#"
                      className="whitespace-nowrap font-semibold text-indigo-600"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                  Data to enrich your online business
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
                className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="top-sellers-container">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product, index) => {
                return (
                  <div className="flex flex-col items-center  space-y-4">
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
                            <a
                              href={`/product/${encodeURIComponent(
                                product.id
                              )}`}
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.title}
                            </a>
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {/* Check if variants exist and get the price of the first variant */}
                          {product.variants[0]?.price
                            ? `${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}`
                            : "Price not available"}
                        </p>
                      </div>
                    </div>
                    <button
                      // onClick={() => addToCart(product.variants[0].id, 1)}
                      onClick={() =>
                        handleAddCart(product.variants[0].id, 1, index)
                      }
                      className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                      disabled={loadingIndex === index || addProductCartLoading}
                    >
                      {loadingIndex === index ? (
                        <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                      ) : (
                        "הוסף לסל"
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <DeilveryProtocols />

      <div className="promo-section-continaer">
        {" "}
        <div className="bg-white">
          <div className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative pb-16 pt-48 sm:pb-24">
                  <div>
                    <h2
                      id="sale-heading"
                      className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                    >
                      Final Stock.
                      <br />
                      Up to 50% off.
                    </h2>
                    <div className="mt-6 text-base">
                      <a href="#" className="font-semibold text-white">
                        Shop the sale
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default mainPage;
