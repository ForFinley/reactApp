import axios from "axios";

axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const setAuthHeaders = token => {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

export const removeAuthHeaders = () => {
  delete axios.defaults.headers.common["authorization"];
};
