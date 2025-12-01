const API_URL = "http://localhost:8001/api";

export const getToken = () => localStorage.getItem("token");

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

export default API_URL;
