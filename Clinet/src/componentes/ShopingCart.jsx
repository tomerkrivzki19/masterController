import React, { useContext } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { cartContext } from "../contexts/CartContext";
import { redirectToCheckout } from "../services/shopify";

function ShoppingCart() {
  const { cart, handleRemoveItem, subTotal, loading } = useContext(cartContext);

  return (
    <>
      <div className="cart-body rtl">
        <div className="bg-white pt-10 sm:pt-0">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              סל קניות
            </h1>
            {loading === true ? (
              <div className="w-full h-96 flex justify-center items-center">
                <div className="w-5 h-5 rounded-full animate-spin border border-solid border-sky-500 border-t-transparent"></div>
              </div>
            ) : cart.length === 0 ? (
              <div className="mt-12 w-full h-96 flex justify-center items-center">
                אין מוצרים קיימים בסל כרגע
              </div>
            ) : (
              <form className="mt-12">
                <section aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    פריטים בעגלת הקניות שלך
                  </h2>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-t border-gray-200"
                  >
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col sm:flex-row py-6"
                      >
                        <div className="flex-shrink-0">
                          <img
                            alt={item.variant.image.altText}
                            src={item.variant.image.src}
                            className="h-20 w-20 rounded-md object-cover object-center sm:h-32 sm:w-32"
                          />
                        </div>
                        <div className="mt-4 flex flex-1 flex-col sm:mt-0 sm:ml-6">
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <a
                                href={`/product/${encodeURIComponent(
                                  item.variant.product.id
                                )}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.variant?.product.handle}
                              </a>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              ₪{item.variant?.price.amount}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            כמות: {item.quantity}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {/* {item.variant.size} */}
                          </p>
                          <div className="mt-4 flex items-end justify-between">
                            <p className="flex items-center space-x-2 text-sm text-gray-700">
                              {item.inStock ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 flex-shrink-0 text-green-500"
                                />
                              ) : (
                                <ClockIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                                />
                              )}
                              <span className="bg-yellow-300">
                                {item.inStock
                                  ? "In stock"
                                  : `Will ship in ${item.leadTime}`}
                              </span>
                            </p>
                            <div className="ml-4">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                <span>הסרה</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
                {/* Order summary */}
                <section aria-labelledby="summary-heading" className="mt-10">
                  <h2 id="summary-heading" className="sr-only">
                    סיכום הזמנה
                  </h2>
                  <div>
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                          סכום משנה
                        </dt>
                        <dd className="ml-4 text-base font-medium text-gray-900">
                          ₪{subTotal}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-1 text-sm text-gray-500">
                      משלוח ומיסים יחושבו בקופה.
                    </p>
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={redirectToCheckout}
                      type="button"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      לקופה
                    </button>
                  </div>
                  <div className="mt-6 text-center text-sm">
                    <p>
                      או{" "}
                      <a
                        href="/shop"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        המשך בקניות <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </p>
                  </div>
                </section>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
