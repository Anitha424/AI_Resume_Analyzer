import axios from "axios";

const API = axios.create({
 baseURL: "https://ai-resume-analyzer-dn7p.onrender.com",
});

export default API;