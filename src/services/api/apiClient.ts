import axios from "axios";
import { MEALDB_API_BASE_URL, API_TIMEOUT } from "@/constants/api";

/**
 * Base API client for making HTTP requests
 * Configured with defaults for the MealDB API
 */
const apiClient = axios.create({
  baseURL: MEALDB_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors for debugging
    console.error("API request failed:", error.message);

    // You could add more sophisticated error handling here
    // For example, showing notifications or redirecting on auth errors

    return Promise.reject(error);
  }
);

export default apiClient;
