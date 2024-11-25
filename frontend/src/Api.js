import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchDrivers = async () => {
  try {
    const response = await api.get("/drivers");
    return response.data;
  } catch (error) {
    console.error("Erro: ", error);
    throw error;
  }
};

export default api;
