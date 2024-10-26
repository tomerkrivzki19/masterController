import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Fragment,
} from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { cartContext } from "../contexts/CartContext";
import { redirectToCheckout } from "../services/shopify";
import mainLogo from "../assets/horizontal-logo.png";
import { FavoriteContext } from "../contexts/FavoritesContext";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Toast from "../utils/tostify";

const navigation = [
  { name: "תקנון האתר", href: "/site-policy" },
  { name: "שאלות תשובות", href: "/faq" },
  { name: "הסיפור שלנו", href: "/about" },
  { name: `חנות`, href: "/shop" },
];

function NavBar() {
  const { cart, subTotal, handleRemoveItem, isCartOpen, setIsCartOpen } =
    useContext(cartContext);

  const { productIds } = useContext(FavoriteContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const tostify = new Toast();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsCartOpen(false); // Close cart if clicking outside
      }
    };

    // Attach event listeners
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cart quantity
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutLink = () => {
    try {
      if (cart.length === 0)
        return tostify.createToast("warning", "אנא מלא/י את הסל קודם ");

      redirectToCheckout();
    } catch (error) {
      tostify.createToast("warning", " שגיעה במעבר אנא נסה במועד מאוחר יותר ");
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className={`mx-auto flex items-center justify-between h-24 p-5 gap-x-6 lg:px-8 fixed w-full z-50 duration-300 ease-in-out ${
          scrolled ? "bg-[#aa60cb]" : "bg-white shadow-md"
        } `}
      >
        <div className="flex lg:flex-1 overflow-hidden h-24 items-center">
          <a href="/" className="-m-1.5 p-1.5 pb-4">
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

        <div className="flex flex-1 items-center justify-end ">
          <a href="/favorites">
            {productIds.length > 0 ? (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-black"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </div>
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
          {/* Conditional rendering for the cart */}
          <Popover
            className="ml-4 flow-root text-sm lg:relative lg:ml-8"
            // onClose={() => setIsCartOpen(false)} // Close the cart when clicking outside
          >
            {({ open }) => (
              <div className="flex flex-col" ref={panelRef}>
                <PopoverButton
                  className="group -m-2 flex items-center p-2 "
                  // onClick={() => setIsCartOpen(!isCartOpen)} // Toggles the cart visibility
                  onClick={toggleCart}
                >
                  <div className="relative">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 "
                    />
                    {/*TODO:   scrolled ? "bg-[#aa60cb]" : "bg-white shadow-md" */}
                    {totalQuantity > 0 && ( // Only show the badge if totalQuantity > 0
                      <span
                        className={`absolute top-[-5px] text-gray-400 right-[-11px] inline-flex items-center justify-center w-5 h-5  rounded-full  text-xs font-medium ${
                          scrolled ? "bg-white shadow-md " : "bg-black "
                        } `}
                      >
                        {totalQuantity}
                      </span>
                    )}
                  </div>

                  <span className="sr-only">items in cart, view bag</span>
                </PopoverButton>

                <Transition
                  as={Fragment}
                  show={isCartOpen} // Controls whether the popover panel is visible
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    transition
                    className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg transition-opacity duration-200 ease-out sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 overflow-y-auto max-h-[80vh] rtl "
                  >
                    <div dir="ltr">
                      <h2 className="sr-only">Shopping Cart</h2>

                      {/* Cart Content */}
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
                                  className="flex items-center py-6 pl-5 "
                                >
                                  <img
                                    alt={
                                      item.variant.imageAlt || "Product image"
                                    }
                                    src={
                                      item.variant.image.src ||
                                      "https://via.placeholder.com/150"
                                    }
                                    className=" sm:h-fit w-24 flex-none rounded-md border border-gray-200"
                                  />
                                  <div className="ml-4 flex-auto">
                                    <h3 className="font-medium text-gray-900">
                                      <a
                                        href={`/product/${encodeURIComponent(
                                          item.variant.product.id
                                        )}`}
                                      >
                                        ₪ {item.variant.price.amount}
                                      </a>
                                    </h3>
                                    <p className="text-gray-500">
                                      {item.title}
                                    </p>
                                    <p className="text-gray-500">
                                      כמות: {item.quantity}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.id)}
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
                                        d="M14.74 9L14.4 18M9.26 18L9 9M19.73 5.79L18.16 19.67a2.25 2.25 0 01-2.24 2.08H8.08a2.25 2.25 0 01-2.24-2.08L4.77 5.79M19.73 5.79A48.11 48.11 0 0016.25 5.4M4.77 5.79a48.11 48.11 0 013.48-.4m12 .4c.34-.06.68-.11 1.02-.16"
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
                        onClick={() => checkoutLink()}
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
                  </PopoverPanel>
                </Transition>
              </div>
            )}
          </Popover>
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
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex justify-end pt-20 pl-10 text-right">
          <DialogPanel
            transition
            className="relative flex flex-col  w-full max-w-xs bg-white pb-12 shadow-xl transition duration-300 ease-in-out inset-y-0 right-0"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="mt-2 space-y-2 flex flex-col-reverse">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className=" block rounded-lg px-3 py-2 pr-8 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}

export default NavBar;
