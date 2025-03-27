import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:3000";

const apiClient = new axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;
