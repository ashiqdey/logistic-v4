import axios from 'axios';
// config
import { urls } from '../configs';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: urls.apiBaseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
