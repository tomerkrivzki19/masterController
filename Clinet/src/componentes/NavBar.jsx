import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { cartContext } from "../contexts/CartContext";
import { redirectToCheckout } from "../services/shopify";
import mainLogo from "../assets/horizontal-logo.png";
import { FavoriteContext } from "../contexts/FavoritesContext";

const navigation = [
  { name: "תקנון האתר", href: "/site-policy" },
  { name: "שאלות תשובות", href: "/faq" },
  { name: "הסיפור שלנו", href: "/about" },
  { name: `חנות`, href: "/shop" },
];

function NavBar() {
  const {
    cart,
    loading,
    subTotal,
    handleRemoveItem,
    isCartOpen,
    setIsCartOpen,
  } = useContext(cartContext);

  const { productIds } = useContext(FavoriteContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart quantity
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className={`mx-auto flex items-center justify-between h-24 p-5 gap-x-6 lg:px-8 fixed w-full z-50 duration-300 ease-in-out ${
          scrolled ? "bg-[#aa60cb]" : "bg-white shadow-md"
        }`}
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src={mainLogo} alt="לוגו" className="h-40 w-full" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a href="/favorites">
            {productIds.length > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-red-400"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 text-zinc-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </a>

          {/* Regular button to open/close the cart */}
          <button
            className="group -m-2 flex items-center p-2"
            onClick={() => setIsCartOpen((prev) => !prev)}
          >
            <ShoppingBagIcon
              aria-hidden="true"
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            />
            {loading ? (
              <div className="w-5 h-5 rounded-full animate-spin border border-solid border-sky-500 border-t-transparent"></div>
            ) : (
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Conditional rendering for the cart */}
          {isCartOpen && (
            <div className="ml-4 flow-root text-sm lg:relative lg:ml-8">
              <div className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg transition-opacity duration-200 ease-out sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                <h2 className="sr-only">Shopping Cart</h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.length === 0 ? (
                    <>
                      <div className="flex justify-center space-x-4 w-full">
                        <h1 className="text-3xl">🛒 הסל שלי</h1>
                      </div>
                      <ul className="items-center w-full h-48 max-h-full hover:max-h-screen text-center pt-10 text-lg">
                        <li>הסל ריק 🛒</li>
                      </ul>
                    </>
                  ) : (
                    <div>
                      <div className="flex justify-center space-x-4 w-full">
                        <h1 className="text-3xl">🛒 הסל שלי</h1>
                      </div>
                      <ul className="items-center">
                        {cart.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center py-6 pl-5"
                          >
                            <img
                              alt={item.variant.imageAlt || "Product image"}
                              src={
                                item.variant.image.src ||
                                "https://via.placeholder.com/150"
                              }
                              className="h-16 w-24 flex-none rounded-md border border-gray-200"
                            />
                            <div className="ml-4 flex-auto">
                              <h3 className="font-medium text-gray-900">
                                <a href={item.variant.image.href || "#"}>
                                  ₪ {item.variant.price.amount}
                                </a>
                              </h3>
                              <p className="text-gray-500">{item.title}</p>
                              <p className="text-gray-500">
                                כמות: {item.quantity}
                              </p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)}>
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
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </ul>
                <p className="mt-6 text-center font-mono">
                  סכום ביניים : ₪{subTotal.toLocaleString()}
                </p>
                <button
                  onClick={redirectToCheckout}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 mt-2"
                >
                  לקופה
                </button>
                <p className="mt-6 text-center">
                  <a
                    href="/cart"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    צפה בסל קניות
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className=" lg:hidden flex items-center justify-center  ">
          <button
            type="button"
            className=" text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 " />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-10 bg-black/30 rtl"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white px-6 py-6  text-right ">
          <button
            type="button"
            className="p-2 mt-20 text-gray-700 "
            onClick={() => setMobileMenuOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="mt- space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default NavBar;
