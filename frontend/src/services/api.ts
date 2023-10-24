import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api/`
<<<<<<< HEAD
  : 'http://localhost:3050/api/';
=======
  : 'https://pecafe-hotel.venidici.com.br/api/';
>>>>>>> c3bb770328effe90edd9a77e419635d02c52f443

export const Api: AxiosInstance = axios.create({ baseURL });
