import React from "react";
import ServerErrorPage from "../ServerErrorPage";

//TODO: need to thing about relate dproducts mybe add some items depending on the feautre products
// const products = [
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
// ];

function RelatedProducts({ addToCart, products, error, loadingProducts }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 text-right">
          גם לקוחות קנו
        </h2>

        {loadingProducts ? (
          <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <h1 className="text-gray-500">LOADING.....</h1>
          </div>
        ) : error ? (
          <ServerErrorPage />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <a href={`/product/${encodeURIComponent(product.id)}`}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        alt={product.variants[0].image.altText}
                        src={product.variants[0].image.src}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.productType}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4  flex-col">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36  bg-gradient-to-t from-black opacity-50 "
                      />
                      <p className="relative text-lg font-semibold text-white ">
                        ₪ {parseFloat(product.variants[0].price.amount)}
                      </p>
                      <p className="relative text-lg font-semibold text-white line-through">
                        ₪{" "}
                        {parseFloat(product.variants[0].compareAtPrice.amount)}
                      </p>
                    </div>
                  </div>
                </a>
                <div className="mt-6 ">
                  {!product.availableForSale ? (
                    <button
                      className="cursor-not-allowed w-full relative flex items-center justify-center rounded-md border border-gray-200 px-8 py-2 text-sm font-medium text-gray-900 "
                      disabled
                    >
                      נגמר המלאי
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      onClick={() => addToCart(product.variants[0].id, 1)}
                    >
                      הוספה לסל
                      <span className="sr-only">, {product.name}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
