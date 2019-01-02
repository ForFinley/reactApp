import axios from "axios";

const BASE_URL = "";

export const setBillingCard = data =>
  axios.post(`${BASE_URL}/payment/setBillingCard`, data);

export const deleteBillingCard = () =>
  axios.get(`${BASE_URL}/payment/deleteBillingCard`);
