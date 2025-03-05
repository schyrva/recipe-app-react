import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMeal, Meal } from '@/types/meal';

const FAVORITES_STORAGE_KEY = 'recipe-app-favorites';

const loadFavoritesFromStorage = (): FavoriteMeal[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: FavoriteMeal[]) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

interface FavoritesState {
  favorites: FavoriteMeal[];
}

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Meal>) => {
      const meal = action.payload;
      const existingIndex = state.favorites.findIndex(
        item => item.idMeal === meal.idMeal
      );

      if (existingIndex >= 0) {
        state.favorites[existingIndex].quantity += 1;
      } else {
        state.favorites.push({
          ...meal,
          quantity: 1,
        });
      }

      saveFavoritesToStorage(state.favorites);
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        item => item.idMeal !== action.payload
      );

      saveFavoritesToStorage(state.favorites);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ mealId: string; quantity: number }>
    ) => {
      const { mealId, quantity } = action.payload;

      if (quantity <= 0) {
        state.favorites = state.favorites.filter(
          item => item.idMeal !== mealId
        );
      } else {
        const existingIndex = state.favorites.findIndex(
          item => item.idMeal === mealId
        );

        if (existingIndex >= 0) {
          state.favorites[existingIndex].quantity = quantity;
        }
      }

      saveFavoritesToStorage(state.favorites);
    },

    clearFavorites: state => {
      state.favorites = [];

      saveFavoritesToStorage(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite, updateQuantity, clearFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.favorites;

export default favoritesSlice.reducer;
