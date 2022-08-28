const capitalizeWords = (string: string) => {
  const array = string.split(" ");
  const result = [];
  for (const word of array) {
    const first = word.substring(0, 1);
    const rest = word.substring(1);
    result.push(`${first.toUpperCase()}${rest.toLowerCase()}`);
  }
  return result.join(" ");
};

export default capitalizeWords;
