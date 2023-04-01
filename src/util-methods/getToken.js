export const getToken = () => {
  if (localStorage.getItem("unlock-ui")) {
    return JSON.parse(localStorage.getItem("unlock-ui"));
  } else {
    return { token: false };
  }
};
