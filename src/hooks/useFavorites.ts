import { Meal } from '@/types/meal';
import { combineIngredients } from '@/utils/mealUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addFavorite as addFavoriteAction,
  removeFavorite as removeFavoriteAction,
  updateQuantity as updateQuantityAction,
  clearFavorites as clearFavoritesAction,
  selectFavorites,
} from '@/store/slices/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(selectFavorites);

  const addFavorite = (meal: Meal) => {
    dispatch(addFavoriteAction(meal));
  };

  const removeFavorite = (mealId: string) => {
    dispatch(removeFavoriteAction(mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFavoriteAction(mealId));
    } else {
      dispatch(updateQuantityAction({ mealId, quantity }));
    }
  };

  const clearFavorites = () => {
    dispatch(clearFavoritesAction());
  };

  const isFavorite = (mealId: string) => {
    return favorites.some(meal => meal.idMeal === mealId);
  };

  const getCombinedIngredients = () => {
    return combineIngredients(favorites);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateQuantity,
    clearFavorites,
    isFavorite,
    getCombinedIngredients,
  };
};
