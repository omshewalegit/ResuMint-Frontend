import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const generateResume = async (description) => {
  const response = await api.post("/ai/resume/generate", { description });
  return response.data;
};
