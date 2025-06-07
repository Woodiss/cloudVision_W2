import { create } from "zustand";

export interface Ingredient {
  name: string;
  emoji: string;
}

interface IngredientStore {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientName: string) => void;
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const useIngredientsStore = create<IngredientStore>((set) => ({
  ingredients: [],
  addIngredient: (ingredient) =>
    set((state) =>
      state.ingredients.find(
        (i) => i.name.toLowerCase() === ingredient.name.toLowerCase(),
      )
        ? state
        : { ingredients: [...state.ingredients, ingredient] },
    ),
  removeIngredient: (ingredientName) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (i) => i.name.toLowerCase() !== ingredientName.toLowerCase(),
      ),
    })),
  setIngredients: (ingredients) => set({ ingredients }),
}));
