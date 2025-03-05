/**
 * API-related constants
 */

// Base URL for MealDB API
export const MEALDB_API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// API endpoints
export const API_ENDPOINTS = {
  SEARCH: "/search.php",
  LOOKUP: "/lookup.php",
  CATEGORIES: "/categories.php",
  RANDOM: "/random.php",
  FILTER: "/filter.php",
};

// API request timeout (ms)
export const API_TIMEOUT = 10000;

// Pagination constants
export const ITEMS_PER_PAGE = 8;

// Search constants
export const MIN_SEARCH_QUERY_LENGTH = 1;
export const DEFAULT_SEARCH_QUERY = "a";
