export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwtAuthent", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("unlock-ui")) {
    return JSON.parse(localStorage.getItem("unlock-ui"));
  } else {
    return false;
  }
};
