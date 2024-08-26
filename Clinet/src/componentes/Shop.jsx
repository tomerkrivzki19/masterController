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

const sortOptions = [
  // //   { name: "Most Popular", href: "#" },
  // //   { name: "Best Rating", href: "#" },
  //   { name: "Newest", href: "#" },
  { name: "מחיר: מהגובהה לנמוך", href: "#" },
  { name: "מחיר: מהנמוך לגובהה", href: "#" },
];

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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products", error);
      }
    };

    loadProducts();
  }, []);

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
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-900">
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
                        <MenuItem key={option}>
                          <a
                            href={option.href}
                            className="block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100"
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                >
                  Filters
                </button>

                <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  <button>הצג הכל</button>
                  <button>פופולארי</button>
                  <button>חדש</button>
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
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.variants[0]?.price.amount
                      ? `${product.variants[0].price.amount} ${product.variants[0].price.currencyCode}`
                      : "Price not available"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* section */}
        <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              src="https://cdn.vox-cdn.com/thumbor/03pr6mrG8uDchXWtTM77sKkuvPM=/0x0:893x539/1400x1050/filters:focal(447x270:448x271)/cdn.vox-cdn.com/uploads/chorus_asset/file/21902907/xbox_lab_design.jpg"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Long-term thinking
            </h2>
            <p className="mt-3 text-xl text-white">
              We're committed to responsible, sustainable, and ethical
              manufacturing. Our small-scale approach allows us to focus on
              quality and reduce our impact. We're doing our best to delay the
              inevitable heat-death of the universe.
            </p>
            <a
              href="#"
              className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              Read our story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
