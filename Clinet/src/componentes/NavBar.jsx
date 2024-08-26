import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { CartContext } from "../contexts/cartContext";
import { removeProductFromCart } from "../services/shopify";

const navigation = [
  { name: "חנות", href: "/shop" },
  { name: "הסיפור שלנו", href: "/about" },
  { name: "שאלות תשובות", href: "/faq" },
];

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, loading, subTotal, handleRemoveItem } = useContext(CartContext);

  const [scrolled, setScrolled] = useState(false);

  //scroll efect
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

  // cart quantity
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        // className="mx-auto flex items-center justify-between gap-x-6 p-6 lg:px-8 fixed w-full z-50 bg-[#aa60cb]  "
        className={`mx-auto flex items-center justify-between gap-x-6 p-6 lg:px-8 fixed w-full z-50 duration-300 ease-in-out ${
          scrolled ? "bg-[#aa60cb]" : "bg-white shadow-md"
        }`}
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span>גן המשחקים</span>
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
          <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
            <PopoverButton className="group -m-2 flex items-center p-2">
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
              {/* items in cart, view bag */}
            </PopoverButton>
            <PopoverPanel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
              <h2 className="sr-only">Shopping Cart</h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.length === 0 ? (
                  <>
                    <div className="flex space-between space-x-4 size-full">
                      <div className="bg-yellow-200 flex space-x-4 p-1">
                        <span className="text-base	pt-2 font-mono">מוצרים</span>
                        <p className="text-base	 pt-2 font-mono">
                          {totalQuantity}
                        </p>
                      </div>
                      <h1 className="text-3xl ">🛒 הסל שלי </h1>
                    </div>
                    <ul className="items-center	w-full h-48 max-h-full hover:max-h-screen text-center pt-10 text-lg ">
                      <li>הסל ריק 🛒</li>
                    </ul>
                  </>
                ) : (
                  <div>
                    <div className="flex space-between space-x-4 size-full">
                      <div className="bg-yellow-200 flex space-x-4 p-1">
                        <span className="text-base	pt-2 font-mono">מוצרים</span>
                        <p className="text-base	 pt-2 font-mono">
                          {totalQuantity}
                        </p>
                      </div>
                      <h1 className="text-3xl ">🛒 הסל שלי </h1>
                    </div>
                    <ul className="items-center	">
                      {cart.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center  py-6 pl-5"
                        >
                          {/* Adjust the src and alt attributes based on your data structure */}
                          <img
                            alt={item.variant.imageAlt || "Product image"}
                            src={
                              item.variant.image.src ||
                              "https://via.placeholder.com/150"
                            } // Fallback image
                            className="h-16 w-24 flex-none rounded-md border border-gray-200"
                          />
                          <div className="ml-4 flex-auto">
                            <h3 className="font-medium text-gray-900">
                              <a href={item.variant.image.href || "#"}>
                                {/* {item.title} */}
                                {item.variant.price.amount}{" "}
                                {item.variant.price.currencyCode}
                              </a>{" "}
                              {/* Use `item.title` for product name */}
                            </h3>
                            <p className="text-gray-500">{item.title}</p>{" "}
                            {/* Use `color` if available */}
                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              handleRemoveItem(item.id);
                            }}
                          >
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
                sub-total {subTotal.toLocaleString()}
              </p>
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
              <p className="mt-6 text-center">
                <a
                  href="/cart"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Shopping Bag
                </a>
              </p>
            </PopoverPanel>
          </Popover>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 mt-12">
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10" dir="rtl">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default NavBar;
