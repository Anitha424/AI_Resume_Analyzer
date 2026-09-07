import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-analyzer-backend-dn7p.onrender.com",
});

export default api;