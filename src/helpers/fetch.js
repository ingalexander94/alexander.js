const URL_BACKEND = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endpoint, data, method = "GET") => {
  if (method === "GET") {
    return fetch(`${URL_BACKEND}/${endpoint}`);
  } else {
    return fetch(`${URL_BACKEND}/${endpoint}`, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchWithToken = (endpoint, data, method = "GET") => {
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(`${URL_BACKEND}/${endpoint}`, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(`${URL_BACKEND}/${endpoint}`, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchFormDataWithToken = (endpoint, formData, method = "POST") => {
  const token = localStorage.getItem("token") || "";
  return fetch(`${URL_BACKEND}/${endpoint}`, {
    method,
    headers: {
      "x-token": token,
    },
    body: formData,
  });
};

export { fetchWithToken, fetchWithoutToken, fetchFormDataWithToken };
