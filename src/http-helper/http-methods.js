export const httpGetMethod = (url, token) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authentication: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const httpPostMethod = (url, token, payload) => {
  console.log(url);
  return new Promise((resolve, reject) => {
    fetch(url, {
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
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const httpPutMethod = (url, token, payload) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: {
        Authentication: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

export const httpDeleteMethod = (url, token, payload) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authentication: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};
