"use client";
import IngredientList from "@/components/IngredientList";
import IngredientSearch from "@/components/IngredientSearch";
import IngredientIdentifier from "@/components/IngredientIdentifier";
import { useIngredientsStore } from "@/stores/useIngredientsStore";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Recipe() {
  const ingredients = useIngredientsStore((state) => state.ingredients);
  const router = useRouter();

  const handleSearch = () => {
    if (ingredients.length === 0) return;
    router.push("/recipe/result");
  };

  return (
    <main className="flex flex-col h-full flex-1">
      <div className="max-w-7xl mx-auto p-6 lg:px-8">
        <h1 className="font-bold text-4xl text-center mt-4 sm:text-6xl xl:text-6xl mb-8">
          <span className="text-gray-900  block">What's on the Menu?</span>
          <span className="text-amber-500 text-nowrap inline-block">
            Add Ingredients
          </span>
        </h1>
        <div className="flex justify-center items-center gap-6">
          {/* Composant de recherche  */}
          <IngredientSearch />
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" className="size-12">
                <Sparkles color="white" size={24} className="min-w-6 min-h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh] px-0 sm:px-6">
              <DialogTitle className="text-3xl font-bold text-center text-gray-900">
                AI Image
                <span className="block text-amber-500">Recognition</span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Upload your image here
              </DialogDescription>
              <IngredientIdentifier />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-white w-full relative grow">
        <svg
          className="absolute top-0"
          viewBox="0 0 1920 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_115_121)">
            <path
              d="M-133.333 76C-133.333 76 291.221 47.6044 924.667 47.6044C1558.11 47.6044 1982.67 76 1982.67 76V0H-133.333V76Z"
              fill="#FFF7ED"
            />
          </g>
          <defs>
            <clipPath id="clip0_115_121">
              <rect width="1920" height="76" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="px-4 py-16 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div>
            {/* Liste des ingrédients */}
            <IngredientList />
            {ingredients.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleSearch}
                  className="font-bold text-base px-6 py-3 h-fit lg:w-fit"
                >
                  Search Recipe
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
