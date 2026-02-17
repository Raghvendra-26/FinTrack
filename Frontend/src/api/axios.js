import axios from "axios"

const API = axios.create({
  // baseURL : "http://localhost:3000/api",
  baseURL: "https://fintrack-229t.onrender.com/api",
  withCredentials: true,
});

export default API