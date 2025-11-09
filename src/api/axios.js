// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your backend URL
  timeout: 10000, // optional: 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer <token>' // Uncomment if using auth
  },
});

export default instance;
