import axios from "axios";
import CONFIG from "./constants/index";
const getHeader = () => {
  const jwt =
    localStorage.getItem("jwt") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY3MjA3NTE4NCwiZXhwIjoxNjc0NjY3MTg0fQ.jBiNTaA_5zmbSfUYhWJOSPi_Esny3JV-O5S7d4IAXqg";

  let header = {
    "Content-type": "application/json",
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
