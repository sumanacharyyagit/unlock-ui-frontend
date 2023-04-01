import { getToken } from "./getToken";

const { token } = getToken();

export const submitUserInformations = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/information/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const getUserInformation = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/information/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const signUserData = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/user/create", {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => {
        localStorage.setItem(
          "unlock-ui",
          JSON.stringify({ token: json?.token, user: json?.user })
        );
        resolve(json);
      })
      .catch((error) => reject(error));
  });
};

export const getUserData = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/user/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const getAllUserData = (payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/admin/user/get/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const getUserDataById = (id, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/v1/admin/user/get/:${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const logoutUser = (id, payload) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/api/v1/user/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Request");
        }
        return response.json();
      })
      .then((json) => {
        localStorage.removeItem("unlock-ui");
        resolve(json);
      })
      .catch((error) => reject(error));
  });
};
