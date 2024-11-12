import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  PopoverGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cartContext } from "../contexts/CartContext";
import { FavoriteContext } from "../contexts/FavoritesContext";
import MetaWrapper from "../utils/MetaWrapper";
import ServerErrorPage from "./ServerErrorPage";
import useProducts from "../hooks/useProducts";

const sortOptions = [
  { id: "1", name: "מחיר: מהגבוהה לנמוך", /*href: "#"*/ value: "highToLow" },
  { id: "2", name: "מחיר: מהנמוך לגובהה" /*href: "#"*/, value: "lowToHigh" },
];
const filters = [
  {
    id: "brand",
    name: "פופולארי",
  },
  {
    id: "NEW",
    name: "חדש",
  },
];
const productType = [
  {
    id: "1",
    name: "Xbox",
    value: "xbox",
  },
  {
    id: "2",
    name: "PlayStaion",
    value: "playstation",
  },
  {
    id: "3",
    name: "הצג הכל",
    value: " ",
  },
];

function Shop() {
  const { addToCart } = useContext(cartContext);
  const { productIds, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);

  const [open, setOpen] = useState(false);
  const [sortOption, setSortOption] = useState("NEW");
  const [productsType, setProductsType] = useState("all");

  const { products, error, loading } = useProducts(sortOption, productsType);

  const toggleFavorites = (productId, productName) => {
    const checkIfInFavorites = productIds.includes(productId);

    if (checkIfInFavorites) {
      // If product is already in favorites, remove it
      removeFromFavorites(productId, productName);
    } else {
      // If product is not in favorites, add it
      addToFavorites(productId, productName);
    }
  };

  // load more btn
  const [visible, setVisible] = useState(12);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(visible < products.length);
  }, [visible, products.length]);

  const ShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 12);
  };

  return (
    <>
      <MetaWrapper
        title="Store"
        description="Browse through our collection of amazing products."
      />

      <div className="body-container">
        {/* sorting */}
        <div className="bg-gray-50">
          {/* Mobile filter dialog */}
          <Dialog
            open={open}
            onClose={setOpen}
            className="relative z-40 sm:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.name}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton
                          onClick={() => setSortOption(section.id)}
                          className={`group flex w-full items-center justify-between bg-white px-2 py-3 text-sm  text-gray-400 ${
                            sortOption === section.id ? "bg-red-100" : ""
                          }`}
                        >
                          <span
                            onClick={() => setOpen(false)}
                            className="font-medium text-gray-900 pt-5 w-full text-right "
                          >
                            {section.name}
                          </span>
                        </DisclosureButton>
                      </h3>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                העיצובים שלנו
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                תבחרו בקר עצובי ,שיתן לכם את חווית נשמחק המקסמילת ביותר
              </p>
            </div>
            <div className="flex justify-end justify-around">
              {productType.map((type) => (
                <button
                  key={type.id}
                  className={`p-2 ${
                    productsType === type.value ? "bg-red-100" : ""
                  }`}
                  onClick={() => setProductsType(type.value)}
                >
                  {type.name}
                </button>
              ))}
            </div>
            <section
              aria-labelledby="filter-heading"
              className="border-t border-gray-200 py-6"
            >
              <h2 id="filter-heading" className="sr-only">
                Product filters
              </h2>

              <div className="flex items-center justify-between">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      סינון
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.id}>
                          <button
                            // href={option.href}
                            onClick={() => setSortOption(option.value)}
                            className={`block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100 ${
                              sortOption === option.value ? "bg-red-100" : ""
                            }`}
                          >
                            {option.name}
                          </button>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  onClick={() => setOpen(true)} //FIXME:
                  className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                >
                  פילטרים
                </button>

                <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  {filters.map((item) => {
                    return (
                      <button
                        onClick={() => {
                          setSortOption(item.id);
                        }}
                        key={item.id}
                        className={`p-2 ${
                          sortOption === item.id ? "bg-red-100" : ""
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </PopoverGroup>
              </div>
            </section>
          </div>
        </div>
        {/* product section */}
        <div
          className={`bg-white ${
            productsType === "playstation" ? "hidden" : ""
          }`}
        >
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            {loading ? (
              <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                <h1 className="text-gray-500">LOADING.....</h1>
              </div>
            ) : error ? (
              <ServerErrorPage />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                  {products.slice(0, visible).map((product) => (
                    <div className="relative">
                      {/* Wishlist Button */}
                      <button
                        className="absolute end-4 top-4 z-40 rounded-full bg-white p-2.5 text-gray-900 transition hover:text-gray-900/75 "
                        onClick={() =>
                          toggleFavorites(product.id, product.title)
                        }
                      >
                        <span className="sr-only">Wishlist</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            productIds.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`size-4 ${
                            productIds.includes(product.id)
                              ? " animate-jump-in animate-twice animate-delay-300 text-red-400"
                              : "none"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                              productIds.includes(product.id)
                                ? "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                : "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                            }
                          />
                        </svg>
                      </button>
                      <a
                        key={product.id}
                        href={`/product/${encodeURIComponent(product.id)}`}
                        className="group relative block overflow-hidden"
                      >
                        {/* Product Image */}
                        <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-200">
                          {" "}
                          {/* Fixed height */}
                          <img
                            alt={product.images[0]?.altText || "Product image"}
                            src={product.images[0]?.src || "/placeholder.jpg"}
                            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="relative border border-gray-100 bg-white p-6 flex flex-col justify-between h-64">
                          {/* note: for now its only for the specials products  */}
                          <div className="new-special-container flex justify-between h-7">
                            {product.variants[0]?.selectedOptions[1]?.name ===
                              "special" &&
                            product.variants[0]?.selectedOptions[1]?.value ===
                              "true" ? (
                              <span className="whitespace-nowrap bg-yellow-400 sm:px-3 px-1 py-1.5 text-xs font-medium1 w-1/3">
                                New
                              </span>
                            ) : (
                              <div className="sr-only"></div>
                            )}

                            {/* special contianer*/}
                            <div className=" flex justify-center items-center">
                              {product.variants[0]?.selectedOptions[1]?.name ===
                                "special" &&
                              product.variants[0]?.selectedOptions[1]?.value ===
                                "true" ? (
                                <div className=" flex flex-col items-center">
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
                                <div className=""></div>
                              )}
                            </div>
                          </div>

                          <h3 className="mt-4 text-lg font-medium text-gray-900 md:text-base sm:text-sm max-h-12 overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.title}
                          </h3>
                          <div className="flex justify-between  mt-0">
                            {" "}
                            {/* Flex for consistent spacing */}
                            {/* Product Price */}
                            <p className="mt-1 text-lg font-medium text-gray-600 md:text-base sm:text-xs ">
                              {product.variants[0]?.price.amount
                                ? `${product.variants[0].price.amount}₪`
                                : "Price not available"}
                            </p>
                            {/* Compare at Price (for sale items) */}
                            {product.variants[0]?.compareAtPrice && (
                              <p className="mt-1 text-lg font-medium text-gray-600 line-through md:text-base sm:text-xs pl-2">
                                {`${product.variants[0].compareAtPrice.amount}₪`}
                              </p>
                            )}
                          </div>
                          {/* Add to Cart Button */}
                          <form
                            className="mt-4"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            {/* TODO:*/}
                            {!product.availableForSale ? (
                              <button
                                className=" cursor-not-allowed block w-full rounded border border-yellow-400 p-4 text-sm font-medium  text-black  "
                                disabled
                              >
                                נגמר המלאי
                              </button>
                            ) : (
                              <button
                                className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                                onClick={() =>
                                  addToCart(product.variants[0].id, 1)
                                }
                              >
                                הוסף לעגלה
                              </button>
                            )}
                          </form>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>

                {/* load more btn */}
                {hasMore ? (
                  <div class="fter:h-px my-24 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
                    <button
                      type="button"
                      className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
                      onClick={ShowMoreItems}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-4 w-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      הצג עוד{" "}
                    </button>
                  </div>
                ) : (
                  <div className="relative my-24">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">
                        אין יותר מוצרים{" "}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {productsType === "playstation" ? (
          // PlayStation SECTION
          <section className=" relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
              <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gray-900 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex ">
                <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
                  <div className="flex-col justify-center items-center gap-10 flex">
                    <div className="flex-col justify-start items-center gap-2.5 flex">
                      <h1 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal ">
                        PlayStation בקרי עיצוב
                      </h1>
                      <h2 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                        מגיעים בקרוב
                      </h2>
                      <p className="text-center text-gray-500 text-base font-normal leading-relaxed rtl">
                        שווה לחכות – הישארו מעודכנים לפרטים נוספים בקרוב.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 text-sm font-normal leading-snug rtl ">
                  צור איתנו קשר:{" "}
                  <a
                    href="mailto:    mail@pagedone.com "
                    className="hover:text-gray-100 transition-all duration-700 ease-in-out pr-2"
                  >
                    mail@pagedone.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Shop;
