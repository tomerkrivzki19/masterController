// import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// // FIXME: NOTE: can do right now becouse lack of products -supposed to make the load more functionality with API
// const client = createStorefrontApiClient({
//   storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
//   apiVersion: "2023-10",
//   publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
// });

// const productListQuery = `
//   query ProductListQuery {
//     products(first: 10) {
//       edges {
//         cursor
//         node {
//           id
//           title
//           handle
//           availableForSale
//           createdAt
//           images(first: 1) {
//             edges {
//               node {
//                 src
//                 altText
//               }
//             }
//           }
//           variants(first: 1) {
//             edges {
//               node {
//                 id
//                 availableForSale
//                 price {
//                   amount
//                 }
//                 compareAtPrice {
//                   amount
//                 }
//                 selectedOptions {
//                   name
//                   value
//                 }
//               }
//             }
//           }
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//     }
//   }
// `;

// // Updated function without variables

// export async function fetchLimitedProducts() {
//   try {
//     const { data, errors } = await client.request(productListQuery);

//     if (errors) {
//       console.error("GraphQL Errors:", errors);
//       return { products: [], pageInfo: null };
//     }

//     const products = data?.products?.edges?.map((edge) => edge.node) || [];
//     const pageInfo = data?.products?.pageInfo || {
//       hasNextPage: false,
//       endCursor: null,
//     };

//     console.log("Fetched products:", products);
//     return { products, pageInfo };
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return { products: [], pageInfo: null };
//   }
// }
