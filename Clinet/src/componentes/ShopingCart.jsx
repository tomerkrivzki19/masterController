import React, { useContext } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../contexts/cartContext";

function ShoppingCart() {
  const { cart, handleRemoveItem, subTotal, loading } = useContext(CartContext);
  console.log(cart[0]);

  return (
    <>
      <div className="cart-body">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            {loading === true ? (
              <div className="w-full h-96	flex justify-center items-center  ">
                <div className="w-5 h-5 rounded-full animate-spin border border-solid border-sky-500 border-t-transparent "></div>
              </div>
            ) : cart.length === 0 ? (
              <form className="mt-12 w-full h-96 	flex justify-center items-center">
                אין מוצרים קיימים בסל כרגע{" "}
              </form>
            ) : (
              <form className="mt-12">
                <section aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-t border-gray-200"
                  >
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="flex-shrink-0">
                          <img
                            alt={item.variant.image.altText}
                            src={item.variant.image.src}
                            className="h-10 w-10 rounded-md object-cover object-center sm:h-32 sm:w-32"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                          <div>
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
                                ${item.variant?.price.amount}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* {item.variant.size} */}
                            </p>
                          </div>
                          <div className="mt-4 flex flex-1 items-end justify-between">
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
                              <span>
                                {item.inStock
                                  ? "In stock"
                                  : `Will ship in ${item.leadTime}`}
                                {/* TODO: */}
                              </span>
                            </p>
                            <div className="ml-4">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                <span>Remove</span>
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
                    Order summary
                  </h2>
                  <div>
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                          Subtotal
                        </dt>
                        <dd className="ml-4 text-base font-medium text-gray-900">
                          ${subTotal}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-1 text-sm text-gray-500">
                      Shipping and taxes will be calculated at checkout.
                    </p>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 text-center text-sm">
                    <p>
                      or{" "}
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping{" "}
                        <span aria-hidden="true"> &rarr;</span>
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
