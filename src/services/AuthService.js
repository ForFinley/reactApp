import axios from 'axios';

const BASE_URL = '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8'
}

export const login = data => axios.post(`${BASE_URL}/userService/signIn`, data, { headers })


export const signUp = (data) => axios.post(`${BASE_URL}/userService/registration`, data, { headers })

export const getProfile = () => axios.get(`${BASE_URL}/userService/me`)

export const changePassword = data => axios.post(`${BASE_URL}/userService/changePassword`, data, { headers })
