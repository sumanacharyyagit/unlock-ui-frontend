export const colorPicker = (unit, currentVal, idealVal) => {
  if (unit === "kg") {
    if (currentVal > idealVal) {
      return { backgroundColor: "#E56E94", color: "#FFFFFF" };
    } else if (currentVal < idealVal) {
      return { backgroundColor: "#0A6E0A", color: "#FFFFFF" };
    }
  } else if (unit === "lbs") {
    if (currentVal > idealVal) {
      return { backgroundColor: "#E56E94", color: "#FFFFFF" };
    } else if (currentVal < idealVal) {
      return { backgroundColor: "#0A6E0A", color: "#FFFFFF" };
    }
  } else {
    return { backgroundColor: "#F2F2F2", color: "#000000" };
  }
};
