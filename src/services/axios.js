import axios from 'axios';

const BASE_URL_API = `${process.env.REACT_APP_BASE_URL_API}`;

const customAxios = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true,
  xsrfCookieName: 'csrttoken',
  xsrfHeaderName: 'X-CSRFToken',
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default customAxios;
