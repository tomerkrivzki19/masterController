import React, { useContext } from "react";
import { useState, useEffect } from "react";
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
import { fetchProducts } from "../services/shopify";
import { sortDataOptions } from "../utils/SortOptions";
import { CartContext } from "../contexts/cartContext";

const sortOptions = [
  { id: "1", name: "מחיר: מהגובהה לנמוך", /*href: "#"*/ value: "highToLow" },
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
  const { addToCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("NEW");
  const [productsType, setProductsType] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(productsType);
        console.log(sortOption);

        const sortedProducts = sortDataOptions(sortOption, fetchedProducts);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error loading products", error);
      }
    };

    loadProducts();
  }, [sortOption, productsType]);

  return (
    <div>
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
                          className={`group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400 ${
                            sortOption === section.id ? "bg-red-100" : ""
                          }`}
                        >
                          <span
                            onClick={() => setOpen(false)}
                            className="font-medium text-gray-900"
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
                  {/* <button>הצג הכל</button>
                  <button>פופולארי</button>
                  <button>חדש</button> */}
                </PopoverGroup>
              </div>
            </section>
          </div>
        </div>
        {/* product section */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${encodeURIComponent(product.id)}`}
                  className="group relative block overflow-hidden"
                >
                  {/* Wishlist Button */}
                  <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                    <span className="sr-only">Wishlist</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={product.images[0]?.altText || "Product image"}
                      src={product.images[0]?.src || "/placeholder.jpg"}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info TODO: add some quey if new or not*/}
                  <div className="relative border border-gray-100 bg-white p-6">
                    <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                      New
                    </span>

                    <h3 className="mt-4 text-lg font-medium text-gray-900 md:text-base sm:text-sm">
                      {product.title}
                    </h3>

                    <div className="flex justify-between">
                      {/* Product Price */}
                      <p className="mt-1 text-lg font-medium text-gray-600 md:text-base sm:text-xs">
                        {product.variants[0]?.price.amount
                          ? `${product.variants[0].price.amount} ₪`
                          : "Price not available"}
                      </p>

                      {/* Compare at Price (for sale items) */}
                      {product.variants[0]?.compareAtPrice && (
                        <p className="mt-1 text-lg font-medium text-gray-600 line-through md:text-base sm:text-xs">
                          {`${product.variants[0].compareAtPrice.amount} ₪`}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                      <button
                        className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                        onClick={() => addToCart(product.variants[0].id, 1)}
                      >
                        הוסף לעגלה
                      </button>
                    </form>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* FIXME: FOR NOW WE WILL ADD WHEN THERE WILL BE AN PLATSTATION CONTROLELR */}
        {productsType === "playstation" ? (
          // PlayStation SECTION
          <section className=" relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
              <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gray-900 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
                <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
                  <div className="flex-col justify-center items-center gap-10 flex">
                    <div className="flex-col justify-start items-center gap-2.5 flex">
                      <h1 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                        PlayStation design controllers
                      </h1>
                      <h2 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                        Coming Soon
                      </h2>
                      <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                        Just 20 days remaining until the big reveal of our new
                        product!
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 text-sm font-normal leading-snug">
                  Get in touch with us:{" "}
                  <a
                    href=""
                    className="hover:text-gray-100 transition-all duration-700 ease-in-out"
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
    </div>
  );
}

export default Shop;
