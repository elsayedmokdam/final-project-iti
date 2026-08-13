export default function formatPrice(price) {
  let string = price.toString();
  let result = "";
  let count = 0;

  for (let i = string.length - 1; i >= 0; i--) {
    result = string[i] + result;
    count++;

    if (count === 3 && i !== 0) {
      result = "," + result;
      count = 0;
    }
  }

  return result;
  // return price.toLocaleString();
}
