import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api";

const api = axios.create({
  baseURL: BASEURL,
});

export default api;
