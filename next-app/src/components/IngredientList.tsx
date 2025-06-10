"use client";

import { useIngredientsStore } from "@/stores/useIngredientsStore";
import { X } from "lucide-react";
const IngredientList: React.FC = () => {
  const ingredients = useIngredientsStore((state) => state.ingredients);
  const removeIngredient = useIngredientsStore(
    (state) => state.removeIngredient,
  );
  const ingredientLabel =
    ingredients.length === 0
      ? "No ingredients yet."
      : `${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""}`;

  return (
    <div className="mt-4">
      <p className="font-mono text-amber-500 font-medium text-center mb-4">
        {ingredientLabel}
      </p>
      <ul className="list-disc list-inside flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:max-w-4xl sm:gap-x-8 mx-auto">
        {ingredients.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-amber-50 p-3 rounded-lg"
          >
            <p className="flex items-center gap-2 font-semibold text-gray-600">
              <span className="bg-white rounded p-2 flex justify-center items-center w-10 min-h-8">
                {item.emoji}
              </span>
              {item.name}
            </p>
            <button
              onClick={() => removeIngredient(item.name)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
