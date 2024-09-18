import React, { useEffect, useState } from "react";
import { fetchProductsById } from "../services/shopify";
import { removeFromFavorites } from "../utils/googleAnalytics";

// TASKS:
// 1. CONNECT A TRASH CAN WITH THE FUNCTION OF THE REMOVE FAVORITE
// 2. CONNECT TO ADD TO BAG AND IF SO IT WILL REMOVE FROM FAVORTIES
// 3. CONNECT THE LINK TO EACH PRODUCT - THAT WILL NAVIGATE TO THE PRODUCT PAGE URL

// fixme: Need to fix the btn when somone delete the favorite then we need to update a state and prevent issues

function Favorites() {
  const [favorties, setFavorites] = useState([]);
  const [productIds, setProductIds] = useState(() => {
    // Initialize state with localStorage value
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  // console.log("productIds", productIds);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (productIds.length > 0) {
        const fetchedProducts = await fetchProductsById(productIds);
        setFavorites(fetchedProducts);
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [productIds]);

  const handleRemoveFavorite = (productId, productTitle) => {
    // Call your Google Analytics function
    removeFromFavorites(productId, productTitle);

    // console.log(
    //   "Updated favorites in localStorage:",
    //   JSON.parse(localStorage.getItem("favorites"))
    // );

    const updatedProductIds =
      JSON.parse(localStorage.getItem("favorites")) || [];

    // Update the state
    setProductIds([...updatedProductIds]);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 text-center pt-10 sm:pt-0">
          רשימת משאלות
        </h2>
        {favorties.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {favorties.map((product) => (
              <div key={product.id}>
                <div className="relative ">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg relative  ">
                    {/* FIXME: */}
                    <a
                      href={`/product/${encodeURIComponent(product.id)}`}
                      // className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      <img
                        alt={product.variants[0]?.image.altText}
                        src={product.variants[0]?.image.src}
                        className="h-full w-full object-cover object-center"
                      />
                    </a>
                    {/* trash can  */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFavorite(product.id, product.title)
                      }
                      className="size-6 absolute right-0 top-0 text-black"
                      style={{ zIndex: 10 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 absolute right-0 top-0 text-black	"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.productType}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      ₪{product.variants[0]?.price.amount}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  {/* Add to bag<span className="sr-only">, {product.name}</span> */}
                  {/* </a> */}
                  <button className=" w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                    הוסף לסל
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-32 text-center">רשימת המשאלות שלך ריקה</div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
