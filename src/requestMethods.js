import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://titos-corner.onrender.com/api',
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  // console.log('Access Token in Axios:', accessToken); // Debugging
  if (accessToken) {
    config.headers.token = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default axiosInstance;
