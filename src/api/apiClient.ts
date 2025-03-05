import axios from "axios";

// Створюємо базовий екземпляр axios з налаштуваннями
const apiClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Обробники помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Централізована обробка помилок API
    console.error("API request failed:", error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
