"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useIngredientsStore } from "@/stores/useIngredientsStore";
import { Clock, Leaf, Utensils } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Recipe = {
  id: number;
  title: string;
  readyInMinutes: number;
  summary: string;
  image: string;
  vegan: boolean;
  servings: number;
};

export default function RecipeResult() {
  const ingredients = useIngredientsStore((state) => state.ingredients);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredients.length === 0) return;
      setLoading(true);
      const ingredientNames = ingredients.map((i) => i.name).join(",");
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredientNames}&number=5&addRecipeInformation=true&addRecipeInstructions=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`,
        );
        const data = await res.json();
        setRecipes(data.results);
        console.log(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  if (loading)
    return <p className="p-6 text-center text-lg">Loading recipes...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:px-8">
      <h1 className="font-bold text-4xl text-center mt-4 sm:text-6xl xl:text-6xl mb-8">
        <span className="text-gray-900  block">
          {recipes.length} Recipes match
        </span>
        <span className="text-amber-500 text-nowrap inline-block">
          Your Ingredients
        </span>
      </h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="border rounded-lg shadow p-3 bg-white flex flex-col min-w-60"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded w-full h-40 object-cover mb-4"
              />
              <div className="flex flex-col grow">
                <div className="flex items-center  gap-3 mb-4">
                  <span className="flex items-center font-semibold gap-1.5 bg-gray-100 text-gray-600 rounded text-xs py-1 px-1.5">
                    {<Clock color="#4b5563" />}
                    {recipe.readyInMinutes < 60
                      ? `${recipe.readyInMinutes}m`
                      : `${Math.floor(recipe.readyInMinutes / 60)}h ${recipe.readyInMinutes % 60}m`}
                  </span>
                  {recipe.vegan && (
                    <span className="bg-green-200 text-green-700 rounded-full text-xs font-semibold py-1 px-2 flex items-center gap-1">
                      <Leaf size={16} />
                      Vegan
                    </span>
                  )}
                  {recipe.servings && (
                    <span className="rounded-full text-base font-semibold py-1 px-2 flex items-center gap-1 ml-auto">
                      {recipe.servings}
                      <Utensils size={20} />
                    </span>
                  )}{" "}
                </div>
                <h2 className="text-2xl font-semibold mb-6">{recipe.title}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full h-fit font-semibold text-base mt-auto"
                      variant="outline"
                    >
                      Discover
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="overflow-y-scroll max-h-[90vh] sm:px-6">
                    <DialogTitle className="text-gray-900">
                      {recipe.title}
                    </DialogTitle>

                    {/* Conteneur image */}
                    <div className="relative w-full h-48 rounded overflow-hidden mb-4">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Conteneur badges */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center font-semibold gap-1.5 bg-gray-100 text-gray-600 rounded text-xs py-1 px-1.5">
                        <Clock color="#4b5563" />
                        {recipe.readyInMinutes < 60
                          ? `${recipe.readyInMinutes}m`
                          : `${Math.floor(recipe.readyInMinutes / 60)}h ${recipe.readyInMinutes % 60}m`}
                      </span>
                      {recipe.vegan && (
                        <span className="bg-green-200 text-green-700 rounded-full text-xs font-semibold py-1 px-2 flex items-center gap-1">
                          <Leaf size={16} />
                          Vegan
                        </span>
                      )}
                      {recipe.servings && (
                        <span className="rounded-full text-base font-semibold py-1 px-2 flex items-center gap-1 ml-auto">
                          {recipe.servings}
                          <Utensils size={20} />
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-2xl text-gray-900">
                      Summary
                    </h3>
                    <div
                      className="prose prose-sm max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: recipe.summary }}
                    />

                    {/* <DialogDescription>{recipe.summary}</DialogDescription> */}
                  </DialogContent>
                </Dialog>
                {/* <p>{recipe.summary}</p> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
