import React from "react";
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

const sortOptions = [
  // //   { name: "Most Popular", href: "#" },
  // //   { name: "Best Rating", href: "#" },
  //   { name: "Newest", href: "#" },
  { id: "1", name: "מחיר: מהגובהה לנמוך", /*href: "#"*/ value: "highToLow" },
  { id: "2", name: "מחיר: מהנמוך לגובהה" /*href: "#"*/, value: "lowToHigh" },
];
//currrect the name TODO:
const filters = [
  {
    id: "ALL",
    name: "הצג הכל",
  },
  {
    id: "brand",
    name: "פופולארי",
  },
  {
    id: "NEW",
    name: "חדש",
  },
];

function Shop() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("NEW");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        console.log(sortOption);

        const sortedProducts = sortDataOptions(sortOption, fetchedProducts);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error loading products", error);
      }
    };

    loadProducts();
  }, [sortOption]);

  // FIXME: on the small sizes the page renders and becouse of that the err acoord
  // console.log(open);

  console.log(products);

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

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${encodeURIComponent(product.id)}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={product.images[0]?.altText || "Product image"}
                      src={product.images[0]?.src || "/placeholder.jpg"}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <div className="flex place-content-between">
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.variants[0]?.price.amount
                        ? `${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}`
                        : "Price not available"}
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900  line-through">
                      {product.variants[0]?.compareAtPrice
                        ? `${product.variants[0].compareAtPrice.amount} 
                      
                        ${product.variants[0].compareAtPrice.currencyCode}`
                        : "  "}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* section */}
        <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="a computer screen with a video game on it"
              className="h-full w-full object-cover object-center"
            ></img>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div
            className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
            dir="rtl"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              קנו את הבקר המעוצב הראשון שלכם
            </h2>
            <p className="mt-3 text-xl text-white">
              אצלנו, כל בקר מעוצב בקפידה ומיוצר ברמה הגבוהה ביותר. אנו מחויבים
              לאיכות, עיצוב אישי ועמידה בתקנים האתיים המחמירים ביותר. כל רכישה
              תומכת ביצירת חוויות גיימינג בלתי נשכחות.
            </p>
            <a
              href="#"
              className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              גלו את הקולקציה שלנו
            </a>
          </div>
        </div>

        {/* IDF SECTION */}
        <section class="py-24 relative">
          <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gray-900 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
              <div class="flex-col justify-end items-center lg:gap-16 gap-10 flex">
                <img
                  src="https://pagedone.io/asset/uploads/1717500460.png"
                  alt="pagedone logo image"
                />
                <div class="flex-col justify-center items-center gap-10 flex">
                  <div class="flex-col justify-start items-center gap-2.5 flex">
                    <h1 class="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                      IDF SECTIONS CONTROLLERS
                    </h1>
                    <h2 class="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                      Coming Soon
                    </h2>
                    <p class="text-center text-gray-500 text-base font-normal leading-relaxed">
                      Just 20 days remaining until the big reveal of our new
                      product!
                    </p>
                  </div>
                  <div class="flex items-start justify-center w-full gap-2 count-down-main">
                    <div class="timer flex flex-col gap-0.5">
                      <div class="">
                        <h3 class="countdown-element days text-center text-white text-2xl font-bold font-manrope leading-9"></h3>
                      </div>
                      <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                        DAYS
                      </p>
                    </div>
                    <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                      :
                    </h3>
                    <div class="timer flex flex-col gap-0.5">
                      <div class="">
                        <h3 class="countdown-element hours text-center text-white text-2xl font-bold font-manrope leading-9"></h3>
                      </div>
                      <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                        HRS
                      </p>
                    </div>
                    <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                      :
                    </h3>
                    <div class="timer flex flex-col gap-0.5">
                      <div class="">
                        <h3 class="countdown-element minutes text-center text-white text-2xl font-bold font-manrope leading-9"></h3>
                      </div>
                      <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                        MINS
                      </p>
                    </div>
                    <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                      :
                    </h3>
                    <div class="timer flex flex-col gap-0.5">
                      <div class="">
                        <h3 class="countdown-element seconds text-center text-white text-2xl font-bold font-manrope leading-9"></h3>
                      </div>
                      <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                        SECS
                      </p>
                    </div>
                  </div>
                  <div class="w-full flex-col justify-center items-center gap-5 flex">
                    <h6 class="text-center text-emerald-400 text-base font-semibold leading-relaxed">
                      Launched Date: July 23, 2024
                    </h6>
                    <div class="justify-center items-center gap-2.5 flex sm:flex-row flex-col">
                      {/* <input type="text" class="w-80 focus:outline-none px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] text-gray-900 placeholder-gray-400 text-sm font-normal leading-relaxed h-10 bg-white rounded-lg border border-gray-200 justify-start items-center gap-1.5 inline-flex" placeholder="Type your mail..."> */}
                      <button class="sm:w-fit w-full px-3.5 py-2 bg-emerald-400 hover:bg-emerald-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span class="px-1.5 text-gray-900 text-sm font-medium leading-6 whitespace-nowrap">
                          Notify Me
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-center text-gray-500 text-sm font-normal leading-snug">
                Get in touch with us:{" "}
                <a
                  href=""
                  class="hover:text-gray-100 transition-all duration-700 ease-in-out"
                >
                  {" "}
                  mail@pagedone.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Shop;
