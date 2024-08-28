export const sortDataOptions = (name, data) => {
  // Create a copy of the data array to avoid mutating the original array
  let sortedData = [...data];

  // No sorting, return original data
  switch (name) {
    case "all":
      return sortedData.sort(a, (b) => a.title - b.title);

    // Sort by 'createdAt' date in descending order (newest first)
    case "NEW":
      return sortedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "brand": //FIXME: fix that after sales to see waht is the relevnt verible
      // Sort by 'sales' field in descending order (most popular first)
      sortedData.sort((a, b) => (b.sales || 0) - (a.sales || 0));
      break;

    // Sort by price in descending order (high to low)
    case "highToLow":
      sortedData.sort(
        (a, b) =>
          parseFloat(b.variants[0].price.amount) -
          parseFloat(a.variants[0].price.amount)
      );
      break;

    // Sort by price in ascending order (low to high)
    case "lowToHigh":
      sortedData.sort(
        (a, b) =>
          parseFloat(a.variants[0].price.amount) -
          parseFloat(b.variants[0].price.amount)
      );
      break;

    // If no match, return the original data
    default:
      return sortedData;
  }

  return sortedData;
};

// export const sortDataOptions = (name, data) => {
//   // Create a copy of the data to avoid mutating the original
//   const sortedData = [...data];
//   console.log();

//   if (name === "all") {
//     return sortedData;
//   } else if (name === "new") {
//     return sortedData.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//   } else if (name === "highToLow") {
//     return sortedData.sort((a, b) => {
//       const priceA = parseFloat(a.variants[0].price.amount);
//       const priceB = parseFloat(b.variants[0].price.amount);
//       return priceB - priceA; // Sort descending
//     });
//   } else if (name === "lowToHigh") {
//     return sortedData.sort((a, b) => {
//       const priceA = parseFloat(a.variants[0].price.amount);
//       const priceB = parseFloat(b.variants[0].price.amount);
//       return priceA - priceB; // Sort ascending
//     });
//   } else if (name === "popular") {
//     //TODO:
//     // Example for sorting by popularity
//     return sortedData.sort((a, b) => b.popularity - a.popularity);
//   }

//   console.log(
//     "Sorted Data:",
//     sortedData.map((item) => item.title)
//   );
//   return sortedData;
// };
