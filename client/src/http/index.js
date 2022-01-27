import axios from 'axios';

const BASE_URL = 'http://localhost:5000/auth';

const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  })
  
  // instance.interceptors.response.use(response => {
  //   console.log('Response:', JSON.stringify(response, null, 2))
  //   return response
  // })

export default instance;