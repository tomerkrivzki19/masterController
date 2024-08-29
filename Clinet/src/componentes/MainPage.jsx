import React, { useContext } from "react";
import { useState, useEffect } from "react";
import DeilveryProtocols from "./subcompnents/deilveryProtocols";
import {
  fetchProducts,
  fetchTopSellingProducts,
  addToCart,
} from "../services/shopify";
import { CartContext } from "../contexts/cartContext";
import logoItem from "../assets/mobile-logo.png";
import logoItemTwo from "../assets/wordmark-logo.png";
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
      <div className="main-header-container ">
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div
              className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-8 lg:pb-56 lg:pt-48 xl:col-span-6"
              dir="rtl"
            >
              <div className="mx-auto max-w-2xl lg:mx-0 lg:pr-16 xl:pr-24 ">
                <div className="flex place-content-around hidden lg:flex">
                  <img
                    alt="גן המשחקים לוגו"
                    src={logoItem}
                    className="h-13 w-1/3"
                  />
                  <img
                    alt="גן המשחקים לוגו שני"
                    src={logoItemTwo}
                    className="h-13 w-1/3"
                  />
                </div>
                <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    עיצוב ייחודי שיגרום לשלך להיות גיימר המוביל.
                    <a
                      href="/about"
                      className="whitespace-nowrap font-semibold text-indigo-600"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      לקרוא עוד <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                  עיצוב ייחודי שישדרג את בקר ה-Xbox שלך
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  עיצוב אישי של בקרי Xbox עם דגש על איכות ודיוק. הפוך את חוויית
                  המשחק שלך למיוחדת יותר עם בקרים מעוצבים באופן אישי שיתאימו
                  בדיוק לטעם שלך.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="/shop"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    התחל לעצב
                  </a>
                  <a
                    href="/about"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    למד עוד <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
              <img
                src="https://images.unsplash.com/photo-1618193139062-2c5bf4f935b7?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="בחור מסתכל טלוויזיה "
                className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="top-sellers-container">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2
              className="text-2xl font-bold tracking-tight text-gray-900 "
              dir="rtl"
            >
              לקוחות קונים 🛍️:
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
              <a href="/shop" className="pt-9 ">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-48"
                >
                  המשך בקנייה
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <DeilveryProtocols />

      <div className="promo-section-continaer">
        {/* {" "}TODO: THIS IS BACKEND -SERVER SIDE SECTION FOR CONTROLL EMAILS AND STUFF */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
              className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"
              dir="rtl"
            >
              <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                הישארו מעודכנים בהשקה שלנו!
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                הצטרפו לרשימת ההודעות שלנו ותהיו הראשונים לדעת על כל עדכון חשוב.
                אנחנו מבטיחים לא לפספס אף פרט!
              </p>
              <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  כתובת דוא"ל
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="הכניסו את כתובת הדוא\ל שלכם"
                  autoComplete="email"
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  שמרו אותי מעודכן
                </button>
              </form>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient
                    r={1}
                    cx={0}
                    cy={0}
                    id="759c1415-0410-454c-8f7c-9a820de03641"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(512 512) rotate(90) scale(512)"
                  >
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default mainPage;
