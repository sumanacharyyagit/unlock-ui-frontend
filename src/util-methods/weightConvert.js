export const weightConverter = (convertTo, val) => {
  if (convertTo === "kg") {
    // lbs to kg
    return val / 0.0022046;
  } else if (convertTo === "lbs") {
    // kg to lbs
    return val * 2.2046;
  }
};
