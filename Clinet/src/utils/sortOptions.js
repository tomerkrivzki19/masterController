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
