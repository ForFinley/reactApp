import axios from "axios";

const BASE_URL = "";

export const login = (data, config) =>
  axios.post(`${BASE_URL}/userService/signIn`, data, config);

export const signUp = data =>
  axios.post(`${BASE_URL}/userService/registration`, data);

export const getProfile = () => axios.get(`${BASE_URL}/userService/me`);

export const changePassword = data =>
  axios.post(`${BASE_URL}/userService/changePassword`, data);

export const verifyEmail = hash =>
  axios.get(`${BASE_URL}/userService/verifyEmail/${hash}`);

export const resetPassword = data =>
  axios.post(`${BASE_URL}/userService/passwordResetConfirm`, data);

export const sendRecoveryEmail = data =>
  axios.post(`${BASE_URL}/userService/passwordResetInit`, data);
