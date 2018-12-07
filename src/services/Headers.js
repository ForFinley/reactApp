import axios from 'axios';

export const setAuthHeaders = token => {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
}

export const removeAuthHeaders = () => {
  delete axios.defaults.headers.common['authorization'];
}
