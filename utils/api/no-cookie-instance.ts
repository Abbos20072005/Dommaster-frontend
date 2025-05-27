import axios from 'axios';

export const noCookieApi = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
});
