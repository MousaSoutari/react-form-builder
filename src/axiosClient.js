import axios from 'axios';
import CONFIG from './constants/index';
const getHeader = () => {
  const jwt =
    localStorage.getItem('jwt') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMjgzOTMxLCJleHAiOjE2NzU4NzU5MzF9.FneBdHM5wMonyop7ZKwuOFprjvkT9KCeMXXvxWT7ZJo';
  let header = {
    'Content-type': 'application/json',
  };
  if (jwt) header.Authorization = `Bearer ${jwt}`;
  return header;
};

const http = () =>
  axios.create({
    baseURL: CONFIG.STRAPI_URL,

    headers: getHeader(),
  });

export default http;
