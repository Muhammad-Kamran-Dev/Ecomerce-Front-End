export const getFormattedProductName = (
  productName: string,
  count: number = 30
): string => {
  // If the product name is longer than the desired count, truncate it
  if (productName.length > count) {
    return productName.slice(0, count) + "...".toUpperCase();
  }
  // If the product name is shorter, pad it with spaces to match the count
  else if (productName.length < count) {
    const padding = " ".repeat(count - productName.length);
    return (productName + padding).toUpperCase();
  }
  // If the product name is already the desired length, return as is
  else {
    return productName.toUpperCase();
  }
};
